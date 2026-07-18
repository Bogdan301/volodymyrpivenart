/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * Navigation bar with brand logo, links, and mobile menu
 * Transition: transparent over hero → opaque on scroll
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { label: "Gallery", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === "/";
  const navBg = scrolled || !isHome || mobileOpen
    ? "bg-white/90 backdrop-blur-xl text-charcoal shadow-sm"
    : "bg-transparent text-white";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg}`}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/images/logo2.png"
              alt="Brand Logo"
              className={`w-24 h-12 min-[380px]:w-32 min-[380px]:h-16 sm:w-40 sm:h-20 object-contain flex-shrink-0 ${
                scrolled || !isHome || mobileOpen ? "brightness-0" : "brightness-100"
              }`} />

            <span
              className={`font-label text-base sm:text-lg md:text-xl font-semibold tracking-tight whitespace-nowrap ${
                scrolled || !isHome || mobileOpen ? "text-charcoal" : "text-white"
              }`}
            >
    Volodymyr Piven
  </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`font-label text-sm font-medium transition-colors duration-200 hover:text-crimson ${
                  location === link.href ? "text-crimson" : scrolled || !isHome || mobileOpen ? "text-charcoal/70" : "text-white/80"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
            {/*<LanguageSwitcher />*/}

            <Link href="/contact">
              <button className="font-label text-sm font-medium bg-crimson text-white px-5 py-2.5 rounded-sm hover:bg-crimson/90 transition-colors duration-200 active:scale-[0.97]">
                Get in Touch
              </button>
            </Link>

          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden ml-3 shrink-0 p-2 ${
              scrolled || !isHome || mobileOpen ? "text-charcoal" : "text-white"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="container px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`font-label text-base font-medium ${
                    location === link.href ? "text-crimson" : "text-charcoal"
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ))}
              {/*<LanguageSwitcher />*/}
              <Link href="/contact">
                <button className="font-label text-base font-medium bg-crimson text-white px-5 py-2.5 rounded-sm w-fit">
                  Get in Touch
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
