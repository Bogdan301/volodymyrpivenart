/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * Blog page: Expressive page opener, gallery-style blog cards with colored accents
 */
import { useSEO } from "@/hooks/useSEO";
import { useState, startTransition } from "react";
import { useRoute } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Pagination, scrollToSection } from "@/components/Pagination";
import { blogPosts } from "@/data/artworks";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [, params] = useRoute<{ id: string }>("/blog/:id");
  const { id } = params || {};

  if (id) {
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return <NotFound />;
    return <BlogPostDetail post={post} />;
  }

  return <BlogList />;
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-cream">
        <p className="text-charcoal/60 text-lg">Post not found.</p>
      </div>
      <Footer />
    </div>
  );
}

function BlogList() {
  useSEO({
    title: "Blog",
    description: "Stories from the studio — updates on new paintings, exhibitions, and the creative process behind the work of Volodymyr Piven.",
    path: "/blog",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = blogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (page: number) => {
    startTransition(() => {
      setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    });
    scrollToSection("blog-grid");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO: Bold art-directed opener ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95" />
          <div className="absolute bottom-0 right-0 w-full h-full opacity-20">
            <img
              src="/images/flowers.JPG"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-golden via-crimson to-blue-electric" />
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-8"
            >
              <span className="font-label text-sm font-medium text-golden uppercase tracking-[0.2em] mb-4 block">
                Latest Updates
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
                From the{" "}
                <span className="text-crimson">Studio</span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                Stories about the creative process, upcoming exhibitions,
                and moments from behind the canvas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BLOG GRID — Gallery-style cards ===== */}
      <section id="blog-grid" className="py-24 bg-cream scroll-mt-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post, index) => (
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
                className={`group block rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 bg-white border-t-4 ${post.borderColor}`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-charcoal/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  />
                </div>
                <div className="p-6">
                  <span className={`font-label text-xs font-medium uppercase tracking-wider ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-charcoal mt-2 mb-3 group-hover:text-crimson transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-charcoal/40 text-xs font-label">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-crimson text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            className="mt-14"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function BlogPostDetail({ post }: { post: typeof blogPosts[0] }) {
  useSEO({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    path: `/blog/${post.id}`,
  });
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <article className="pt-32 pb-24 bg-cream">
        <div className="container max-w-3xl mx-auto px-6">
          {/* Back link */}
          <a
            href="/blog"
            className="flex items-center gap-2 text-charcoal/50 hover:text-crimson transition-colors duration-200 font-label text-sm mb-10"
          >
            <ArrowRight className="rotate-180" size={16} />
            Back to all posts
          </a>

          {/* Header */}
          <span className="font-label text-sm font-medium text-crimson uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mt-3 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-charcoal/40 text-sm font-label mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              5 min read
            </span>
          </div>

          {/* Featured image */}
          <div className="rounded-sm overflow-hidden mb-10 shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-charcoal/70 text-lg leading-relaxed">
              {post.excerpt}
            </p>
            {post.content?.map((paragraph, index) => (
              <p key={index} className="text-charcoal/70 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
