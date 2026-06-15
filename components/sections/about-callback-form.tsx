"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servicePrimaryButtonClass } from "@/components/services/service-page-ctas";

const SERVICE_OPTIONS = [
  "Custom Home",
  "Renovation",
  "Multi-Family",
  "Commercial",
  "Tenant Improvements",
  "Other",
] as const;

const fieldClass =
  "h-11 rounded-sm border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus-visible:border-brand-navy focus-visible:ring-brand-navy/20";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function AboutCallbackForm() {
  const [service, setService] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!service || status === "submitting") return;

    const formData = new FormData(event.currentTarget);

    setStatus("submitting");

    try {
      const response = await fetch("/api/site-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          service,
          source: "about-callback",
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      event.currentTarget.reset();
      setService("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:min-h-[480px] md:p-8">
      <h3 className="font-serif text-2xl leading-snug tracking-tight text-gray-900 md:text-[1.75rem]">
        Prefer a callback? Leave your details and we&apos;ll be in touch.
      </h3>

      <form className="mt-8 flex flex-1 flex-col" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="callback-first-name" className="text-neutral-600">
              First Name
            </Label>
            <Input
              id="callback-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              disabled={status === "submitting"}
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="callback-last-name" className="text-neutral-600">
              Last Name
            </Label>
            <Input
              id="callback-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              disabled={status === "submitting"}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Label htmlFor="callback-phone" className="text-neutral-600">
            Phone Number
          </Label>
          <Input
            id="callback-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            disabled={status === "submitting"}
            className={fieldClass}
          />
        </div>

        <div className="mt-5 space-y-2">
          <Label htmlFor="callback-email" className="text-neutral-600">
            Email Address
          </Label>
          <Input
            id="callback-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={status === "submitting"}
            className={fieldClass}
          />
        </div>

        <div className="mt-5 space-y-2">
          <Label htmlFor="callback-service" className="text-neutral-600">
            What can we help you with?
          </Label>
          <Select
            value={service}
            onValueChange={setService}
            disabled={status === "submitting"}
          >
            <SelectTrigger
              id="callback-service"
              className={`w-full ${fieldClass}`}
              aria-required="true"
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="service" value={service} />
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            disabled={status === "submitting"}
            className={`${servicePrimaryButtonClass} w-full`}
          >
            <span className="inline-flex items-center justify-center gap-2.5">
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Get in Touch
                  <ArrowRight className="size-4" />
                </>
              )}
            </span>
          </Button>
          <p className="mt-4 text-center text-sm text-neutral-500">
            {status === "success"
              ? "Thanks — we'll be in touch within one business day."
              : status === "error"
                ? "Something went wrong. Please try again or call us directly."
                : "We typically respond within one business day."}
          </p>
        </div>
      </form>
    </div>
  );
}
