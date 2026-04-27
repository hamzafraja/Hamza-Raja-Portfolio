import { Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  {
    label: "X / Twitter",
    href: "https://x.com/hamzafraja",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hamzafraja/",
    icon: <Linkedin className="w-[15px] h-[15px]" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hamxa_raja55/",
    icon: <Instagram className="w-[15px] h-[15px]" />,
  },
];

export function MinimalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/[0.06]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-8">

          {/* Name */}
          <p
            className="font-display font-light text-muted-foreground"
            style={{ fontSize: "0.9rem", letterSpacing: "0.01em" }}
          >
            © {year}{" "}
            <span className="text-foreground/70 font-medium">Hamza Raja</span>
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,184,64,0.35)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#E8B840";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,184,64,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "";
                  (e.currentTarget as HTMLAnchorElement).style.background = "";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
