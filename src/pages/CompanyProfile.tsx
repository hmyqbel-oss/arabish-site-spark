import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Download } from "lucide-react";

const PROFILE_PDF = "/profile/company-profile.pdf";

const CompanyProfile = () => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const handleFullscreen = () => {
    const iframe = document.getElementById("pdf-viewer") as HTMLIFrameElement;
    if (iframe) iframe.requestFullscreen?.();
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-cairo">
            بروفايل الشركة
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            تعرّف على شركة أسس السلامة والعمارة للاستشارات الهندسية
          </p>
        </div>
      </section>

      {/* PDF Viewer Controls */}
      <div className="container mb-4">
        <div className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3 border border-border/50">
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg hover:bg-accent/10 text-foreground/70 hover:text-accent transition-colors"
              title="تصغير"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-foreground/70 min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg hover:bg-accent/10 text-foreground/70 hover:text-accent transition-colors"
              title="تكبير"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg hover:bg-accent/10 text-foreground/70 hover:text-accent transition-colors"
              title="ملء الشاشة"
            >
              <Maximize className="w-5 h-5" />
            </button>
            <a
              href={PROFILE_PDF}
              download="OSAEC-Company-Profile.pdf"
              className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              تحميل البروفايل
            </a>
          </div>
        </div>
      </div>

      {/* PDF Embed */}
      <div className="container pb-16">
        <div
          className="rounded-xl overflow-hidden border border-border/50 shadow-lg bg-muted/30"
          style={{ height: "80vh" }}
        >
          <iframe
            id="pdf-viewer"
            src={`${PROFILE_PDF}#toolbar=1&navpanes=0&scrollbar=1&zoom=${scale * 100}`}
            className="w-full h-full"
            title="بروفايل شركة أسس السلامة والعمارة"
          />
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CompanyProfile;
