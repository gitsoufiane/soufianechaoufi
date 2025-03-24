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
import { toast } from "sonner";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
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
          message: values.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.issues) {
          // Handle validation errors from the server
          const fieldErrors = errorData.issues;
          Object.keys(fieldErrors).forEach((key) => {
            if (key !== "_errors" && fieldErrors[key]?._errors?.length) {
              form.setError(key as any, {
                type: "server",
                message: fieldErrors[key]._errors[0],
              });
            }
          });
          throw new Error("Please check the form for errors");
        } else {
          throw new Error(errorData.error || "Failed to send email");
        }
      }

      toast.success("Your message has been sent successfully!");
      form.reset();
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
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
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message..."
                  className="min-h-[150px]"
                  {...field}
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
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
