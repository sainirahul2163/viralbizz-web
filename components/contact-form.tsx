"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/site.config";
import { contactSchema } from "@/lib/contact";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-secondary px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-lime";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "appName" | "role" | "source" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      appName: String(data.appName ?? ""),
      role: String(data.role ?? ""),
      source: String(data.source ?? ""),
      message: String(data.message ?? ""),
      website: String(data.website ?? ""),
      startedAt: startedAt.current,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in next)) {
          next[key as keyof FieldErrors] = issue.message;
        }
      }
      setFieldErrors(next);
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setError(result.error ?? "Couldn’t send just now.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Couldn’t send just now. Email us instead.");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-2xl border border-lime/30 bg-card p-8 md:p-10"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium tracking-wide text-lime">Sent</p>
        <h2 className="mt-3 text-2xl font-extrabold">We’ll be in touch.</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Your enquiry is with the strategy team. We reply within 24 hours —
          usually sooner.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-lime hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-border bg-card p-6 md:p-8"
      noValidate
    >
      <h2 className="text-xl font-extrabold">Send an enquiry</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Lands in our inbox. Reply within 24 hours.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(fieldErrors.name)}
            className={cn(fieldClass, fieldErrors.name && "border-red-500")}
            placeholder="Jane Founder"
          />
        </Field>
        <Field label="Work email" htmlFor="email" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(fieldErrors.email)}
            className={cn(fieldClass, fieldErrors.email && "border-red-500")}
            placeholder="jane@app.com"
          />
        </Field>
        <Field
          label="App name"
          htmlFor="appName"
          className="sm:col-span-2"
          error={fieldErrors.appName}
        >
          <input
            id="appName"
            name="appName"
            required
            aria-invalid={Boolean(fieldErrors.appName)}
            className={cn(fieldClass, fieldErrors.appName && "border-red-500")}
            placeholder="The app you want to grow"
          />
        </Field>
        <Field label="Your role" htmlFor="role" error={fieldErrors.role}>
          <SelectWrap>
            <select
              id="role"
              name="role"
              required
              aria-invalid={Boolean(fieldErrors.role)}
              className={cn(
                fieldClass,
                "appearance-none pr-10",
                fieldErrors.role && "border-red-500",
              )}
              defaultValue=""
            >
              <option value="" disabled>
                Select
              </option>
              {siteConfig.contact.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>
        <Field
          label="How did you find us?"
          htmlFor="source"
          error={fieldErrors.source}
        >
          <SelectWrap>
            <select
              id="source"
              name="source"
              required
              aria-invalid={Boolean(fieldErrors.source)}
              className={cn(
                fieldClass,
                "appearance-none pr-10",
                fieldErrors.source && "border-red-500",
              )}
              defaultValue=""
            >
              <option value="" disabled>
                Select
              </option>
              {siteConfig.contact.sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>
        <Field
          label="Tell us about the app"
          htmlFor="message"
          className="sm:col-span-2"
          error={fieldErrors.message}
        >
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            aria-invalid={Boolean(fieldErrors.message)}
            className={cn(
              fieldClass,
              "h-auto min-h-32 py-3",
              fieldErrors.message && "border-red-500",
            )}
            placeholder="What the app does, who it’s for, and what you want from TikTok."
          />
        </Field>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}{" "}
          <a
            className="underline hover:text-lime"
            href={`mailto:${siteConfig.emails.sales}`}
          >
            {siteConfig.emails.sales}
          </a>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_32px_-8px_#8ADE48] transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        No prices on this page. We’ll come back with a strategy call or a custom
        proposal.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
  error,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
