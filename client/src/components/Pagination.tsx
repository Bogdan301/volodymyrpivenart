import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    // Blur immediately so the browser doesn't try to keep this button in view
    // (which otherwise fights our "scroll to top of section" call below —
    // this is what caused the forward/back arrows to scroll to the wrong spot).
    e.currentTarget.blur();
    onPageChange(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <button
        onClick={(e) => handleClick(e, currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-2.5 rounded-sm border border-charcoal/10 bg-white text-charcoal/70 hover:text-charcoal hover:bg-white/80 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={(e) => handleClick(e, page)}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
          className={`font-label text-sm font-medium w-10 h-10 rounded-sm transition-all duration-200 active:scale-[0.97] ${
            currentPage === page
              ? "bg-crimson text-white shadow-md shadow-crimson/20"
              : "bg-white text-charcoal/70 hover:text-charcoal hover:bg-white/80 border border-charcoal/10"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={(e) => handleClick(e, currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-2.5 rounded-sm border border-charcoal/10 bg-white text-charcoal/70 hover:text-charcoal hover:bg-white/80 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
      >
        <ChevronRight size={18} />
      </button>
    </motion.div>
  );
}

/** Scrolls smoothly to the top of a section by id, used after a page change.
 *  Deferred one frame so it runs after the click's own focus/scroll settles,
 *  instead of racing with the browser's "keep the clicked button in view" behavior. */
export function scrollToSection(id: string) {
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}