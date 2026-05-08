import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home",     href: "#home",     path: "/" },
  { label: "Services", href: "#services", path: "/services" },
  { label: "Work",     href: "#work",     path: "/work" },
  { label: "Results",  href: "#results",  path: "/results" },
  { label: "About",    href: "#about",    path: "/about" },
];

function scrollToSection(href: string, navigate: ReturnType<typeof useNavigate>, path: string) {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    navigate(path, { replace: true });
  }
}

type Position = { left: number; width: number; opacity: number };

const Tab = ({
  children,
  setPosition,
  onClick,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 cursor-pointer px-4 py-2 font-sans text-xs uppercase tracking-widest transition-colors duration-200 select-none"
      style={{ letterSpacing: "0.1em", color: "hsl(var(--muted-foreground))" }}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 rounded-full pointer-events-none"
    style={{
      top: "4px",
      height: "calc(100% - 8px)",
      background: "rgba(232,184,64,0.12)",
      border: "1px solid rgba(232,184,64,0.25)",
    }}
  />
);

export function NavHeader() {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const handler = () => setMenuOpen(false);
      window.addEventListener("scroll", handler, { passive: true, once: true });
    }
  }, [menuOpen]);

  // On initial load, scroll to the section matching the current path
  useEffect(() => {
    const path = window.location.pathname;
    const match = navItems.find(item => item.path === path);
    if (match && match.path !== "/") {
      setTimeout(() => {
        const el = document.querySelector(match.href);
        if (el) el.scrollIntoView({ behavior: "instant" });
      }, 100);
    }
  }, []);

  const handleNav = (href: string, path: string) => {
    setMenuOpen(false);
    scrollToSection(href, navigate, path);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-6 lg:px-10 transition-all duration-500"
        style={{
          height: "60px",
          background: scrolled || menuOpen ? "rgba(5,9,18,0.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px) saturate(1.2)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("#home", "/")}
          className="shrink-0 focus-visible:outline-none"
          aria-label="Home"
        >
          <img src="/Logo.png" alt="Hamza Raja" style={{ height: "120px", width: "auto" }} />
        </button>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-3">
          <nav>
            <ul
              className="relative flex items-center rounded-full p-1"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
              onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
            >
              {navItems.map(({ label, href, path }) => (
                <Tab key={label} setPosition={setPosition} onClick={() => handleNav(href, path)}>
                  {label}
                </Tab>
              ))}
              <Cursor position={position} />
            </ul>
          </nav>

          <button
            onClick={() => handleNav("#contact", "/contact")}
            className="font-sans text-xs uppercase tracking-widest transition-all duration-200 focus-visible:outline-none"
            style={{
              letterSpacing: "0.1em", padding: "9px 18px", borderRadius: "9999px",
              background: "#E8B840", color: "#050912", fontWeight: 600,
              boxShadow: "0 0 0 1px rgba(232,184,64,0.25), 0 4px 16px -2px rgba(232,184,64,0.18)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#F0C84A"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#E8B840"; }}
          >
            Contact
          </button>
        </div>

        {/* Mobile: Contact CTA + Hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={() => handleNav("#contact", "/contact")}
            className="font-sans text-xs uppercase tracking-widest focus-visible:outline-none"
            style={{
              letterSpacing: "0.1em", padding: "7px 14px", borderRadius: "9999px",
              background: "#E8B840", color: "#050912", fontWeight: 600,
            }}
          >
            Contact
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[60px] left-0 right-0 z-40 sm:hidden flex flex-col"
            style={{
              background: "rgba(5,9,18,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[...navItems, { label: "Contact", href: "#contact", path: "/contact" }].map(({ label, href, path }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                onClick={() => handleNav(href, path)}
                className="flex items-center justify-between px-6 py-4 font-sans text-sm uppercase tracking-widest text-left transition-colors duration-150 focus-visible:outline-none"
                style={{
                  letterSpacing: "0.12em",
                  color: label === "Contact" ? "#E8B840" : "hsl(var(--foreground)/0.75)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {label}
                <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.6rem" }}>
                  {path === "/" ? "↑" : "→"}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
