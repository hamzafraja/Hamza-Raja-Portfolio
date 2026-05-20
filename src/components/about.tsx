import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">

        {/* Eyebrow */}
        <motion.p
          className="font-display italic text-center text-muted-foreground mb-5"
          style={{ fontSize: "1.2rem", letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          / About Me
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-12 lg:mb-20"
          style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-foreground font-semibold">Engineer Turned</span>{" "}
          <span className="text-muted-foreground font-light">Creative Strategist</span>
        </motion.h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: photo + social ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease }}
          >
            <div className="lg:max-w-[50%] mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: "hsl(var(--card))",
                boxShadow:
                  "0 24px 60px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.1)",
                aspectRatio: "4 / 5",
              }}
            >
              <img
                src="/about-photo.webp"
                alt="Hamza Raja"
                loading="lazy"
                className="w-full h-full object-cover object-top"
                style={{ display: "block" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            </div>

            {/* Social icons + name */}
            <div className="flex items-center justify-between mt-5 px-0.5">
              <div className="flex items-center gap-5">
                <a
                  href="https://x.com/hamzafraja"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/hamzafraja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                >
                  <Linkedin className="w-[15px] h-[15px]" />
                </a>
                <a
                  href="https://www.instagram.com/hamxa_raja55/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                >
                  <Instagram className="w-[15px] h-[15px]" />
                </a>
              </div>

              <div className="text-right">
                <p className="font-sans font-semibold text-sm text-foreground leading-tight">
                  Hamza Raja
                </p>
                <p className="font-sans text-xs text-muted-foreground leading-tight mt-0.5">
                  Creative Strategist & Copywriter
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: bio copy ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.26, ease }}
            className="flex flex-col justify-center gap-6"
          >
            {/* Opening lines — given extra weight */}
            <div>
              <p
                className="font-display font-semibold text-foreground leading-snug"
                style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.02em" }}
              >
                I didn't start in marketing.
              </p>
              <p
                className="font-display font-semibold text-foreground leading-snug"
                style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", letterSpacing: "-0.02em" }}
              >
                I started in engineering.
              </p>
            </div>

            <p
              className="font-sans text-muted-foreground leading-[1.8]"
              style={{ fontSize: "1.0625rem" }}
            >
              Which means I don't look at copy the way most people do.
            </p>

            <div
              className="pl-5"
              style={{ borderLeft: "1px solid rgba(232,184,64,0.25)" }}
            >
              <p
                className="font-sans text-muted-foreground leading-[1.8]"
                style={{ fontSize: "1.0625rem" }}
              >
                Most copywriters rely on instinct.
                <br />
                Some rely on formulas.
              </p>
            </div>

            <p
              className="font-display font-semibold text-foreground"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em" }}
            >
              I rely on structure.
            </p>

            <p
              className="font-sans text-muted-foreground leading-[1.8]"
              style={{ fontSize: "1.0625rem" }}
            >
              That process has helped me build ad creative for DTC brands across skincare, home and lifestyle, food, beauty, and health.
            </p>

            <p
              className="font-sans text-muted-foreground leading-[1.8]"
              style={{ fontSize: "1.0625rem" }}
            >
              It has helped me write pages that doubled the conversion rates. And it's helped me work with brands from scrappy startups to names like{" "}
              <span className="text-foreground/80 font-medium">Oral-B</span> and{" "}
              <span className="text-foreground/80 font-medium">PwC</span>.
            </p>

            {/* Closing line */}
            <p
              className="font-display italic text-muted-foreground"
              style={{ fontSize: "1.2rem" }}
            >
              Industries change, the process stays the same.
            </p>
          </motion.div>

        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
