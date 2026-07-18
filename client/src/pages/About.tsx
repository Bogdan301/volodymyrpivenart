/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * About page: Asymmetric bio, colored section bands, painterly philosophy cards
 */
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Palette, Brush, Eye, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO: Expressive dark page opener ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95" />
          <div className="absolute top-0 right-0 w-full h-full opacity-15">
            <img
              src="/images/Freedom.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Color band at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-crimson via-golden to-blue-electric" />
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-7"
            >
              <span className="font-label text-sm font-medium text-golden uppercase tracking-[0.2em] mb-4 block">
                About the Artist
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                Where Every Canvas{" "}
                <span className="text-crimson">Tells</span>
                <br />a{" "}
                <span className="text-blue-electric">Story</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
                Painting is more than a practice — it's a way of seeing the world.
                For almost three decades, I have brought creativity to life through experience, precision, and a deep commitment to the craft. Every piece reflects years of artistic growth and mastery.
              </p>
              <div className="flex gap-8">
                <div>
                  <span className="font-label text-3xl font-bold text-crimson">30+</span>
                  <p className="text-white/50 text-sm mt-1">Years of Practice</p>
                </div>
                <div>
                  <span className="font-label text-3xl font-bold text-blue-electric">500+</span>
                  <p className="text-white/50 text-sm mt-1">Artworks Created</p>
                </div>
                <div>
                  <span className="font-label text-3xl font-bold text-golden">50+</span>
                  <p className="text-white/50 text-sm mt-1">Exhibitions</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5 flex items-center justify-end"
            >
              <div className="relative w-full">
                <img
                  src="/images/IMG_4305.JPG"
                  alt="The artist's studio"
                  className="w-full aspect-[8/7] rounded-sm shadow-2xl"
                />
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BIO SECTION — Asymmetric with colored accent ===== */}
      <section className="py-24 bg-cream relative overflow-hidden">
        {/* Amber accent bar */}
        <div className="absolute top-0 right-0 w-1 h-full bg-golden/20" />

        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image — large, overlapping */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-7 relative"
            >
              <div className="relative">
                <img
                  src="/images/vladimir-piven.jpg"
                  alt="The artist's studio"
                  className="w-full object-cover rounded-sm shadow-2xl"
                />
                {/* Overlapping color frames */}

              </div>
            </motion.div>

            {/* Text — offset */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5"
            >
              <span className="font-label text-sm font-medium text-crimson uppercase tracking-[0.2em] mb-3 block">
                My Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                From First Brush<br />to Full Bloom
              </h2>
              <div className="space-y-5 text-charcoal/70 text-base leading-relaxed">
                <p>
                  Art has been part of my life since childhood. I was born in a small town in Poltava region, Ukraine in 1976. I first stepped into a fine arts studio in 1982, where my passion for painting began to take shape.
                  A few years later, I continued my journey through formal art school, dedicating myself to learning the foundations of creative expression.
                </p>
                <p>
                  From 1990 to 1995, I studied Fine Arts at the Kharkiv State Art College, where I refined my technique and developed my artistic voice.
                  Those years shaped my skills as well as the way I see and interpret the world.
                </p>
                <p>
                  Today, I continue to create with the same curiosity and passion that first inspired me.
                  Through every painting, I strive to capture emotion, light, and the stories that connect us.
                  My work has been featured in numerous exhibitions, and I remain motivated to exploring new ideas while staying true to my artistic vision.
                </p>
              </div>
              <Link href="/contact">
                <button className="mt-8 font-label text-sm font-medium text-crimson hover:text-charcoal transition-colors duration-200 flex items-center gap-2">
                  Interested in a commission? <ChevronRight size={14} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY — Colorful cards, not white SaaS cards ===== */}
      <section className="py-24 bg-charcoal relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-electric via-golden to-crimson" />

        <div className="container max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <span className="font-label text-sm font-medium text-golden uppercase tracking-[0.2em] mb-3 block">
              Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              How I Create
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: "Color First",
                description: "I start every painting with a color palette in mind. The emotional tone of the piece is established before a single brush touches canvas.",
                accent: "bg-crimson",
                accentText: "text-crimson",
                accentBg: "bg-crimson/10",
                borderColor: "border-crimson/30",
              },
              {
                icon: Brush,
                title: "Texture & Depth",
                description: "Thick impasto layers create a sculptural surface. I want viewers to feel the physical presence of the paint, not just see it.",
                accent: "bg-blue-electric",
                accentText: "text-blue-electric",
                accentBg: "bg-blue-electric/10",
                borderColor: "border-blue-electric/30",
              },
              {
                icon: Eye,
                title: "Emotional Honesty",
                description: "No painting is finished until it feels true. I work intuitively, letting the canvas guide the final form rather than forcing a predetermined vision.",
                accent: "bg-golden",
                accentText: "text-golden",
                accentBg: "bg-golden/10",
                borderColor: "border-golden/30",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className={`p-8 rounded-sm ${item.accentBg} border-l-4 ${item.borderColor}`}
              >
                <item.icon className={`w-10 h-10 ${item.accentText} mb-5`} strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-base leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXHIBITION HISTORY ===== */}
      <section className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-4"
            >
              <span className="font-label text-sm font-medium text-crimson uppercase tracking-[0.2em] mb-3 block">
                Exhibition History
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Showing the Work
              </h2>
              <p className="text-charcoal/60 text-base leading-relaxed">
                My paintings have been exhibited in galleries and museums
                across the country, from intimate studio shows to large-scale
                contemporary art exhibitions. I participate yearly in the Waterfowl Festival in Easton, MD and I host solo shows at the McBride Gallery!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-8"
            >
              {/* ===== EXHIBITION HISTORY ===== */}
              <div className="space-y-0">
                {[
                  { year: "2025", title: "Waterfowl Festival", venue: "Easton, MD", color: "border-l-crimson" },
                  { year: "2024", title: "Solo Art Show", venue: "McBride Gallery", color: "border-golden" },
                  { year: "2013", title: "Artist in Riverside Art and Glass Gallery", venue: "Wroxham, Norfolk, UK", color: "border-l-blue-electric" },
                  { year: "2011", title: "Dew", venue: "Prague, Czech Republic", color: "border-l-crimson" },
                  { year: "2010", title: "Dew", venue: "Bratislava, Slovakia", color: "border-l-golden" },
                  { year: "2009", title: "Field bouquet", venue: "Budva, Montenegro", color: "border-l-blue-electric" },
                ].map((ex, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-6 py-6 border-b border-charcoal/10 border-l-4 ${ex.color} pl-6`}
                  >
                    <span className="font-label text-sm font-bold text-crimson flex-shrink-0">{ex.year}</span>
                    <div>
                      <h4 className="text-lg font-bold text-charcoal">{ex.title}</h4>
                      <p className="text-charcoal/50 text-sm">{ex.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
