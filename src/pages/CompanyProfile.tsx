import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ChevronLeft, ChevronRight, Download, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_PAGES = 80;
const PROFILE_PDF = "/profile/company-profile.pdf";

const getPageUrl = (page: number) =>
  `/profile/pages/page-${String(page).padStart(2, "0")}.jpg`;

const CompanyProfile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((p: number) => {
    setCurrentPage(Math.max(1, Math.min(p, TOTAL_PAGES)));
    setShowGrid(false);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(currentPage + 1);
      if (e.key === "ArrowRight") goTo(currentPage - 1);
    },
    [currentPage, goTo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col" dir="rtl">
      <Navbar />

      {/* Top Bar */}
      <div className="pt-20 pb-2 px-4">
        <div className="container">
          <div className="flex items-center justify-between bg-[#16213e] rounded-xl px-4 py-3 border border-white/10">
            {/* Page Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-white/80 text-sm font-medium min-w-[80px] text-center">
                {currentPage} / {TOTAL_PAGES}
              </span>
              <button
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage >= TOTAL_PAGES}
                className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  showGrid ? "bg-accent text-white" : "hover:bg-white/10 text-white/70 hover:text-white"
                )}
                title="عرض الصفحات"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <a
                href={PROFILE_PDF}
                download="OSAEC-Company-Profile.pdf"
                className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">تحميل البروفايل</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-8" ref={containerRef}>
        {showGrid ? (
          /* Grid View */
          <div className="container grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 py-4">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={cn(
                  "relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                  p === currentPage ? "border-accent shadow-lg shadow-accent/30" : "border-white/10 hover:border-white/30"
                )}
              >
                <img
                  src={getPageUrl(p)}
                  alt={`صفحة ${p}`}
                  loading="lazy"
                  className="w-full h-auto"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs py-1 text-center">
                  {p}
                </span>
              </button>
            ))}
          </div>
        ) : (
          /* Single Page View */
          <div className="container flex items-start justify-center py-4">
            <div
              className="relative max-w-4xl w-full group"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                (e.currentTarget as any)._swipeX = touch.clientX;
              }}
              onTouchEnd={(e) => {
                const startX = (e.currentTarget as any)._swipeX;
                if (startX == null) return;
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 50) {
                  // RTL: swipe left = next, swipe right = prev
                  if (diff > 0) goTo(currentPage + 1);
                  else goTo(currentPage - 1);
                }
                (e.currentTarget as any)._swipeX = null;
              }}
            >
              {/* Navigation Arrows */}
              <button
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage >= TOTAL_PAGES}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 disabled:hidden max-md:hidden"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage <= 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 disabled:hidden max-md:hidden"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Page Image */}
              <img
                src={getPageUrl(currentPage)}
                alt={`صفحة ${currentPage}`}
                className="w-full h-auto rounded-xl shadow-2xl select-none"
                draggable={false}
              />

              {/* Mobile swipe hint */}
              <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
                <button
                  onClick={() => goTo(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-6 py-2 rounded-full bg-white/10 text-white disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-white/60 text-sm">{currentPage} / {TOTAL_PAGES}</span>
                <button
                  onClick={() => goTo(currentPage + 1)}
                  disabled={currentPage >= TOTAL_PAGES}
                  className="px-6 py-2 rounded-full bg-white/10 text-white disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CompanyProfile;
