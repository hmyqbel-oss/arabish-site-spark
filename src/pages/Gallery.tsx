import { useState } from "react";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const images = Array.from({ length: 21 }, (_, i) => `/gallery/project-${i + 1}.jpg`);

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goPrev = () =>
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  const goNext = () =>
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24 section-dark">
        <div className="container">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">معرض أعمالنا</h1>
              <p className="text-primary-foreground/60 text-sm md:text-base">
                نماذج من مشاريعنا المنفذة في مختلف القطاعات
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للرئيسية
            </Link>
          </div>

          {/* Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="break-inside-avoid group relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={src}
                  alt={`مشروع ${i + 1}`}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium bg-accent px-3 py-1.5 rounded-md">
                    عرض
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 left-4 text-white/80 hover:text-white z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={images[selectedIndex]}
            alt={`مشروع ${selectedIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 text-white/60 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
