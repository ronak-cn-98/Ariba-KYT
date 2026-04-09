import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/Brand";

const navLinks = [
  { label: "Org Chart",       href: "/" },
  { label: "Team Directory",  href: "/team-directory" },
  { label: "About",           href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobile(false); }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-base"
      style={{
        background: scrolled
          ? "rgba(9,9,11,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo + hierarchy */}
          <Link to="/" className="group">
            <BrandLockup />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 rounded-lg text-sm transition-base"
                  style={{
                    color: active ? "rgb(244,244,245)" : "rgb(113,113,122)",
                    background: active ? "rgba(255,255,255,0.06)" : "transparent",
                    fontWeight: active ? 500 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "rgb(161,161,170)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "rgb(113,113,122)";
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://cloudnexus.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-base"
              style={{
                background: "rgba(6,182,212,0.1)",
                color: "rgb(6,182,212)",
                border: "1px solid rgba(6,182,212,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(6,182,212,0.1)";
              }}
            >
              cloudnexus.in
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <button
              onClick={() => setMobile(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-base"
              style={{ color: "rgb(113,113,122)" }}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div
            className="md:hidden border-t pb-4"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <div className="pt-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-3 py-2.5 rounded-lg text-sm transition-base"
                    style={{
                      color: active ? "rgb(244,244,245)" : "rgb(113,113,122)",
                      background: active ? "rgba(255,255,255,0.05)" : "transparent",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href="https://cloudnexus.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-lg text-sm mt-1"
                style={{ color: "rgb(6,182,212)" }}
              >
                cloudnexus.in ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
