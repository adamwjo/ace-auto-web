"use client";

import { useState } from "react";
import GlassCard from "../../src/components/GlassCard";

interface FormState {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  mileage: string;
  concern: string;
  whenStarted: string;
  dashLights: string;
  preferredTime: string;
  urgency: string;
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  mileage: "",
  concern: "",
  whenStarted: "",
  dashLights: "",
  preferredTime: "",
  urgency: "",
};

export default function ServiceRequestPage() {
  const [values, setValues] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | "success" | "error">(null);

  function handleChange(
    field: keyof FormState,
    value: string,
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(null);

    // Front-end-only simulation of submitting to a technician.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setSubmitting(false);
    setSubmitted("success");
    setValues(initialState);
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-10 max-w-3xl border-b border-neutral-300 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Service request
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Tell your technician what the car is doing
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            This form doesn’t book an appointment on its own yet, but it gives
            your technician the context they need so the first conversation is
            already halfway done.
          </p>
        </header>

        <GlassCard className="p-5 sm:p-6 md:p-7 text-sm text-neutral-700">
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]"
          >
            <div className="space-y-5">
              <Fieldset title="Contact details">
                <Field
                  label="Full name"
                  required
                  value={values.name}
                  onChange={(v) => handleChange("name", v)}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Mobile phone"
                    required
                    value={values.phone}
                    onChange={(v) => handleChange("phone", v)}
                  />
                  <Field
                    label="Email address"
                    type="email"
                    value={values.email}
                    onChange={(v) => handleChange("email", v)}
                  />
                </div>
              </Fieldset>

              <Fieldset title="Vehicle details">
                <Field
                  label="Year, make & model"
                  placeholder="e.g. 2017 Toyota Camry SE"
                  required
                  value={values.vehicle}
                  onChange={(v) => handleChange("vehicle", v)}
                />
                <Field
                  label="Approximate mileage"
                  placeholder="e.g. 86,500"
                  value={values.mileage}
                  onChange={(v) => handleChange("mileage", v)}
                />
              </Fieldset>

              <Fieldset title="What is the car doing?">
                <Field
                  label="Describe the concern"
                  as="textarea"
                  placeholder="Noises, vibrations, smells, leaks, performance changes, or anything else you’ve noticed."
                  required
                  value={values.concern}
                  onChange={(v) => handleChange("concern", v)}
                />
                <Field
                  label="When did this start and is it getting worse?"
                  as="textarea"
                  value={values.whenStarted}
                  onChange={(v) => handleChange("whenStarted", v)}
                />
                <Field
                  label="Any dash lights on (ABS, check engine, etc.)?"
                  as="textarea"
                  value={values.dashLights}
                  onChange={(v) => handleChange("dashLights", v)}
                />
              </Fieldset>
            </div>

            <aside className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white/80 p-4 sm:p-5">
              <div className="space-y-4">
                <Field
                  label="Preferred drop-off time"
                  placeholder="e.g. Tomorrow after 8:30am"
                  value={values.preferredTime}
                  onChange={(v) => handleChange("preferredTime", v)}
                />

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    How urgent does this feel?
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg border border-neutral-300/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70"
                    value={values.urgency}
                    onChange={(e) => handleChange("urgency", e.target.value)}
                  >
                    <option value="">Select an option</option>
                    <option value="today">I&apos;m nervous to drive it</option>
                    <option value="soon">Soon (this week)</option>
                    <option value="routine">Routine (next 1–2 months)</option>
                  </select>
                </div>

                <p className="text-[0.75rem] text-neutral-500">
                  After you submit, we’ll review your notes and follow up by phone
                  or email using the contact details you provide.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center rounded-full bg-black px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-red-500/30 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Sending details…" : "Send to technician"}
                </button>
                {submitted === "success" && (
                  <p className="text-[0.78rem] text-emerald-600">
                    Got it. This is a simulated submission only – update this page
                    later when you’re ready to connect it to your real booking
                    process.
                  </p>
                )}
              </div>
            </aside>
          </form>
        </GlassCard>
      </section>
    </main>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  as?: "input" | "textarea";
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

function Field({
  label,
  required,
  as = "input",
  type = "text",
  value,
  placeholder,
  onChange,
}: FieldProps) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const InputTag = as === "textarea" ? "textarea" : "input";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[0.16em] text-slate-600"
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <InputTag
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        {...(as === "textarea"
          ? {
              rows: 3,
            }
          : { type })}
        className="w-full rounded-lg border border-slate-300/80 bg-white/80 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/75 placeholder:text-slate-400"
      />
    </div>
  );
}

function Fieldset({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
      <legend className="px-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}