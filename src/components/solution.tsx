import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  {
    value: "3.34×",
    label: "Peak ROAS",
    context: "Skincare brand, $38K/mo",
  },
  {
    value: "6.6×",
    label: "Peak ROAS",
    context: "Lifestyle brand, $33.5K/mo",
  },
  {
    value: "3.8%",
    label: "Landing page CVR",
    context: "Up from 1.2%",
  },
];

export function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(20,90,220,0.09) 0%, transparent 70%)",
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
          / The Fix
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-14"
          style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-muted-foreground font-light">So What's</span>{" "}
          <span className="text-foreground font-semibold">the Fix?</span>
        </motion.h2>

        {/* Philosophy block — two columns on desktop */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-0 mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <div className="lg:pr-12">
            <p
              className="font-sans leading-[1.85] text-muted-foreground"
              style={{ fontSize: "1.2rem" }}
            >
              Your customer already has beliefs, fears, and desires sitting in their head.
            </p>
            <p
              className="font-sans leading-[1.85] text-muted-foreground mt-4"
              style={{ fontSize: "1.2rem" }}
            >
              The job isn't to invent new thoughts or create new desires.
            </p>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block w-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          <div className="lg:pl-12 flex flex-col justify-center gap-5">
            <p
              className="font-sans leading-[1.85] text-muted-foreground"
              style={{ fontSize: "1.2rem" }}
            >
              It's to find the thoughts already there and connect them to your message.
            </p>
            <p
              className="font-display font-semibold text-foreground leading-snug"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em" }}
            >
              When you get that right, your copy doesn't feel like an ad.{" "}
              <span style={{ color: "#E8B840" }}>It feels like someone reading their mind.</span>
            </p>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            border: "1px solid rgba(232,184,64,0.2)",
            borderRadius: "var(--radius)",
            background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(220 35% 8%) 100%)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.38, ease }}
        >
          {/* Glow top edge */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(232,184,64,0.4), transparent)" }}
          />

          <div className="grid grid-cols-3">
            {stats.map(({ value, label, context }, i) => (
              <motion.div
                key={i}
                className="relative flex flex-col items-center text-center p-4 sm:p-7 lg:p-10"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.45 + i * 0.1, ease }}
              >
                {/* Vertical divider between items */}
                {i > 0 && (
                  <div
                    className="hidden sm:block absolute left-0 top-1/4 bottom-1/4 w-px"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                )}

                <span
                  className="font-display font-semibold leading-none mb-2"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    color: "#E8B840",
                    letterSpacing: "-0.03em",
                    textShadow: "0 0 40px rgba(232,184,64,0.25)",
                  }}
                >
                  {value}
                </span>
                <span
                  className="font-sans font-medium text-foreground/80 uppercase tracking-widest mb-1"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.14em" }}
                >
                  {label}
                </span>
                <span
                  className="font-sans text-muted-foreground"
                  style={{ fontSize: "0.875rem" }}
                >
                  {context}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="font-sans text-center text-muted-foreground mt-10"
          style={{ fontSize: "0.9375rem", lineHeight: "1.75" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75, ease }}
        >
          That's when people click, buy, and come back.
        </motion.p>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
