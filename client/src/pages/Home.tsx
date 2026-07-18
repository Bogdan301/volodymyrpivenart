/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * Home page: Asymmetric hero, editorial gallery, color architecture
 * Key changes: offset grid, colored section bands, painterly card frames
 */


import { useState, useEffect, startTransition } from "react";
import { useRoute, useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Pagination, scrollToSection } from "@/components/Pagination";
import { categories, artworks, blogPosts } from "@/data/artworks";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";

const accentColors = ["bg-crimson", "bg-blue-electric", "bg-golden"];
const accentBorders = ["border-crimson", "border-blue-electric", "border-golden"];
const accentTexts = ["text-crimson", "text-blue-electric", "text-golden"];

const ARTWORKS_PER_PAGE = 16;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [, params] = useRoute<{ id: string }>("/gallery/:id");
  const [, setLocation] = useLocation();

  const filteredArtworks = activeCategory === "All"
    ? artworks
    : artworks.filter((a) => a.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filteredArtworks.length / ARTWORKS_PER_PAGE));

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedArtworks = filteredArtworks.slice(
    (currentPage - 1) * ARTWORKS_PER_PAGE,
    currentPage * ARTWORKS_PER_PAGE
  );

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    startTransition(() => {
      setCurrentPage(clamped);
    });
    scrollToSection("gallery");
  };

  useEffect(() => {
    if (params?.id) {
      const index = filteredArtworks.findIndex((a) => a.id === params.id);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    } else {
      setLightboxIndex(null);
    }
  }, [params?.id, filteredArtworks]);

  useEffect(() => {
    if (lightboxIndex !== null && filteredArtworks[lightboxIndex]) {
      document.title = `${filteredArtworks[lightboxIndex].title} — Volodymyr Piven`;
    } else {
      document.title = "Volodymyr Piven — Original Paintings";
    }
  }, [lightboxIndex, filteredArtworks]);

  const openLightbox = (index: number) => {
    const artwork = filteredArtworks[index];
    if (artwork) setLocation(`/gallery/${artwork.id}`);
  };

  const closeLightbox = () => {
    setLocation("/");
  };

  const navigateLightbox = (direction: number) => {
    if (lightboxIndex === null) return;
    const newIndex = (lightboxIndex + direction + filteredArtworks.length) % filteredArtworks.length;
    const artwork = filteredArtworks[newIndex];
    if (artwork) setLocation(`/gallery/${artwork.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO: Full-bleed immersive with asymmetric text ===== */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/my-background.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="font-label text-sm font-medium text-golden uppercase tracking-[0.2em] mb-4 block">
              Original Paintings
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
              Volodymyr Piven<br />
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Each painting is a conversation between color and emotion.
              Explore works that dance between bold and beautiful.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#gallery">
                <button className="font-label text-base font-medium bg-crimson text-white px-8 py-3.5 rounded-sm hover:bg-crimson/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-crimson/25">
                  Explore the Gallery
                </button>
              </a>
              <a href="/about">
                <button className="font-label text-base font-medium border border-white/30 text-white px-8 py-3.5 rounded-sm hover:bg-white/10 transition-all duration-200">
                  Learn More
                </button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 flex items-center gap-2 text-white/50"
          >
            <ArrowDown size={18} className="animate-bounce" />
            <span className="font-label text-xs uppercase tracking-wider">Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* ===== ASYMMETRIC FEATURED SECTION ===== */}
      <section className="relative bg-charcoal overflow-hidden">
        {/* Color band accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-crimson via-golden to-blue-electric" />

        <div className="container max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text block — offset left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5"
            >
              <span className="font-label text-sm font-medium text-golden uppercase tracking-[0.2em] mb-3 block">
                Featured Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                Paintings That{" "}
                <span className="text-crimson">Speak</span>
                <br />Before You Hear Them
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                A curated selection of works exploring the full spectrum of color
                and form. From calming still life to dynamic urban scenes,
                each piece captures a fleeting moment of pure emotion.
              </p>
              <a href="#gallery">
                <button className="font-label text-sm font-medium text-white flex items-center gap-2 hover:gap-3 transition-all duration-200 group">
                  View All Works
                  <ChevronRight size={16} className="text-crimson group-hover:text-golden transition-colors" />
                </button>
              </a>
            </motion.div>

            {/* Image block — offset right, overlapping */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-7 relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <img
                    src="/images/Vova+Piven_108209+Quiet+Evening+14x17.webp"
                    alt="Freedom"
                    className="w-full aspect-[3/4] object-cover rounded-sm shadow-2xl border-2 border-pink-400"
                  />
                  <div />
                </div>
                <div className="relative mt-12">
                  <img
                    src="/images/after-the-rain-scaled.jpg"
                    alt="After The Rain"
                    className="w-full aspect-[3/4] object-cover rounded-sm shadow-2xl border-2 border-crimson"
                  />
                  <div  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION — Asymmetric masonry-style ===== */}
      <section id="gallery" className="py-24 bg-cream relative">
        {/* Blue accent band */}
        <div className="absolute left-0 top-0 w-2 h-full bg-blue-electric/20" />

        <div className="w-full px-6 scroll-mt-24">
          {/* Section header — offset */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16"
          >
            <span className="font-label text-sm font-medium text-crimson uppercase tracking-[0.2em] mb-3 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Browse the Gallery
            </h2>
            <p className="text-charcoal/60 text-lg max-w-2xl">
              A collection of moments painted in color.
            </p>
          </motion.div>

          {/* Category Filters — left-aligned */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-label text-sm font-medium px-5 py-2.5 rounded-sm transition-all duration-200 active:scale-[0.97] border ${
                  activeCategory === cat
                    ? "bg-crimson text-white shadow-md shadow-crimson/20 border-transparent"
                    : "bg-white text-charcoal/70 hover:text-charcoal hover:bg-white/80 border-charcoal/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Asymmetric artwork grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {paginatedArtworks.map((artwork, index) => (
              <div
                key={artwork.id}
                onClick={() => openLightbox((currentPage - 1) * ARTWORKS_PER_PAGE + index)}
                className="group cursor-pointer"
              >
                {/* Painterly card with colored frame */}
                <div className={`relative bg-white rounded-sm shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border-t-4 ${artwork.borderColor}`}>
                  <div className={`aspect-[5/4] overflow-hidden bg-charcoal/5`}>
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={{ objectPosition: artwork.objectPosition || "center" }}
                    />
                  </div>
                  {/* Gallery label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-transparent p-5 pt-16 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <span className={`font-label text-xs font-medium uppercase tracking-wider mb-1 block ${artwork.categoryColor}`}>
                      {artwork.category}
                    </span>
                    <h3 className="text-white text-lg font-bold">{artwork.title}</h3>
                    <p className="text-white/60 text-sm mt-1">
                      {artwork.medium} · {artwork.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            className="mt-14"
          />
        </div>
      </section>

      {/* ===== COLOR BAND DIVIDER ===== */}
      <div className="h-3 bg-gradient-to-r from-crimson via-golden to-blue-electric" />

      {/* ===== ABOUT TEASER ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Large artwork image — offset */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-7 relative"
            >
              <div className="relative">
                <img
                  src="/images/photo_2026-07-07_18-48-58.jpg"
                  alt="Featured painting"
                  className="w-full rounded-sm shadow-2xl aspect-[9/8]"
                />
              </div>
            </motion.div>

            {/* Text — offset right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5"
            >
              <span className="font-label text-sm font-medium text-crimson uppercase tracking-[0.2em] mb-3 block">
                The Artist
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
                Painting Is a Way{" "}
                <span className="text-blue-electric">of Seeing</span>
              </h2>
              <p className="text-charcoal/60 text-base leading-relaxed mb-6">
                I work with oil on canvas, exploring the paths of expression through the language of color.
                Bold strokes, thick textures, and saturated palettes define every piece.
              </p>
              <p className="text-charcoal/60 text-base leading-relaxed mb-8">
                From sweeping landscapes to electric city nights, my paintings
                capture fleeting moments of pure visual emotion.
              </p>
              <a href="/about">
                <button className="font-label text-base font-medium bg-charcoal text-white px-8 py-3.5 rounded-sm hover:bg-charcoal/90 transition-all duration-200 active:scale-[0.97] flex items-center gap-2">
                  Read My Story
                  <ChevronRight size={16} className="text-golden" />
                </button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BLOG TEASER ===== */}
      <section className="py-24 bg-cream relative">
        {/* Amber accent band on right */}
        <div className="absolute right-0 top-0 w-2 h-full bg-golden/20" />

        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="font-label text-sm font-medium text-crimson uppercase tracking-[0.2em] mb-3 block">
                From the Studio
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
                Latest from the Blog
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 md:mt-0"
            >
              <a href="/blog" className="font-label text-sm font-medium text-crimson hover:text-charcoal transition-colors duration-200 flex items-center gap-2">
                View all posts <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Blog posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.a
                key={post.id}
                href={`/blog/${post.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="group block bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-t-0 border-crimson/40"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  />
                </div>
                <div className="p-6">
                  <span className="font-label text-xs font-medium text-crimson uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-charcoal mt-2 mb-3 group-hover:text-crimson transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT TEASER — Dark band ===== */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/my-background.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-7"
            >
              <span className="font-label text-sm font-medium text-golden uppercase tracking-[0.2em] mb-3 block">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                Let's <span className="text-crimson">Create</span>{" "}
                Something{" "}
                <span className="text-blue-electric">Beautiful</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-8">
                Whether you're interested in a commission, gallery collaboration,
                or simply want to say hello — I'd love to hear from you.
              </p>
              <a href="/contact">
                <button className="font-label text-base font-medium bg-crimson text-white px-8 py-3.5 rounded-sm hover:bg-crimson/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-crimson/25">
                  Start a Conversation
                </button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative">
                <img
                  src="/images/cowgirl.JPG"
                  alt="The artist's studio"
                  className="h-[280px] sm:h-[350px] lg:h-[450px] w-auto object-contain rounded-sm shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredArtworks[lightboxIndex] && (
        <GalleryLightbox
          artwork={filteredArtworks[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={() => navigateLightbox(-1)}
          onNext={() => navigateLightbox(1)}
        />
      )}

      <Footer />
    </div>
  );
}