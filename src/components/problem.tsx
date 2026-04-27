import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const painPoints = [
  "Running ads.",
  "Testing creatives.",
  "Spending more every month.",
];

const results = [
  "Performance is inconsistent.",
  "Winners don't last.",
  "Nothing really scales.",
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(20,90,220,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 max-w-5xl">

        {/* Eyebrow */}
        <motion.p
          className="font-display italic text-center text-muted-foreground mb-5"
          style={{ fontSize: "1.2rem", letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          / Let's Be Honest
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-16"
          style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-foreground font-semibold">Most Brands</span>{" "}
          <span className="text-muted-foreground font-light italic">Suck at Messaging</span>
        </motion.h2>

        {/* Two-column statement block */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-px mb-10 lg:mb-16"
          style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease }}
        >
          {/* Left: What they're doing */}
          <div
            className="p-8 lg:p-10"
            style={{ background: "hsl(var(--card))" }}
          >
            <p
              className="font-sans text-muted-foreground uppercase tracking-widest mb-6"
              style={{ fontSize: "0.65rem", letterSpacing: "0.14em" }}
            >
              They're
            </p>
            <ul className="space-y-3">
              {painPoints.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-baseline gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease }}
                >
                  <span style={{ color: "#E8B840", fontSize: "0.6rem" }}>—</span>
                  <span
                    className="font-display font-semibold text-foreground leading-snug"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", letterSpacing: "-0.01em" }}
                  >
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: And still */}
          <div
            className="p-8 lg:p-10"
            style={{ background: "hsl(220 35% 6%)" }}
          >
            <p
              className="font-sans text-muted-foreground uppercase tracking-widest mb-6"
              style={{ fontSize: "0.65rem", letterSpacing: "0.14em" }}
            >
              And still…
            </p>
            <ul className="space-y-3">
              {results.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-baseline gap-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
                >
                  <span style={{ color: "rgba(232,184,64,0.5)", fontSize: "0.6rem" }}>—</span>
                  <span
                    className="font-display font-light text-muted-foreground leading-snug"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", letterSpacing: "-0.01em" }}
                  >
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Diagnosis callout */}
        <motion.div
          className="text-center mb-10 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5, ease }}
        >
          <p
            className="font-sans text-muted-foreground leading-[1.75] max-w-[44ch] mx-auto"
            style={{ fontSize: "1rem" }}
          >
            Because the issue isn't effort.
          </p>
          <p
            className="font-display font-semibold text-foreground mt-2"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            It's the message.
          </p>
        </motion.div>

        {/* Failure modes */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.6, ease }}
        >
          {[
            { label: "Mode A", text: "Sound good but don't convert" },
            { label: "Mode B", text: "Convert but feel generic and forgettable" },
          ].map(({ label, text }, i) => (
            <div
              key={i}
              className="relative p-6 overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "var(--radius)",
                background: "hsl(var(--card))",
              }}
            >
              <span
                className="font-sans text-muted-foreground uppercase tracking-widest block mb-3"
                style={{ fontSize: "0.6rem", letterSpacing: "0.15em" }}
              >
                {label}
              </span>
              <p
                className="font-display font-semibold text-foreground leading-snug"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", letterSpacing: "-0.015em" }}
              >
                {text}
              </p>
              {/* Corner accent */}
              <div
                className="absolute bottom-0 right-0 w-12 h-12"
                style={{
                  background: "radial-gradient(circle at 100% 100%, rgba(232,184,64,0.1) 0%, transparent 70%)",
                }}
              />
            </div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="font-display italic text-center text-muted-foreground mt-12"
          style={{ fontSize: "1.1rem" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.75, ease }}
        >
          Very few manage to do both.
        </motion.p>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
