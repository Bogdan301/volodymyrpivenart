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
function PinterestIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.171-2.911 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.283 1.194.6 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.09.375-.293 1.194-.332 1.361-.053.218-.173.265-.4.159-1.492-.694-2.424-2.878-2.424-4.632 0-3.771 2.741-7.237 7.9-7.237 4.146 0 7.373 2.955 7.373 6.901 0 4.115-2.594 7.428-6.199 7.428-1.211 0-2.35-.629-2.738-1.373 0 0-.599 2.281-.744 2.84-.269 1.037-.996 2.334-1.482 3.127 1.117.345 2.303.531 3.536.531 6.62 0 11.987-5.367 11.987-11.987C23.987 5.367 18.62 0 12.017 0z"/>
    </svg>
  );
}

function ViberIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="m20.19 2.337c-.595-.545-3.005-2.297-8.372-2.32 0 0-6.333-.379-9.418 2.452-1.716 1.716-2.317 4.229-2.386 7.346s-.146 8.959 5.485 10.547h.005l-.005 2.419s-.037.98.607 1.177c.778.244 1.238-.502 1.983-1.304.408-.441.97-1.087 1.397-1.58.6.059 1.296.092 2.001.092 1.827 0 3.602-.225 5.298-.649l-.15.032c.778-.253 5.18-.816 5.892-6.657.744-6.03-.354-9.834-2.337-11.555zm.652 11.115c-.607 4.875-4.173 5.185-4.829 5.395-1.432.364-3.076.572-4.769.572-.486 0-.968-.017-1.445-.051l.064.004s-2.438 2.939-3.197 3.703c-.248.248-.521.228-.516-.267 0-.323.019-4.018.019-4.018-4.767-1.322-4.491-6.298-4.435-8.897s.544-4.735 1.997-6.169c2.612-2.367 7.989-2.016 7.989-2.016 4.543.019 6.718 1.388 7.224 1.847 1.674 1.435 2.527 4.867 1.898 9.896zm-6.511-3.788v.014c0 .168-.136.304-.304.304-.163 0-.296-.128-.303-.289v-.001c.004-.042.007-.092.007-.141 0-.801-.649-1.45-1.45-1.45-.03 0-.06.001-.089.003h.004c-.161-.009-.288-.141-.288-.303 0-.168.136-.304.304-.304h.017-.001c.02-.001.045-.001.069-.001 1.126 0 2.038.912 2.038 2.038 0 .046-.002.092-.005.137v-.006zm.951.531c.047-1.988-1.195-3.544-3.553-3.718-.159-.011-.283-.143-.283-.303 0-.168.136-.304.304-.304.007 0 .015 0 .022.001h-.001.017c2.267 0 4.106 1.838 4.106 4.106 0 .081-.002.162-.007.242l.001-.011c-.004.165-.138.296-.303.296-.168 0-.304-.136-.304-.304 0-.003 0-.005 0-.008zm2.2.629v.002c0 .168-.136.304-.304.304s-.302-.135-.303-.301c-.024-3.822-2.573-5.903-5.662-5.925-.168 0-.303-.136-.303-.303s.136-.303.303-.303c3.459.024 6.239 2.411 6.267 6.525zm-.525 4.598v.009c-.506.891-1.453 1.875-2.428 1.561l-.009-.014c-1.832-.684-3.416-1.578-4.831-2.679l.041.03c-.743-.592-1.396-1.245-1.969-1.963l-.019-.025c-.509-.638-.986-1.352-1.402-2.106l-.04-.079c-.457-.746-.87-1.608-1.193-2.513l-.03-.098c-.314-.975.665-1.922 1.561-2.428h.009c.13-.083.288-.133.458-.133.267 0 .505.123.662.314l.001.002s.581.693.83 1.036c.234.319.549.83.712 1.115.094.147.149.327.149.52 0 .288-.124.547-.322.726l-.001.001-.562.45c-.155.15-.251.36-.251.592 0 .023.001.045.003.067v-.003c.579 1.903 2.048 3.372 3.91 3.941l.042.011c.019.002.042.003.064.003.232 0 .442-.096.592-.25l.45-.562c.18-.199.439-.323.727-.323.193 0 .372.056.524.152l-.004-.002c.813.463 1.516.972 2.157 1.549l-.011-.01c.192.154.313.389.313.652 0 .169-.05.326-.137.458l.002-.003z"/>
    </svg>
  );
}

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.94 4.4c.26-1.09-.39-1.53-1.1-1.28L2.42 10.24c-1.06.42-1.05.99-.18 1.26l4.53 1.41 10.5-6.6c.5-.32.95-.14.58.18l-8.5 7.68h-.01l.01.01-.32 4.65c.47 0 .68-.21.94-.47l2.26-2.2 4.69 3.46c.86.48 1.48.23 1.7-.8l3.32-15.6-.01-.01z"/>
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
              <a href="https://www.pinterest.com/volodymyrpivenart/" aria-label="Pinterest" className="p-2.5 rounded-sm bg-white/5 hover:bg-crimson transition-colors duration-200">
                <PinterestIcon size={18} />
              </a>
              <a href="https://t.me/volodymyr_piven" aria-label="Telegram" className="p-2.5 rounded-sm bg-white/5 hover:bg-crimson transition-colors duration-200">
                <TelegramIcon size={18} />
              </a>
              <a href="viber://chat?number=%2B380677217798" aria-label="Viber" className="p-2.5 rounded-sm bg-white/5 hover:bg-crimson transition-colors duration-200">
                <ViberIcon size={18} />
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
