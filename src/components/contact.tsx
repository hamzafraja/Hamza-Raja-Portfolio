import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const tiers = [
  {
    label: "One-Time Project",
    description:
      "A specific deliverable. Clear scope, defined timeline, full research phase included.",
  },
  {
    label: "Monthly Retainer",
    description:
      "A consistent pipeline of research-backed creative for brands that need to keep scaling. Limited spots.",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const tier = selected !== null ? tiers[selected].label : "Not specified";

    const subject = encodeURIComponent(`New inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nWebsite: ${website}\nEngagement type: ${tier}\n\nWhat's not converting:\n${message}`
    );
    window.location.href = `mailto:hamzafarooqr@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(20,90,220,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl">

        {/* Eyebrow */}
        <motion.p
          className="font-display italic text-center text-muted-foreground mb-5"
          style={{ fontSize: "1.2rem", letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          / Work With Me
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-6"
          style={{ fontSize: "clamp(2rem, 7vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-foreground font-semibold">Tell me what's</span>
          <br />
          <span className="text-muted-foreground font-light italic">not converting.</span>
        </motion.h2>

        <motion.p
          className="font-sans text-center text-muted-foreground max-w-[46ch] mx-auto mb-16"
          style={{ fontSize: "1.125rem", lineHeight: "1.75" }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease }}
        >
          I work with a small number of clients at a time. The research phase takes real time, and compressed briefs produce compressed results.
        </motion.p>

        {/* Two-column layout: tiers left, form right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">

          {/* Left: Service tiers */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.28, ease }}
          >
            {tiers.map(({ label, description }, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                className="group text-left p-6 transition-all duration-300 focus-visible:outline-none"
                style={{
                  border: selected === i
                    ? "1px solid rgba(232,184,64,0.4)"
                    : "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "var(--radius)",
                  background: selected === i
                    ? "rgba(232,184,64,0.06)"
                    : "hsl(var(--card))",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="font-display font-semibold leading-tight transition-colors duration-300"
                    style={{
                      fontSize: "1.35rem",
                      letterSpacing: "-0.015em",
                      color: selected === i ? "hsl(var(--foreground))" : "hsl(var(--foreground)/0.8)",
                    }}
                  >
                    {label}
                  </h3>
                  <div
                    className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center mt-0.5 transition-all duration-300"
                    style={{
                      border: selected === i
                        ? "1px solid rgba(232,184,64,0.5)"
                        : "1px solid rgba(255,255,255,0.15)",
                      background: selected === i ? "#E8B840" : "transparent",
                    }}
                  >
                    {selected === i && <Check className="w-2.5 h-2.5 text-[#050912]" />}
                  </div>
                </div>
                <p
                  className="font-sans text-muted-foreground leading-[1.7]"
                  style={{ fontSize: "1rem" }}
                >
                  {description}
                </p>
              </button>
            ))}

            {/* Response promise */}
            <p
              className="font-sans text-muted-foreground leading-[1.7] mt-2"
              style={{ fontSize: "0.9375rem" }}
            >
              Fill in the form. I'll come back within{" "}
              <span className="text-foreground/70 font-medium">24 hours</span> with one specific thing I'd look at first.
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.36, ease }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center h-full py-16 px-8"
                style={{
                  border: "1px solid rgba(232,184,64,0.2)",
                  borderRadius: "var(--radius)",
                  background: "hsl(var(--card))",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(232,184,64,0.1)",
                    border: "1px solid rgba(232,184,64,0.25)",
                  }}
                >
                  <Check className="w-5 h-5" style={{ color: "#E8B840" }} />
                </div>
                <h3
                  className="font-display font-semibold text-foreground mb-3"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
                >
                  Got it.
                </h3>
                <p
                  className="font-sans text-muted-foreground leading-[1.7]"
                  style={{ fontSize: "0.9rem" }}
                >
                  I'll be back within 24 hours with one specific thing I'd look at first.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-7 lg:p-9 flex flex-col gap-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "var(--radius)",
                  background: "hsl(var(--card))",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Name" id="name" placeholder="Your name" required />
                  <Field label="Email" id="email" type="email" placeholder="your@email.com" required />
                </div>
                <Field label="Website / Brand URL" id="website" placeholder="https://" />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-sans text-foreground/70 uppercase tracking-widest"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}
                  >
                    What's not converting?
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your ads, landing page, funnel — wherever the leak is."
                    className="font-sans text-foreground/80 resize-none focus:outline-none transition-colors duration-200"
                    style={{
                      background: "hsl(24 10% 8%)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      padding: "12px 14px",
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      color: "inherit",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(232,184,64,0.35)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 font-sans font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none mt-1"
                  style={{
                    backgroundColor: "#E8B840",
                    color: "#0D0A07",
                    padding: "14px 28px",
                    borderRadius: "var(--radius)",
                    fontSize: "1rem",
                    boxShadow:
                      "0 0 0 1px rgba(232,184,64,0.25), 0 8px 32px -4px rgba(232,184,64,0.22), 0 2px 8px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F0C84A";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E8B840";
                  }}
                >
                  Send It
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-sans text-foreground/70 uppercase tracking-widest"
        style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="font-sans text-foreground/80 focus:outline-none transition-colors duration-200"
        style={{
          background: "hsl(24 10% 8%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "calc(var(--radius) - 2px)",
          padding: "10px 14px",
          fontSize: "1rem",
          color: "inherit",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(232,184,64,0.35)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      />
    </div>
  );
}
