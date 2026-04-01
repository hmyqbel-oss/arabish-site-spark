import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt="خلفية"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container text-center text-primary-foreground px-4 pt-20">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in-up">
          شركة أسس السلامة والعمارة
        </h1>
        <p className="text-lg md:text-2xl font-light text-primary-foreground/80 mb-3 animate-fade-in-up animation-delay-200">
          بيئـة هندسية متكاملة مـن التصميم حتى التسلـيم
        </p>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-primary-foreground/70 leading-relaxed mb-8 animate-fade-in-up animation-delay-400">
          شركة سعودية رائدة بخبرة تتجاوز 15 عاماً في مجال الاستشارات الهندسية والسلامة والعمارة.
          معاً نبني مستقبل أفضل نحو رؤية 2030.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <a
            href="#contact"
            className="bg-accent text-accent-foreground px-8 py-3.5 rounded-md font-semibold hover:bg-accent/90 transition-colors text-base"
          >
            لطلب خدمة
          </a>
          <a
            href="#services"
            className="border-2 border-primary-foreground/40 text-primary-foreground px-8 py-3.5 rounded-md font-semibold hover:bg-primary-foreground/10 transition-colors text-base"
          >
            خدماتنا
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
