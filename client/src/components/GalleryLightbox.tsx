/*
 * Design: Chromatic Bloom — Abstract Expressionist Web Design
 * Immersive full-screen lightbox for viewing artwork details
 */
import { X, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { toast } from "sonner";
import type { Artwork } from "@/data/artworks";

interface GalleryLightboxProps {
  artwork: Artwork;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({ artwork, onClose, onPrev, onNext }: GalleryLightboxProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const shareUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Couldn't copy the link. Please copy it manually from the address bar.");
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Navigation buttons — desktop/tablet: floating at screen edges */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="hidden min-[1410px]:block absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          aria-label="Previous artwork"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="hidden min-[1410px]:block absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          aria-label="Next artwork"
        >
          <ChevronRight size={28} />
        </button>

        {/* Navigation buttons — mobile: pinned to the very bottom of the screen */}
        <div className="flex min-[1410px]:hidden fixed bottom-6 left-1/2 -translate-x-1/2 items-center gap-6 z-50">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Previous artwork"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Next artwork"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-7xl w-full mx-4 min-[1410px]:mx-7 max-h-[90vh] [@media(max-height:850px)]:max-h-[95dvh] overflow-y-auto flex flex-col min-[1410px]:flex-row gap-8 [@media(max-height:850px)]:gap-4 items-center py-6 pb-24 min-[1410px]:pb-6 min-[1410px]:py-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="flex-1 flex items-center justify-center w-full">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="max-h-[38vh] sm:max-h-[50vh] md:max-h-[65vh] min-[1410px]:max-h-[88vh] [@media(max-height:850px)]:max-h-[40dvh] max-w-full object-contain rounded-sm shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="w-full min-[1410px]:w-80 text-white flex-shrink-0">
            <h2 className="text-3xl font-bold mt-2 mb-1">{artwork.title}</h2>
            <p className="text-white/60 text-sm font-label">
              {artwork.medium} · {artwork.year}
              {artwork.size && <> · {artwork.size}</>}
            </p>
            <div className="w-12 h-0.5 bg-crimson mt-4 mb-4" />
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/contact#form"
                onClick={(e) => e.stopPropagation()}
                className="font-label text-sm font-medium bg-crimson text-white px-5 py-2.5 rounded-sm hover:bg-crimson/90 transition-all duration-200 active:scale-[0.97]"
              >
                Inquire About This Piece
              </Link>
              <button onClick={handleShare} className="flex items-center gap-2 text-white/60 hover:text-golden transition-colors duration-200 font-label text-sm">
                <Share2 size={16} />
                Share this artwork
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}