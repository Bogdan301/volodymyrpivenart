/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * Footer with brand info, social links, and navigation
 */
import { Link } from "wouter";
import { Instagram, Facebook, Mail, Palette } from "lucide-react";
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo2.png"
                alt="Brand Logo"
                className="w-24 h-12 min-[380px]:w-32 min-[380px]:h-16 sm:w-40 sm:h-20 object-contain flex-shrink-0"
              />
              <span className="font-label text-xl font-semibold text-white">
                Volodymyr Piven
              </span>
            </Link>
            <p className="text-white/60 text-base leading-relaxed max-w-sm">
              A collection of paintings exploring the intersection of color and emotion.
              Each canvas is a conversation between bold strokes and vivid imagination.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-label text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              <li><Link href="/"><span className="text-white/60 hover:text-golden transition-colors duration-200 font-label text-sm">Gallery</span></Link></li>
              <li><Link href="/about"><span className="text-white/60 hover:text-golden transition-colors duration-200 font-label text-sm">About</span></Link></li>
              <li><Link href="/blog"><span className="text-white/60 hover:text-golden transition-colors duration-200 font-label text-sm">Blog</span></Link></li>
              <li><Link href="/contact"><span className="text-white/60 hover:text-golden transition-colors duration-200 font-label text-sm">Contact</span></Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-label text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://www.instagram.com/volodymyrpivenart/" aria-label="Instagram" className="p-2.5 rounded-sm bg-white/5 hover:bg-crimson transition-colors duration-200">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/19BFbJBy13/?mibextid=wwXIfr" aria-label="Facebook" className="p-2.5 rounded-sm bg-white/5 hover:bg-crimson transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a href="https://www.tiktok.com/@volodymyrpivenart?_r=1&_t=ZS-97yHOLXKasU" aria-label="Twitter" className="p-2.5 rounded-sm bg-white/5 hover:bg-crimson transition-colors duration-200">
                <TikTokIcon size={18} />
              </a>
              <a href="mailto:vladimirpivenart@gmail.com" aria-label="Email" className="p-2.5 rounded-sm bg-white/5 hover:bg-crimson transition-colors duration-200">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-label">
            &copy; 2026 Volodymyr Piven. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-white/40 text-sm font-label">
            <Palette size={14} />
            <span>Each canvas tells a story</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
