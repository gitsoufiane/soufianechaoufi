import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { EmailTemplate } from "@/components/email-template";
import type { ContactApiResponse } from "@/types/api";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors
      const response: ContactApiResponse = {
        success: false,
        error: "Validation failed",
        issues: result.error.format(),
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
      data: data,
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
