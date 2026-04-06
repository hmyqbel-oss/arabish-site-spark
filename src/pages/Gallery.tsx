import { useState, useEffect, useRef } from "react";
import { ArrowRight, X, ChevronLeft, ChevronRight, MapPin, Briefcase, Maximize2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Project {
  image: string;
  title: string;
  category: string;
  scope?: string;
  area?: string;
  location?: string;
}

const projects: Project[] = [
  {
    image: "/gallery/project-villa-modern.jpg",
    title: "تصميم فيلا خاصة بطراز مودرن",
    category: "سكني",
    scope: "تصميم معماري وإنشائي",
    area: "480م²",
    location: "الرياض - المهدية",
  },
  {
    image: "/gallery/project-duplex-villas.jpg",
    title: "تصميم فلل دوبلكس",
    category: "سكني",
    scope: "تصميم معماري وإنشائي",
    area: "810م²",
    location: "الرياض - ديراب",
  },
  {
    image: "/gallery/project-residential-villa.jpg",
    title: "تصميم فيلا سكنية",
    category: "سكني",
    scope: "تصميم معماري وإنشائي",
    area: "288م²",
    location: "الرياض - ديراب",
  },
  {
    image: "/gallery/project-penthouse-villas.jpg",
    title: "تصميم فلل بنت هاوس متلاصقة",
    category: "سكني",
    scope: "تصميم معماري وإنشائي",
    area: "1500م²",
    location: "الرياض - نمار",
  },
];

const ProjectCard = ({ project, index, onImageClick }: { project: Project; index: number; onImageClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/30 transition-all duration-500 shadow-sm hover:shadow-xl group"
    >
      {/* Image */}
      <div className="relative overflow-hidden cursor-pointer" onClick={onImageClick}>
        <div
          className={`absolute inset-0 bg-muted/80 backdrop-blur-xl transition-opacity duration-700 z-[1] ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="w-full h-full animate-pulse bg-gradient-to-br from-muted to-muted-foreground/10" />
        </div>
        <motion.img
          src={project.image}
          alt={project.title}
          className={`w-full h-56 md:h-64 object-cover transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute top-3 right-3 z-[2]">
          <span className="text-xs font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full shadow-md">
            {project.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-[1] flex items-center justify-center">
          <motion.div
            className="bg-accent/90 text-accent-foreground rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <Eye className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-3 text-right">
        <h3 className="text-foreground font-bold text-base md:text-lg">{project.title}</h3>

        <div className="space-y-2">
          {project.scope && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Briefcase className="w-4 h-4 text-accent shrink-0" />
              <span>نطاق العمل: {project.scope}</span>
            </div>
          )}
          {project.area && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Maximize2 className="w-4 h-4 text-accent shrink-0" />
              <span>المساحة: {project.area}</span>
            </div>
          )}
          {project.location && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>موقع المشروع: {project.location}</span>
            </div>
          )}
        </div>

        <button
          onClick={onImageClick}
          className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          تفاصيل المشروع
        </button>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = projects.map((p) => p.image);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goPrev = () =>
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  const goNext = () =>
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goNext();
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24 section-dark">
        <div className="container">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} onImageClick={() => openLightbox(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.button
              onClick={closeLightbox}
              className="absolute top-4 left-4 text-white/80 hover:text-white z-10"
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
              whileHover={{ scale: 1.2, x: 4 }}
            >
              <ChevronRight className="w-10 h-10" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
              whileHover={{ scale: 1.2, x: -4 }}
            >
              <ChevronLeft className="w-10 h-10" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={projects[selectedIndex]?.title}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <motion.div
              className="absolute bottom-4 text-white/60 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {selectedIndex + 1} / {images.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
