import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { profile } from "@/data/profile";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Set VITE_FORM_ENDPOINT in a .env file (e.g. a Formspree or custom
// endpoint URL) to make this form actually deliver messages. Until
// then, the form is fully validated and interactive but honestly
// tells the visitor no backend is connected, rather than faking a
// "message sent" state.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    if (!FORM_ENDPOINT) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl">
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className="section-label mb-2 block">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="surface w-full rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--accent-soft)]"
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="section-label mb-2 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="surface w-full rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--accent-soft)]"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="section-label mb-2 block">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={handleChange("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="surface w-full resize-none rounded-xl px-4 py-3 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--accent-soft)]"
            placeholder="What are you thinking of building?"
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-400">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          Send Message →
        </button>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-emerald-400"
          >
            <CheckCircle2 size={16} /> Message sent — thank you for reaching out.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle size={16} /> Something went wrong sending that. Please
            try again or reach out via LinkedIn.
          </motion.p>
        )}
        {status === "unconfigured" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="surface flex items-start gap-2 rounded-xl p-4 text-sm text-muted"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-[var(--accent-soft)]" />
            <span>
              This form isn&apos;t connected to a backend yet, so your message
              wasn&apos;t sent.{" "}
              {profile.links.email ? (
                <>
                  Please reach out directly at{" "}
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="underline underline-offset-2"
                  >
                    {profile.links.email}
                  </a>{" "}
                  or via LinkedIn.
                </>
              ) : (
                <>Please reach out directly via LinkedIn or GitHub for now.</>
              )}
            </span>
          </motion.div>
        )}
      </div>
    </form>
  );
}
