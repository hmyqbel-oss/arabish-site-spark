import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ChevronLeft, ChevronRight, Download, Grid3X3, Maximize, Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_PAGES = 80;
const PROFILE_PDF = "/profile/company-profile.pdf";

const getPageUrl = (page: number) =>
  `/profile/pages/page-${String(page).padStart(2, "0")}.jpg`;

const CompanyProfile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);

  const goTo = useCallback((p: number, dir?: "left" | "right") => {
    const next = Math.max(1, Math.min(p, TOTAL_PAGES));
    if (next === currentPage) return;
    setSlideDir(dir || (next > currentPage ? "left" : "right"));
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(next);
      setShowGrid(false);
      setTransitioning(false);
      setSlideDir(null);
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  }, [currentPage]);

  const toggleFullscreen = useCallback(async () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      await viewerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(currentPage + 1, "left");
      if (e.key === "ArrowRight") goTo(currentPage - 1, "right");
      if (e.key === "Escape" && isFullscreen) {
        document.exitFullscreen();
      }
    },
    [currentPage, goTo, isFullscreen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleZoom = (delta: number) => {
    setZoom((z) => Math.max(0.5, Math.min(3, z + delta)));
  };

  // Preload adjacent pages
  useEffect(() => {
    const preload = [currentPage - 1, currentPage + 1].filter(
      (p) => p >= 1 && p <= TOTAL_PAGES
    );
    preload.forEach((p) => {
      const img = new Image();
      img.src = getPageUrl(p);
    });
  }, [currentPage]);

  const pageSlider = (
    <input
      type="range"
      min={1}
      max={TOTAL_PAGES}
      value={currentPage}
      onChange={(e) => {
        const val = Number(e.target.value);
        setCurrentPage(val);
        setShowGrid(false);
      }}
      className="w-32 sm:w-48 accent-accent h-1.5 cursor-pointer"
      dir="ltr"
    />
  );

  const toolbar = (
    <div className={cn(
      "flex items-center justify-between px-4 py-2.5 border-b border-white/10",
      isFullscreen ? "bg-[#111827]" : "bg-[#16213e] rounded-xl border border-white/10"
    )}>
      {/* Right: Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goTo(currentPage - 1, "right")}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <span className="text-white/80 text-sm font-medium min-w-[70px] text-center tabular-nums">
          {currentPage} / {TOTAL_PAGES}
        </span>
        <button
          onClick={() => goTo(currentPage + 1, "left")}
          disabled={currentPage >= TOTAL_PAGES}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="hidden sm:block mr-2">{pageSlider}</div>
      </div>

      {/* Left: Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => handleZoom(0.25)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="تكبير"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.25)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="تصغير"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => { setShowGrid(!showGrid); setZoom(1); }}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            showGrid ? "bg-accent text-white" : "hover:bg-white/10 text-white/70 hover:text-white"
          )}
          title="عرض الصفحات"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title={isFullscreen ? "خروج من ملء الشاشة" : "ملء الشاشة"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
        <a
          href={PROFILE_PDF}
          download="OSAEC-Company-Profile.pdf"
          className="flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">تحميل</span>
        </a>
      </div>
    </div>
  );

  const pageViewer = (
    <div
      className={cn(
        "flex-1 flex items-center justify-center relative overflow-auto",
        isFullscreen ? "bg-[#0d1117]" : ""
      )}
      ref={containerRef}
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
          if (diff > 0) goTo(currentPage + 1, "left");
          else goTo(currentPage - 1, "right");
        }
        (e.currentTarget as any)._swipeX = null;
      }}
    >
      {/* Side arrows */}
      <button
        onClick={() => goTo(currentPage + 1, "left")}
        disabled={currentPage >= TOTAL_PAGES}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all disabled:opacity-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => goTo(currentPage - 1, "right")}
        disabled={currentPage <= 1}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all disabled:opacity-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Page image with transition */}
      <div
        className={cn(
          "transition-all duration-250 ease-in-out",
          transitioning && slideDir === "left" && "opacity-0 -translate-x-8",
          transitioning && slideDir === "right" && "opacity-0 translate-x-8",
          !transitioning && "opacity-100 translate-x-0"
        )}
        style={{ transform: `scale(${zoom})`, transformOrigin: "center top" }}
      >
        <img
          src={getPageUrl(currentPage)}
          alt={`صفحة ${currentPage}`}
          className={cn(
            "max-h-[calc(100vh-120px)] w-auto mx-auto select-none shadow-2xl rounded-sm",
            isFullscreen && "max-h-[calc(100vh-60px)]"
          )}
          draggable={false}
        />
      </div>
    </div>
  );

  const gridView = (
    <div className="flex-1 overflow-auto p-4">
      <div className="container grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={cn(
              "relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
              p === currentPage
                ? "border-accent shadow-lg shadow-accent/30"
                : "border-white/10 hover:border-white/30"
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
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col" dir="rtl">
      <Navbar />

      {/* Viewer Container (fullscreen target) */}
      <div
        ref={viewerRef}
        className={cn(
          "flex flex-col",
          isFullscreen ? "fixed inset-0 z-[9999] bg-[#0d1117]" : "flex-1 pt-20"
        )}
      >
        {/* Toolbar */}
        <div className={cn(isFullscreen ? "px-2 pt-2" : "px-4 pb-2")}>
          <div className={isFullscreen ? "" : "container"}>
            {toolbar}
          </div>
        </div>

        {/* Content */}
        {showGrid ? gridView : pageViewer}
      </div>

      {!isFullscreen && (
        <>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
};

export default CompanyProfile;
