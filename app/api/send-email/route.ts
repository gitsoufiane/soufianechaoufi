import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { EmailTemplate } from "@/components/email-template";
import type { ContactApiResponse } from "@/types/api";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_MAX_REQUESTS = 5; // Maximum requests per window
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit) {
    // First request from this IP
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (now > userLimit.resetTime) {
    // Window has expired, reset
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return false;
  }

  // Increment count
  userLimit.count++;
  return true;
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
    if (!checkRateLimit(clientIP)) {
      const response: ContactApiResponse = {
        success: false,
        error: "Too many requests. Please try again later.",
      };
      return NextResponse.json(response, { status: 429 });
    }

    // Parse the request body
    const body = await request.json();

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors
      const formattedErrors: Record<string, string[]> = {};
      result.error.issues.forEach((error: any) => {
        const path = error.path.join('.');
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(error.message);
      });

      const response: ContactApiResponse = {
        success: false,
        error: "Validation failed",
        issues: formattedErrors,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { name, email, inquiryType, subject, message } = result.data;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "soufiane.chaoufi@gmail.com",
      to: process.env.RESEND_TO_EMAIL || "soufiane.chaoufi@gmail.com",
      subject: `${subject} - Contact from ${name}`,
      react: EmailTemplate({
        name,
        email,
        inquiryType,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      const response: ContactApiResponse = {
        success: false,
        error: "Failed to send email. Please try again later.",
      };
      return NextResponse.json(response, { status: 500 });
    }

    // Return success response
    const response: ContactApiResponse = {
      success: true,
      data: { message: "Email sent successfully!" },
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Server error:", error);
    const response: ContactApiResponse = {
      success: false,
      error: "Internal server error. Please try again later.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
