import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, FileText, Play, Pause } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface MediaItem {
  src: string;
  label: string;
  type: string;
  href?: string;
}

const videoAds: MediaItem[] = [
  // Sugar Baby Care
  { src: "/portfolio/video-ads/sugar-baby-2.mp4",      label: "Sugar Baby Care",   type: "Video Ad" },
  { src: "/portfolio/video-ads/sugar-baby-3.mp4",      label: "Sugar Baby Care",   type: "Video Ad" },
  // Luhxe
  { src: "/portfolio/video-ads/luhxe-2.mp4",           label: "Luhxe",             type: "Video Ad" },
  { src: "/portfolio/video-ads/luhxe-founder.mp4",     label: "Luhxe",             type: "Video Ad" },
  // We Are Dip
  { src: "/portfolio/video-ads/dip-1.mp4",             label: "We Are Dip",        type: "Video Ad" },
  { src: "/portfolio/video-ads/dip-2.mp4",             label: "We Are Dip",        type: "Video Ad" },
  // Others
  { src: "/portfolio/video-ads/japanese-pod.mp4",      label: "JapanesePod101",    type: "Video Ad" },
  { src: "/portfolio/video-ads/lumos-3.mp4",           label: "Lumos",             type: "Video Ad" },
  { src: "/portfolio/video-ads/lumos-knitting.mp4",    label: "Lumos",             type: "Video Ad" },
  { src: "/portfolio/video-ads/metallic-flooring.mp4", label: "Metallic Flooring", type: "Video Ad" },
];

const staticAds: MediaItem[] = [
  // Flair
  { src: "/portfolio/static-ads/flair-futbol-1.webp",                    label: "Flair Futbol",   type: "Static Ad" },
  { src: "/portfolio/static-ads/flair-futbol-2.webp",                    label: "Flair Futbol",   type: "Static Ad" },
  { src: "/portfolio/static-ads/Flair Ad.webp",                          label: "Flair Futbol",   type: "Static Ad" },
  // Sugar Baby Care
  { src: "/portfolio/static-ads/sugar-baby.webp",                        label: "Sugar Baby Care", type: "Static Ad" },
  { src: "/portfolio/static-ads/Sugar Baby Care - Before:after.webp",    label: "Sugar Baby Care", type: "Static Ad" },
  // Enclir
  { src: "/portfolio/static-ads/Enclir -Static Ad.webp",                 label: "Enclir",         type: "Static Ad" },
  { src: "/portfolio/static-ads/Enclir (before:after) - Static Ad.webp", label: "Enclir",         type: "Static Ad" },
  // We Are Dip
  { src: "/portfolio/static-ads/dip-static.webp",                        label: "We Are Dip",     type: "Static Ad" },
  { src: "/portfolio/static-ads/We are dip - value ad.webp",             label: "We Are Dip",     type: "Static Ad" },
  // Luhxe
  { src: "/portfolio/static-ads/Luhxe.webp",                             label: "Luhxe",          type: "Static Ad" },
  { src: "/portfolio/static-ads/Luhxe static ad.webp",                   label: "Luhxe",          type: "Static Ad" },
  { src: "/portfolio/static-ads/Luhxe value-static.webp",                label: "Luhxe",          type: "Static Ad" },
];

