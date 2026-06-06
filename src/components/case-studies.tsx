import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const caseStudies = [
  {
    number: "01",
    headline: "$1.63M/month Ad Spend — 2.98× ROAS",
    niche: "DTC Luggage Brand",
    tags: ["Creative Strategy", "Video Ads", "Static Ads"],
    image: "/case-studies/luggage.webp",
    additionalImage: "/case-studies/luggage-case-study2.webp",
    stat: { value: "$1.63M", label: "Monthly Ad Spend" },
    roas: "2.98×",
    situation:
      "The brand was spending more than $1.5 million per month on Meta Ads. The biggest challenge at this stage is creative fatigue and maintaining the scale. They thought every angle has been tested and the audience had seen everything.",
    insight:
      "People don't buy luggage. They buy the version of themselves that travels confidently.",
    approach:
      "I found some untapped angles that were not being used to their full potential. But the angles were secondary here.\n\nThe strategy was built on storytelling. I pinned down what the target segments go through in their lives, not necessarily related to travel. What is going on in their lives? What regrets do they have? What is their state of mind?\n\nI then crafted stories that spoke directly to them, made them feel seen. Connecting the product with the story in a natural way was a challenge sometimes. But I focused on the customer instead of the product.",
    result:
      "At that volume, the right angle compounds fast. Storytelling-led creative held performance where product-first creative had started to plateau.",
  },
  {
    number: "02",
    headline: "$38K/month Ad Spend — 3.34× ROAS",
    niche: "DTC Skincare Brand",
    tags: ["Creative Strategy", "UGC Ads", "Product Demo Ads"],
    image: "/case-studies/sugar-baby.webp",
    stat: { value: "$38K", label: "Monthly Ad Spend" },
    roas: "3.34×",
    situation:
      "Skincare is one of the most saturated categories in DTC. Every brand promises glow. Every brand shows before-and-afters. The brand needed creatives that could cut through a market that had heard every claim, and still convert.",
    insight:
      "Customers didn't distrust the product. They distrusted the claims.",
    approach:
      "Show, don't tell…\n\nThe strategy stripped back the copy and let the visual do the convincing. We started showing the results and the mechanism instead of explaining them.\n\nWe created UGC-style demo-ads with creators using the product and showing real results in everyday lighting. Nothing cosmetic at all.\n\nJust proof, visible and undeniable. The viewer draws their own conclusion. That's always more persuasive than being told what to think.",
    result:
      "When the visual does the convincing, the copy doesn't have to work as hard. When both pull in the same direction, the numbers reflect it.",
  },
  {
    number: "03",
    headline: "$33.5K/month Ad Spend — 4.6× ROAS",
    niche: "DTC Eco Laundry Brand",
    tags: ["Creative Strategy", "Video Ads", "UGC Video Ads"],
    image: "/case-studies/dip.webp",
    stat: { value: "$33.5K", label: "Monthly Ad Spend" },
    roas: "4.6×",
    situation:
      "Detergent is a category almost nobody markets emotionally. The brand makes laundry sheets: dissolvable, plastic-free, no toxic chemicals. The product was genuinely different. The creative needed to communicate why that difference mattered.",
    insight:
      "Research found that cleaning is not the no. 1 worry. People can use a bunch of products in the market and get the same results as far as cleaning goes.\n\nThe real concern was the health of their loved ones. They wanted to use a more organic, eco-friendly product.",
    approach:
      "The creative built scenes a parent would recognise. A child in freshly washed pyjamas. The small, everyday reassurance of knowing exactly what's in the product touching your family's skin. Video ads led with the emotional context, then introduced the product as the answer to a concern the viewer already had. UGC-format creative made it feel real.",
    result:
      "In a low-emotion category, 4.6× peak ROAS is a signal that the emotional angle found something the product-first approach would have missed entirely.",
  },
];

type CaseStudy = (typeof caseStudies)[0] & { additionalImage?: string; niche: string; headline: string };

