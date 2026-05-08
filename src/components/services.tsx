import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Creative Strategy",
    description:
      "Consumer psychology research, creative briefs, hooks, and scripts built to scale on Meta and TikTok.",
  },
  {
    number: "02",
    title: "CRO Copywriting",
    description:
      "Sales pages, landing pages, and funnels written to convert. Not only to make it clear and consistent with the funnel, but to move people towards an action.",
  },
  {
    number: "03",
    title: "Website Copy",
    description:
      "Full-site copy that positions your brand clearly, sounds human, and doesn't put visitors to sleep halfway through the about page.",
  },
  {
    number: "04",
    title: "Ad Briefs & Scripts",
    description:
      "Hooks engineered to earn the next three seconds. Structures designed to hold attention long enough to actually sell something.",
  },
  {
    number: "05",
    title: "Brand Messaging",
    description:
      "What to say, how to say it, and why it matters. Voice, tone, and messaging framework that makes everything else sharper.",
  },
  {
    number: "06",
    title: "Copy & Creative Audit",
    description:
      "A forensic look at what's not working on your ads, site, or funnel. And a prioritised roadmap to fix it.",
  },
];

function ServiceRow({
  number,
  title,
  description,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.07, ease }}
    >
      {/* Top rule */}
      <div
        className="h-px w-full"
        style={{
          background: isOpen
            ? "rgba(232,184,64,0.3)"
            : "rgba(255,255,255,0.08)",
          transition: "background 0.3s ease",
        }}
      />

      <button
        onClick={onToggle}
        className="group w-full text-left py-7 flex items-start gap-8 focus-visible:outline-none"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className="font-sans shrink-0 mt-1 tabular-nums transition-colors duration-300"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: isOpen ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
          }}
        >
          {number}.
        </span>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <span
            className="font-display font-semibold leading-none block transition-colors duration-300"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.02em",
              color: isOpen ? "hsl(var(--foreground))" : "hsl(var(--foreground)/0.75)",
            }}
          >
            {title}
          </span>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="desc"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease }}
                style={{ overflow: "hidden" }}
              >
                <p
                  className="font-sans text-muted-foreground leading-[1.75] mt-5"
                  style={{ fontSize: "1.0625rem", maxWidth: "52ch" }}
                >
                  {description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle icon */}
        <div
          className="shrink-0 mt-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            border: isOpen
              ? "1px solid rgba(232,184,64,0.4)"
              : "1px solid rgba(255,255,255,0.14)",
            background: isOpen ? "rgba(232,184,64,0.1)" : "transparent",
          }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1V11M1 6H11"
                stroke={isOpen ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ transition: "stroke 0.3s ease" }}
              />
            </svg>
          </motion.div>
        </div>
      </button>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="services" ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="container mx-auto px-6 max-w-5xl">

        {/* Eyebrow */}
        <motion.p
          className="font-display italic text-center text-muted-foreground mb-5"
          style={{ fontSize: "1.2rem", letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          / What I Do
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-20"
          style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-foreground font-semibold">Six Ways</span>{" "}
          <span className="text-muted-foreground font-light">I Can Help</span>
        </motion.h2>

        {/* Accordion */}
        <div>
          {services.map((service, i) => (
            <ServiceRow
              key={i}
              {...service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              isInView={isInView}
            />
          ))}
          {/* Bottom rule */}
          <motion.div
            className="h-px w-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55, ease }}
          />
        </div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
