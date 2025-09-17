"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import type { ContactApiResponse } from "@/types/api";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const maxMessageLength = 1000;
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      // Make a POST request to our API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          inquiryType: values.inquiryType,
          subject: values.subject,
          message: values.message,
        }),
      });

      const responseData: ContactApiResponse = await response.json();

      if (!response.ok || !responseData.success) {
        if (responseData.issues) {
          // Handle validation errors from the server
          const fieldErrors = responseData.issues;
          Object.keys(fieldErrors).forEach((key) => {
            if (fieldErrors[key]?.length) {
              form.setError(key as any, {
                type: "server",
                message: fieldErrors[key][0],
              });
            }
          });
          throw new Error("Please check the form for errors");
        } else {
          throw new Error(responseData.error || "Failed to send email");
        }
      }

      toast.success("Your message has been sent successfully!");
      form.reset();
      setMessageLength(0);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send your message. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    {...field}
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.name}
                    aria-describedby={
                      form.formState.errors.name ? "name-error" : undefined
                    }
                  />
                </FormControl>
                <FormMessage id="name-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.email}
                    aria-describedby={
                      form.formState.errors.email ? "email-error" : undefined
                    }
                  />
                </FormControl>
                <FormMessage id="email-error" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inquiry Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.inquiryType}
                    aria-describedby={
                      form.formState.errors.inquiryType
                        ? "inquiry-type-error"
                        : undefined
                    }
                  >
                    <SelectValue placeholder="What can I help you with?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="project">Project Collaboration</SelectItem>
                  <SelectItem value="job">Job Opportunity</SelectItem>
                  <SelectItem value="freelance">Freelance Work</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage id="inquiry-type-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="What's this about?"
                  {...field}
                  aria-required="true"
                  aria-invalid={!!form.formState.errors.subject}
                  aria-describedby={
                    form.formState.errors.subject ? "subject-error" : undefined
                  }
                />
              </FormControl>
              <FormMessage id="subject-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Message</FormLabel>
                <span
                  className={`text-sm ${
                    messageLength > maxMessageLength
                      ? "text-destructive"
                      : messageLength > maxMessageLength * 0.8
                        ? "text-yellow-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {messageLength}/{maxMessageLength}
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project, question, or how I can help you..."
                  className="min-h-[120px] resize-none"
                  {...field}
                  maxLength={maxMessageLength}
                  onChange={(e) => {
                    field.onChange(e);
                    setMessageLength(e.target.value.length);
                  }}
                  aria-required="true"
                  aria-invalid={!!form.formState.errors.message}
                  aria-describedby={
                    form.formState.errors.message ? "message-error" : undefined
                  }
                />
              </FormControl>
              <FormMessage id="message-error" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Message...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
