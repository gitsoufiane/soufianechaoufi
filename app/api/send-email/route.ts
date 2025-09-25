import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { EmailTemplate } from "@/components/email-template";
import { EmailConfirmationTemplate } from "@/components/email-template-confirmation";
import type { ContactApiResponse } from "@/types/api";
import { LRUCache } from 'lru-cache';
import { env } from '@/lib/env';

// Initialize Resend with validated API key
const resend = new Resend(env.RESEND_API_KEY);

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 5; // Maximum requests per window
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// LRU cache-based rate limiting to prevent memory leaks
const rateLimiter = new LRUCache<string, { count: number; resetTime: number }>({
  max: 500, // Maximum number of items in cache
  ttl: RATE_LIMIT_WINDOW_MS, // 15 minutes TTL
});

function checkRateLimit(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const limit = rateLimiter.get(identifier);

  if (!limit || now > limit.resetTime) {
    // First request or window expired - reset count
    rateLimiter.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    });
    return { success: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return { success: false, remaining: 0 };
  }

  // Increment count
  limit.count++;
  rateLimiter.set(identifier, limit);
  return { success: true, remaining: RATE_LIMIT_MAX_REQUESTS - limit.count };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.success) {
      const response: ContactApiResponse = {
        success: false,
        error: "Too many requests. Please try again later.",
      };
      return NextResponse.json(response, {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
          'X-RateLimit-Remaining': '0',
          'Retry-After': '900', // 15 minutes in seconds
        }
      });
    }

    // Parse the request body
    const body = await request.json();

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors
      const formattedErrors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(issue.message);
      });

      const response: ContactApiResponse = {
        success: false,
        error: "Validation failed",
        issues: formattedErrors,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { name, email, inquiryType, subject, message } = result.data;

    // Send emails using Resend batch API
    const { data, error } = await resend.batch.send([
      // Email to the site owner (you)
      {
        from: env.RESEND_FROM_EMAIL,
        to: env.RESEND_TO_EMAIL,
        subject: `${subject} - Contact from ${name}`,
        react: EmailTemplate({
          name,
          email,
          inquiryType,
          subject,
          message,
        }),
      },
      // Confirmation email to the user
      {
        from: env.RESEND_FROM_EMAIL,
        to: email,
        subject: `Thank you for contacting me - ${name}`,
        react: EmailConfirmationTemplate({
          name,
          inquiryType,
          subject,
        }),
      },
    ]);

    if (error) {
      console.error("Resend batch error:", error);
      const response: ContactApiResponse = {
        success: false,
        error: "Failed to send email. Please try again later.",
      };
      return NextResponse.json(response, { status: 500 });
    }

    // Return success response
    const response: ContactApiResponse = {
      success: true,
      data: { message: "Message sent successfully! You'll receive a confirmation email shortly." },
    };
    return NextResponse.json(response, {
      headers: {
        'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
        'X-RateLimit-Remaining': String(rateLimit.remaining),
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    const response: ContactApiResponse = {
      success: false,
      error: "Internal server error. Please try again later.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
