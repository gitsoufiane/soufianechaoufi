import * as React from "react";
import { Card } from "@/components/ui/card";

interface EmailTemplateProps {
  name: string;
  email: string;
}

export const EmailTemplate = ({ name }: EmailTemplateProps) => (
  <Card className="mx-auto max-w-2xl">
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Message Received</h1>
      </div>

      {/* Thank You Message */}
      <div>
        <p className="text-gray-700">Dear {name},</p>
        <div className="mt-4 space-y-4">
          <p className="text-gray-700">
            Thank you for reaching out. I have received your message and will
            get back to you as soon as possible.
          </p>
          <p className="text-gray-700">
            I appreciate your interest and will make sure to review your message
            carefully.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          If you have any urgent matters, feel free to send a follow-up message
          through the contact form.
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">
          Best regards,
          <br />
          Soufiane Chaoufi
        </p>
        <p className="mt-4 text-xs text-gray-500">
          This is an automated response to confirm the receipt of your message.
          Please do not reply to this email.
        </p>
      </div>
    </div>
  </Card>
);
