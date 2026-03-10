/* MitochondrialRx — Standalone Navbar
   Typography: DM Sans (geometric sans-serif)
   Logo wordmark: weight 600, wide tracking
   Nav links: weight 400
   CTA buttons: weight 500
*/
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.12)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M24 4 L6 40 L14 40 L24 20 L34 40 L42 40 Z" fill="#C9A96E" />
          <line x1="12" y1="28" x2="36" y2="28" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="20" x2="24" y2="44" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div style={{ lineHeight: 1 }}>
          <span style={{
            display: "block",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "0.9375rem",
            letterSpacing: "0.1em",
            color: "#F5F0E8",
            textTransform: "uppercase",
          }}>MitochondrialRx</span>
          <span style={{
            display: "block",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "0.5625rem",
            letterSpacing: "0.12em",
            color: "#8C7B6B",
            textTransform: "uppercase",
            marginTop: 2,
          }}>Aurelius Health Group</span>
        </div>
      </a>

      {/* Desktop Nav Links */}
      <ul style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        listStyle: "none",
        margin: 0,
        padding: 0,
      }} className="hidden md:flex">
        {[
          { label: "The Problem", href: "#problem" },
          { label: "Mechanism", href: "#mechanism" },
          { label: "Research", href: "#research" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ].map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "rgba(245,240,232,0.72)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0E8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.72)")}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden md:flex">
        <a href="#quiz" className="btn-ghost-cream" style={{ padding: "10px 20px", fontSize: "0.875rem" }}>
          Check Eligibility
        </a>
        <a href="#quiz" className="btn-gold" style={{ padding: "10px 20px", fontSize: "0.875rem" }}>
          Get Started
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
        className="flex md:hidden"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: "block",
            width: 24,
            height: 1.5,
            background: "#F5F0E8",
            borderRadius: 2,
            transition: "transform 0.2s",
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 70,
          left: 0,
          right: 0,
          background: "rgba(13,13,13,0.97)",
          backdropFilter: "blur(16px)",
          padding: "24px 24px 32px",
          borderBottom: "1px solid rgba(201,169,110,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {[
            { label: "The Problem", href: "#problem" },
            { label: "Mechanism", href: "#mechanism" },
            { label: "Research", href: "#research" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 400,
                color: "rgba(245,240,232,0.8)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            <a href="#quiz" onClick={() => setMenuOpen(false)} className="btn-ghost-cream" style={{ justifyContent: "center" }}>
              Check Eligibility
            </a>
            <a href="#quiz" onClick={() => setMenuOpen(false)} className="btn-gold" style={{ justifyContent: "center" }}>
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
