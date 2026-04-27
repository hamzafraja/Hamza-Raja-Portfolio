import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function scrollToContact() {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToWork() {
  document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
}

const avatars = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    alt: "Client 1",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    alt: "Client 2",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    alt: "Client 3",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    alt: "Client 4",
  },
];

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "ads that scale",
      "copy that converts",
      "pages that sell",
      "messages that hit",
      "creatives that last",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div id="home" className="relative w-full min-h-screen flex items-center overflow-hidden grain">
      {/* Layered background gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(20,90,220,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 85% 70%, rgba(20,90,220,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 10% 80%, rgba(20,90,220,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Thin horizontal rule — editorial structure */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-10 py-20 lg:py-28 max-w-4xl mx-auto text-center">

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E8B840]/20 bg-[#E8B840]/6 px-4 py-1.5 text-xs font-sans font-medium tracking-widest uppercase text-[#E8B840]">
              <Sparkles className="w-3 h-3" />
              Creative Strategist &amp; Copywriter
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground -mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Hi, I'm Hamza
          </motion.p>

          {/* Main headline with animated swap */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <h1
              className="font-display font-light leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}
            >
              <span className="text-foreground">I help DTC brands build</span>

              {/* Animated rotating phrase */}
              <span
                className="relative flex w-full justify-center overflow-hidden"
                style={{ height: "1.15em" }}
                aria-live="polite"
              >
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-x-0 font-semibold italic"
                    style={{ color: "#E8B840" }}
                    initial={{ opacity: 0, y: "110%" }}
                    transition={{
                      type: "spring",
                      stiffness: 55,
                      damping: 16,
                    }}
                    animate={
                      titleNumber === index
                        ? { y: "0%", opacity: 1 }
                        : {
                            y: titleNumber > index ? "-110%" : "110%",
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Sub-copy */}
          <motion.p
            className="font-sans text-base md:text-lg leading-[1.75] text-muted-foreground max-w-[42ch]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            Ads, landing pages, websites, and everything in between — built on
            consumer psychology and structured research, not guesswork.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="gap-3 font-sans font-semibold tracking-tight px-8 text-sm"
              style={{
                backgroundColor: "#E8B840",
                color: "#0D0A07",
                boxShadow:
                  "0 0 0 1px rgba(232,184,64,0.3), 0 8px 32px -4px rgba(232,184,64,0.28), 0 2px 8px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F0C84A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E8B840";
              }}
            >
              Free Creative Audit <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              onClick={scrollToWork}
              variant="outline"
              className="gap-3 font-sans tracking-tight px-8 text-sm border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-foreground"
            >
              See My Work
            </Button>
          </motion.div>

          {/* Avatar social proof pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              <div className="flex -space-x-1.5">
                {avatars.map((avatar) => (
                  <img
                    key={avatar.alt}
                    className="rounded-full ring-1 ring-background"
                    src={avatar.src}
                    width={22}
                    height={22}
                    alt={avatar.alt}
                  />
                ))}
              </div>
              <p className="px-3 text-xs font-sans text-muted-foreground flex items-center gap-1.5 whitespace-nowrap">
                <span style={{ fontSize: "0.65rem" }}>⭐⭐⭐⭐⭐</span>
                <span>Trusted by <strong className="font-semibold text-foreground/80">50+</strong> brands</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
