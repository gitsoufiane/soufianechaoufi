import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';
import { EmailTemplate } from '@/components/email-template';

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
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          issues: result.error.format()
        },
        { status: 400 }
      );
    }
    
    const { name, email, message } = result.data;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'soufiane.chaoufi@gmail.com', // Use your verified domain if you have one
      to: 'soufiane.chaoufi@gmail.com', // Your email address
      subject: `New message from ${name}`,
      react: EmailTemplate({
        name,
        email,
        message,
      })
    });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
