import * as React from "react";
import { Card } from "@/components/ui/card";

interface EmailTemplateProps {
  name: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export const EmailTemplate = ({
  name,
  email,
  inquiryType,
  subject,
  message,
}: EmailTemplateProps) => {
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
            New Contact Form Submission
          </h1>
          <p className="mt-2 text-gray-600">From: {name}</p>
        </div>

        {/* Contact Details */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="w-20 font-semibold text-gray-700">Name:</span>
            <span className="text-gray-900">{name}</span>
          </div>
          <div className="flex gap-3">
            <span className="w-20 font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900">{email}</span>
          </div>
          <div className="flex gap-3">
            <span className="w-20 font-semibold text-gray-700">Type:</span>
            <span className="text-gray-900">
              {getInquiryTypeLabel(inquiryType)}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="w-20 font-semibold text-gray-700">Subject:</span>
            <span className="text-gray-900">{subject}</span>
          </div>
        </div>

        {/* Message Content */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-700">Message:</h3>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="leading-relaxed whitespace-pre-wrap text-gray-800">
              {message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">
            This email was sent from the contact form on soufianechaoufi.com
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Received at: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};
