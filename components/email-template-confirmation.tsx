import * as React from "react";
import { Card } from "@/components/ui/card";

interface EmailConfirmationTemplateProps {
  name: string;
  inquiryType: string;
  subject: string;
}

export const EmailConfirmationTemplate = ({
  name,
  inquiryType,
  subject,
}: EmailConfirmationTemplateProps) => {
  const getInquiryTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      general: "General Inquiry",
      project: "Project Collaboration",
      job: "Job Opportunity",
      freelance: "Freelance Work",
      consultation: "Consultation",
      other: "Other",
    };
    return types[type] || type;
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Thank you for reaching out!
          </h1>
          <p className="mt-2 text-gray-600">Hi {name},</p>
        </div>

        {/* Confirmation Message */}
        <div className="space-y-4">
          <p className="text-gray-800">
            I've received your message and wanted to confirm that it reached me successfully.
            I appreciate you taking the time to get in touch.
          </p>

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold text-gray-700">Your submission details:</h3>
            <div className="space-y-2">
              <div className="flex gap-3">
                <span className="w-16 font-medium text-gray-600">Type:</span>
                <span className="text-gray-900">{getInquiryTypeLabel(inquiryType)}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-16 font-medium text-gray-600">Subject:</span>
                <span className="text-gray-900">{subject}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-800">
            I typically respond to messages within <strong>24 hours</strong>. If your inquiry is urgent,
            please feel free to reach out to me directly at{" "}
            <a href="mailto:soufianechaoufi@gmail.com" className="text-blue-600 underline">
              soufianechaoufi@gmail.com
            </a>.
          </p>
        </div>

        {/* Contact Info */}
        <div className="rounded-lg border border-gray-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-gray-800">Connect with me:</h3>
          <div className="space-y-1 text-sm text-gray-700">
            <p>📧 Email: soufianechaoufi@gmail.com</p>
            <p>💼 LinkedIn: linkedin.com/in/soufianechaoufi</p>
            <p>🐙 GitHub: github.com/gitsoufiane</p>
            <p>🌐 Website: soufianechaoufi.com</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600">
            Best regards,<br />
            <strong>Soufiane Chaoufi</strong><br />
            Senior Frontend Developer
          </p>
          <p className="mt-3 text-xs text-gray-500">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Sent at: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};