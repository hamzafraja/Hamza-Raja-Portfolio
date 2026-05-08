import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Hamza is an excellent communicator and his writing skills are top-notch. He was able to transform my website in under two weeks. I saw a clear surge in booked calls after Hamza optimized the website. I will re-hire Hamza as my business grows.",
    name: "Pita Dhaliwal",
    role: "Business Owner",
    company: "Vernon BC",
    image: "/testimonials/pita.png",
  },
  {
    quote: "Hamza brings a thoughtful, research-driven approach to copywriting. He has a strong grasp of buyer psychology and conversion-focused writing. His collaborative attitude, curiosity, and ability to think strategically about both brand and direct response make him a strong asset to any marketing team.",
    name: "Matt Mason",
    role: "Director of CRO",
    company: "Modern AI",
    image: "/testimonials/matt.png",
  },
  {
    quote: "I am always on the lookout for great copywriters, both for my own businesses as well as for my clients. Hamza is one of the best copywriters I have worked with. I would highly recommend. I now come to him on a regular basis and he has proven his abilities on a number of very different subject areas.",
    name: "Joshua George",
    role: "Blogger & Founder",
    company: "Clickslice",
    image: "/testimonials/joshua.png",
  },
  {
    quote: "Hamza wrote video ads for us that performed really well. It was a pleasure working with him.",
    name: "Gregory Fleurot",
    role: "Director of HR & Operations",
    company: "InnovativeLanguage.com",
    image: "/testimonials/gregory.png",
  },
  {
    quote: "It's been a pleasure to work with Hamza. He is very good at his work. Our project scope and timeline changed midway, and he's been very understanding and patient, demonstrating a high level of professionalism. I'll definitely work with Hamza again.",
    name: "Madeline Wang",
    role: "Founder",
    company: "7cs Leadership",
    image: "/testimonials/madeline.png",
  },
  {
    quote: "Highly recommend! Hamza has been amazing to work with. He is very quick to respond and exceeded all expectations of what I was looking for. Can't wait to work with him again in the future!",
    name: "Hilary MacHac",
    role: "Marketing Coordinator",
    company: "Oak Haven",
    image: "/testimonials/hilary.png",
  },
  {
    quote: "Hamza produced amazing product descriptions for us. It was such a pleasure to work with him. Would definitely hire him again.",
    name: "Kat Moon",
    role: "Business Coach & Co-Founder",
    company: "Mutha Earth",
    image: "/testimonials/kat.png",
  },
  {
    quote: "Went out of his way to write ads for my affiliate business on short notice, great work!",
    name: "Kelton Driedger",
    role: "Founder",
    company: "JD Digital Brands Inc.",
    image: "/testimonials/kelton.png",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl">

        {/* Eyebrow */}
        <motion.p
          className="font-display italic text-center text-muted-foreground mb-5"
          style={{ fontSize: "1.2rem", letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          / What Clients Say
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-16"
          style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-foreground font-semibold">Their Words,</span>{" "}
          <span className="text-muted-foreground font-light">Not Mine</span>
        </motion.h2>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {testimonials.map(({ name, role, company, quote, image }, index) => (
            <motion.div
              key={index}
              initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
              whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index + 0.1, duration: 0.7, ease }}
              className="relative overflow-hidden p-5"
              style={{
                background: "hsl(var(--card))",
                border: "1px dashed rgba(255,255,255,0.12)",
                borderRadius: "var(--radius)",
              }}
            >
              {/* Subtle grid pattern inside card */}
              <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-white/[0.01] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                  <GridPattern
                    width={24}
                    height={24}
                    x={-10}
                    y={4}
                    strokeDasharray="3"
                    className="stroke-white/10 absolute inset-0 h-full w-full mix-blend-overlay"
                  />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="hsl(var(--primary))" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 mb-5">
                <p
                  className="font-sans text-foreground/80 leading-[1.75]"
                  style={{ fontSize: "0.9375rem" }}
                >
                  "{quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="relative z-10 flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover object-top shrink-0"
                  style={{
                    boxShadow: "0 0 0 2px rgba(232,184,64,0.25)",
                  }}
                />
                <div>
                  <p className="font-sans font-medium text-foreground leading-tight" style={{ fontSize: "0.9375rem" }}>
                    {name}
                  </p>
                  <p className="font-sans text-muted-foreground leading-tight mt-0.5" style={{ fontSize: "0.7rem" }}>
                    {role} · {company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