function CaseStudyRow({
  cs,
  index,
  isOpen,
  onToggle,
}: {
  cs: CaseStudy;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease }}
    >
      {/* Top rule */}
      <div
        className="h-px w-full transition-colors duration-300"
        style={{
          background: isOpen
            ? "rgba(232,184,64,0.25)"
            : "rgba(255,255,255,0.08)",
        }}
      />

      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        className="group w-full text-left py-8 lg:py-10 grid grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-center focus-visible:outline-none"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className="font-display font-light text-muted-foreground transition-colors duration-300 shrink-0"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            color: isOpen ? "#E8B840" : undefined,
          }}
        >
          {cs.number}.
        </span>

        {/* Headline + niche + tags */}
        <div className="min-w-0">
          <h3
            className="font-display font-semibold leading-none mb-2 transition-colors duration-300"
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 2rem)",
              letterSpacing: "-0.025em",
              color: isOpen ? "hsl(var(--foreground))" : "hsl(var(--foreground)/0.8)",
            }}
          >
            {cs.headline}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans uppercase tracking-widest"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: isOpen ? "#E8B840" : "hsl(var(--muted-foreground))",
                  transition: "color 0.3s ease",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Niche + expand icon */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="hidden sm:block text-right">
            <div
              className="font-display font-semibold leading-none"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#E8B840", letterSpacing: "-0.02em" }}
            >
              {cs.niche}
            </div>
          </div>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
            style={{
              border: isOpen ? "1px solid rgba(232,184,64,0.4)" : "1px solid rgba(255,255,255,0.14)",
              background: isOpen ? "rgba(232,184,64,0.08)" : "transparent",
            }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.28, ease }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1V11M1 6H11"
                  stroke={isOpen ? "#E8B840" : "hsl(var(--muted-foreground))"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ transition: "stroke 0.3s ease" }}
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-14">

              {/* Left: narrative */}
              <div className="space-y-8">
                {[
                  { label: "The Situation", body: cs.situation },
                  { label: "The Insight", body: cs.insight, highlight: true },
                  { label: "The Approach", body: cs.approach },
                  { label: "The Result", body: cs.result },
                ].map(({ label, body, highlight }) => (
                  <div key={label}>
                    <p
                      className="font-sans uppercase tracking-widest text-muted-foreground mb-2"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.15em" }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-sans leading-[1.8]"
                      style={{
                        fontSize: "1.0625rem",
                        color: highlight ? "hsl(var(--foreground)/0.9)" : "hsl(var(--muted-foreground))",
                        fontStyle: highlight ? "italic" : undefined,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {body}
                    </p>
                  </div>
                ))}

                {/* Mobile ROAS */}
                <div className="sm:hidden flex items-center gap-4">
                  <div>
                    <div
                      className="font-display font-semibold"
                      style={{ fontSize: "2rem", color: "#E8B840", letterSpacing: "-0.02em" }}
                    >
                      {cs.roas}
                    </div>
                    <div
                      className="font-sans text-muted-foreground uppercase tracking-widest"
                      style={{ fontSize: "0.58rem", letterSpacing: "0.12em" }}
                    >
                      Peak ROAS
                    </div>
                  </div>
                  <div
                    className="w-px h-10"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  />
                  <div>
                    <div className="font-display font-semibold text-foreground/80" style={{ fontSize: "1.25rem" }}>
                      {cs.stat.value}
                    </div>
                    <div
                      className="font-sans text-muted-foreground uppercase tracking-widest"
                      style={{ fontSize: "0.58rem", letterSpacing: "0.12em" }}
                    >
                      {cs.stat.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: image + stat */}
              <div className="flex flex-col gap-4">
                <div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: "var(--radius)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    aspectRatio: "4/3",
                  }}
                >
                  <img
                    src={cs.image}
                    alt={cs.niche}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(13,10,7,0.7) 0%, transparent 50%)",
                    }}
                  />
                </div>

                {cs.additionalImage && (
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "var(--radius)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      aspectRatio: "4/3",
                    }}
                  >
                    <img
                      src={cs.additionalImage}
                      alt={`${cs.niche} — additional`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(13,10,7,0.7) 0%, transparent 50%)",
                      }}
                    />
                  </div>
                )}

                {/* Stat card */}
                <div
                  className="hidden sm:flex items-center gap-5 p-5"
                  style={{
                    border: "1px solid rgba(232,184,64,0.18)",
                    borderRadius: "var(--radius)",
                    background: "hsl(var(--card))",
                  }}
                >
                  <div>
                    <div
                      className="font-display font-semibold"
                      style={{ fontSize: "1.75rem", color: "#E8B840", letterSpacing: "-0.02em" }}
                    >
                      {cs.stat.value}
                    </div>
                    <div
                      className="font-sans text-muted-foreground uppercase tracking-widest"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
                    >
                      {cs.stat.label}
                    </div>
                  </div>
                  <div
                    className="w-px h-10"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  />
                  <div>
                    <div
                      className="font-display font-semibold"
                      style={{ fontSize: "1.75rem", color: "#E8B840", letterSpacing: "-0.02em" }}
                    >
                      {cs.roas}
                    </div>
                    <div
                      className="font-sans text-muted-foreground uppercase tracking-widest"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
                    >
                      Peak ROAS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="results" ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,90,220,0.07) 0%, transparent 70%)",
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
          / Results
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-16"
          style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-foreground font-semibold">Case</span>{" "}
          <span className="text-muted-foreground font-light">Studies</span>
        </motion.h2>

        {/* Case study rows */}
        <div>
          {caseStudies.map((cs, i) => (
            <CaseStudyRow
              key={i}
              cs={cs}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
          <div
            className="h-px w-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