const copywritingProjects: MediaItem[] = [
  { src: "/portfolio/display-images/keystone-project.webp",      label: "Keystone",             type: "Landing Page",        href: "https://keystoneexecutivecoaching.com/free-business-coach-session/" },
  { src: "/portfolio/display-images/qiqi-project.webp",          label: "QiQi",                 type: "Brand Voice & Identity", href: "https://drive.google.com/file/d/1kNDsloUUBZ1y-T_QNEeActw6wRel0Hqo/view?usp=drive_link" },
  { src: "/portfolio/display-images/oral-b-project.webp",        label: "Oral-B",               type: "Media Campaign",      href: "https://drive.google.com/file/d/1wEklbMdtQEUeaEKB3ittuIiNDPsSORgy/view?usp=sharing" },
  { src: "/portfolio/display-images/atlantis-landing-page.webp", label: "Atlantis Medical",     type: "Landing Page",        href: "https://get.atlantismedical.com.au/v3-090525#sub-heading-BlactubM5uI-" },
  { src: "/portfolio/display-images/mutha-earth-project.webp",   label: "Mutha Earth",          type: "Product Descriptions", href: "https://muthaearth.ca/collections/all" },
  { src: "/portfolio/display-images/baketivity-project.webp",    label: "Baketivity",           type: "Email Sequence",      href: "https://drive.google.com/file/d/1OnzHIq6L2RaYFEMcIBYTRoTTpncx5v34/view?usp=sharing" },
  { src: "/portfolio/display-images/linkedin-posts-project.webp", label: "LinkedIn Posts",      type: "Founder Content",     href: "https://docs.google.com/document/d/1zOY5C9No4PHCkadW9vGRFz8SytQqosNO/edit?usp=drive_link&ouid=103651820346743649227&rtpof=true&sd=true" },
  { src: "/portfolio/display-images/root-tourism-project.webp",  label: "Italian Roots Tourism", type: "Marketing Strategy", href: "https://drive.google.com/file/d/11WXxGG6WjemeNcFBXnJG29X0oI0GmITF/view?usp=drive_link" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(s: number) {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

// ─── Video Card ───────────────────────────────────────────────────────────────

function VideoCard({
  item,
  index,
  isActive,
  onActivate,
}: {
  item: MediaItem;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);
  const dragging    = useRef(false);

  const [isPlaying,   setIsPlaying]   = useState(false);
  const [progress,    setProgress]    = useState(0);   // 0–100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);

  // Activate / deactivate
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.muted = false;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  }, [isActive]);

  // Time / metadata listeners
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (dragging.current) return;
      setCurrentTime(v.currentTime);
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    };
    const onMeta  = () => setDuration(v.duration);
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener("timeupdate",     onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play",           onPlay);
    v.addEventListener("pause",          onPause);
    return () => {
      v.removeEventListener("timeupdate",     onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play",           onPlay);
      v.removeEventListener("pause",          onPause);
    };
  }, []);

  // Seek to ratio derived from a pointer event on the bar
  const seekFromPointer = useCallback((clientX: number) => {
    const bar = barRef.current;
    const v   = videoRef.current;
    if (!bar || !v || !v.duration) return;
    const { left, width } = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio * 100);
    setCurrentTime(ratio * v.duration);
  }, []);

  const onBarPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    seekFromPointer(e.clientX);
  }, [seekFromPointer]);

  const onBarPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    e.stopPropagation();
    seekFromPointer(e.clientX);
  }, [seekFromPointer]);

  const onBarPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.stopPropagation();
  }, []);

  // Play / pause button in controls
  const onTogglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play().catch(() => {}) : v.pause();
  }, []);

  // Card body click
  const onCardClick = useCallback(() => {
    if (!isActive) {
      onActivate();
    } else {
      const v = videoRef.current;
      if (!v) return;
      v.paused ? v.play().catch(() => {}) : v.pause();
    }
  }, [isActive, onActivate]);

  return (
    <motion.div
      onClick={onCardClick}
      className="group relative overflow-hidden rounded-xl cursor-pointer select-none"
      style={{
        aspectRatio: "9/16",
        background: "hsl(var(--card))",
        boxShadow: isActive
          ? "0 0 0 2px hsl(var(--primary)), 0 8px 32px -4px rgba(0,0,0,0.6)"
          : "0 4px 24px -4px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        transition: "box-shadow 0.25s ease",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease }}
      whileHover={{ y: isActive ? 0 : -4, transition: { duration: 0.25, ease } }}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        playsInline
        preload="metadata"
        loop
        className="w-full h-full object-cover"
      />

      {/* Persistent bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 45%, transparent 65%)",
        }}
      />

      {/* ── Inactive state: centered play button + label ── */}
      {!isActive && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100"
              style={{
                width: 48, height: 48,
                background: "rgba(255,255,255,0.16)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                transition: "opacity 0.2s ease",
              }}
            >
              <Play size={16} fill="white" className="text-white" style={{ marginLeft: 2 }} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
            <p className="font-sans font-medium text-white text-xs leading-tight">{item.label}</p>
            <p className="font-sans text-white/50 text-[10px] mt-0.5">{item.type}</p>
          </div>
        </>
      )}

      {/* ── Active state: scrubber controls at bottom ── */}
      {isActive && (
        <div
          className="absolute bottom-0 left-0 right-0 px-3 pt-2 pb-3"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Label */}
          <p className="font-sans font-medium text-white text-xs mb-2 leading-tight">{item.label}</p>

          {/* Progress / seek bar */}
          <div
            ref={barRef}
            className="relative w-full mb-2 cursor-pointer"
            style={{ height: 18, display: "flex", alignItems: "center" }}
            onPointerDown={onBarPointerDown}
            onPointerMove={onBarPointerMove}
            onPointerUp={onBarPointerUp}
          >
            {/* Track */}
            <div className="w-full rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.2)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "hsl(var(--primary))",
                  transition: dragging.current ? "none" : "width 0.1s linear",
                }}
              />
            </div>
            {/* Thumb */}
            <div
              className="absolute rounded-full"
              style={{
                width: 10, height: 10,
                background: "hsl(var(--primary))",
                left: `calc(${progress}% - 5px)`,
                top: "50%",
                transform: "translateY(-50%)",
                boxShadow: "0 0 4px rgba(0,0,0,0.5)",
                transition: dragging.current ? "none" : "left 0.1s linear",
              }}
            />
          </div>

          {/* Play/Pause + time */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePlay}
              className="flex items-center justify-center rounded-full shrink-0"
              style={{
                width: 26, height: 26,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {isPlaying
                ? <Pause size={11} fill="white" className="text-white" />
                : <Play  size={11} fill="white" className="text-white" style={{ marginLeft: 1 }} />
              }
            </button>
            <span className="font-sans text-white/60 tabular-nums" style={{ fontSize: 10 }}>
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Static Ad Card ───────────────────────────────────────────────────────────

function StaticAdCard({ item, index }: { item: MediaItem; index: number }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl"
      style={{
        aspectRatio: "1/1",
        background: "hsl(var(--card))",
        boxShadow: "0 4px 24px -4px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
    >
      <img
        src={item.src}
        alt={item.label}
        loading="lazy"
        className="w-full h-full object-contain"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
          transition: "opacity 0.3s ease",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none transition-all duration-300">
        <p className="font-sans font-medium text-white text-xs leading-tight">{item.label}</p>
        <p className="font-sans text-white/50 text-[10px] mt-0.5">{item.type}</p>
      </div>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ item, index }: { item: MediaItem; index: number }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl block"
      style={{
        aspectRatio: "16/10",
        background: "hsl(var(--card))",
        boxShadow: "0 4px 24px -4px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        textDecoration: "none",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
    >
      <img
        src={item.src}
        alt={item.label}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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
          {item.type}
        </span>
        <p className="font-display font-semibold text-white text-lg leading-tight">{item.label}</p>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(212,165,116,0.9)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="hsl(24 10% 5%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-sans text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6"
      style={{ letterSpacing: "0.12em" }}
    >
      {children}
    </p>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);

  return (
    <section id="work" ref={ref} className="relative w-full py-20 lg:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl">

        <motion.p
          className="font-display italic text-center text-muted-foreground mb-5"
          style={{ fontSize: "1.2rem", letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          / The Work
        </motion.p>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease }}
        >
          <Tabs defaultValue="ad-creatives">
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
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <Film className="-ms-0.5 me-2 opacity-70" size={15} strokeWidth={2} aria-hidden="true" />
                    Ad Creatives
                  </TabsTrigger>
                  <TabsTrigger
                    value="copywriting"
                    className="rounded-full px-4 sm:px-6 py-2 font-sans text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:shadow-none"
                  >
                    <FileText className="-ms-0.5 me-2 opacity-70" size={15} strokeWidth={2} aria-hidden="true" />
                    Copywriting & Strategy
                  </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <TabsContent value="ad-creatives" className="mt-0">
              <div className="space-y-14">
                <div>
                  <SectionLabel>Video Ads</SectionLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {videoAds.map((item, i) => (
                      <VideoCard
                        key={item.src}
                        item={item}
                        index={i}
                        isActive={activeVideoSrc === item.src}
                        onActivate={() => setActiveVideoSrc(item.src)}
                      />
                    ))}
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

                <div>
                  <SectionLabel>Static Ads</SectionLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {staticAds.map((item, i) => (
                      <StaticAdCard key={item.src} item={item} index={i} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="copywriting" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {copywritingProjects.map((item, i) => (
                  <ProjectCard key={item.src} item={item} index={i} />
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
