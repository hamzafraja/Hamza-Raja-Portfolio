import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, FileText } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const ease = [0.22, 1, 0.36, 1] as const;

const staticAds = [
  { src: "/portfolio/static-ads/sugar-baby.jpg", label: "Sugar Baby Care", type: "Static" },
  { src: "/portfolio/static-ads/dip-comparison.jpg", label: "We Are Dip", type: "Comparison" },
  { src: "/portfolio/static-ads/dip-static.jpg", label: "We Are Dip", type: "Static" },
  { src: "/portfolio/static-ads/ad-01.jpg", label: "Ad Creative", type: "Static" },
  { src: "/portfolio/static-ads/ad-02.jpg", label: "Ad Creative", type: "Static" },
  { src: "/portfolio/static-ads/ad-03.jpg", label: "Ad Creative", type: "Static" },
  { src: "/portfolio/static-ads/ad-04.jpg", label: "Ad Creative", type: "Static" },
  { src: "/portfolio/static-ads/ad-05.jpg", label: "Ad Creative", type: "Static" },
  { src: "/portfolio/static-ads/value-static.jpg", label: "Value Ad", type: "Static" },
  { src: "/portfolio/static-ads/airlines-ad.png", label: "Travel Brand", type: "Static" },
];

const videoAds = [
  { src: "/portfolio/video-ads/sugar-baby-1.mp4", label: "Sugar Baby Care", type: "Video Ad" },
  { src: "/portfolio/video-ads/dip-2.mp4", label: "We Are Dip", type: "Video Ad" },
  { src: "/portfolio/video-ads/luhxe-1.mp4", label: "Luhxe", type: "Video Ad" },
  { src: "/portfolio/video-ads/lumos-1.mp4", label: "Lumos", type: "Video Ad" },
  { src: "/portfolio/video-ads/lumos-2.mp4", label: "Lumos", type: "Video Ad" },
];

const copywritingProjects = [
  { src: "/portfolio/display-images/keystone-project.png", label: "Keystone", type: "Landing Page", href: "https://keystoneexecutivecoaching.com/free-business-coach-session/" },
  { src: "/portfolio/display-images/qiqi-project.png", label: "QiQi", type: "Brand Voice & Identity", href: "https://drive.google.com/file/d/1kNDsloUUBZ1y-T_QNEeActw6wRel0Hqo/view?usp=drive_link" },
  { src: "/portfolio/display-images/oral-b-project.png", label: "Oral-B", type: "Media Campaign", href: "https://drive.google.com/file/d/1wEklbMdtQEUeaEKB3ittuIiNDPsSORgy/view?usp=sharing" },
  { src: "/portfolio/display-images/atlantis-landing-page.png", label: "Atlantis Medical", type: "Landing Page", href: "https://get.atlantismedical.com.au/v3-090525#sub-heading-BlactubM5uI-" },
  { src: "/portfolio/display-images/mutha-earth-project.png", label: "Mutha Earth", type: "Product Descriptions", href: "https://muthaearth.ca/collections/all" },
  { src: "/portfolio/display-images/baketivity-project.png", label: "Baketivity", type: "Email Sequence", href: "https://drive.google.com/file/d/1OnzHIq6L2RaYFEMcIBYTRoTTpncx5v34/view?usp=sharing" },
  { src: "/portfolio/display-images/linkedin-posts-project.png", label: "LinkedIn Posts", type: "Founder Content", href: "https://docs.google.com/document/d/1zOY5C9No4PHCkadW9vGRFz8SytQqosNO/edit?usp=drive_link&ouid=103651820346743649227&rtpof=true&sd=true" },
  { src: "/portfolio/display-images/root-tourism-project.png", label: "Italian Roots Tourism", type: "Marketing Strategy", href: "https://drive.google.com/file/d/11WXxGG6WjemeNcFBXnJG29X0oI0GmITF/view?usp=drive_link" },
];

function AdCard({ src, label, type, index }: { src: string; label: string; type: string; index: number }) {
  const isVideo = src.endsWith(".mp4");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      className="group relative overflow-hidden rounded-xl"
      style={{
        background: "hsl(var(--card))",
        boxShadow: "0 4px 24px -4px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src={src}
            alt={label}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-sans font-medium text-white text-sm leading-tight">{label}</p>
          <p className="font-sans text-white/60 text-xs mt-0.5">{type}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ src, label, type, href, index }: { src: string; label: string; type: string; href: string; index: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      className="group relative overflow-hidden rounded-xl block"
      style={{
        background: "hsl(var(--card))",
        boxShadow: "0 4px 24px -4px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        textDecoration: "none",
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Hover overlay tint */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span
            className="inline-block font-sans text-xs font-medium px-2 py-0.5 rounded-full mb-2"
            style={{
              background: "rgba(212,165,116,0.15)",
              color: "hsl(var(--primary))",
              border: "1px solid rgba(212,165,116,0.25)",
            }}
          >
            {type}
          </span>
          <p className="font-display font-semibold text-white text-lg leading-tight">{label}</p>
        </div>
        {/* Link indicator on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(212,165,116,0.9)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="hsl(24 10% 5%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function AdSlider({ label, items, reverse = false }: { label: string; items: { src: string; label: string; type: string }[]; reverse?: boolean }) {
  return (
    <div>
      <p className="font-sans text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6" style={{ letterSpacing: "0.12em" }}>
        {label}
      </p>
      <InfiniteSlider gap={16} duration={40} durationOnHover={80} reverse={reverse}>
        {items.map((ad, i) => (
          <div key={ad.src} style={{ width: "clamp(160px, 20vw, 220px)" }}>
            <AdCard {...ad} index={i} />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="work" ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
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
          / The Work
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-display text-center leading-[1.05] tracking-[-0.025em] mb-16"
          style={{ fontSize: "clamp(2.25rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
        >
          <span className="text-foreground font-semibold">Selected</span>{" "}
          <span className="text-muted-foreground font-light">Work</span>
        </motion.h2>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease }}
        >
          <Tabs defaultValue="ad-creatives">
            {/* Tab Bar */}
            <div className="flex justify-center mb-12">
              <ScrollArea>
                <TabsList
                  className="gap-2 p-1.5 rounded-full"
                  style={{
                    background: "hsl(var(--muted))",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <TabsTrigger
                    value="ad-creatives"
                    className="rounded-full px-4 sm:px-6 py-2 font-sans text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:shadow-none"
                    style={{
                      color: "hsl(var(--muted-foreground))",
                    }}

                  >
                    <Film
                      className="-ms-0.5 me-2 opacity-70"
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Ad Creatives
                  </TabsTrigger>
                  <TabsTrigger
                    value="copywriting"
                    className="rounded-full px-4 sm:px-6 py-2 font-sans text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:shadow-none"
                  >
                    <FileText
                      className="-ms-0.5 me-2 opacity-70"
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Copywriting & Strategy
                  </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* Ad Creatives Tab */}
            <TabsContent value="ad-creatives" className="mt-0">
              <div className="space-y-12">
                <AdSlider label="Video Ads" items={videoAds} />
                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                <AdSlider label="Static Ads" items={staticAds} reverse />
              </div>
            </TabsContent>

            {/* Copywriting & Strategy Tab */}
            <TabsContent value="copywriting" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {copywritingProjects.map((project, i) => (
                  <ProjectCard key={project.src} {...project} index={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
