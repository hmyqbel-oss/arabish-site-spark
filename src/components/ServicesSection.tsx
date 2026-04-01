import { Ruler, HardHat, ShieldCheck, Wrench, TrafficCone, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: Ruler,
    title: "التصاميم والمخططات الهندسية",
    description: "يتخصص مهندسونا في تقديم خدمات التصميم بكافة مراحله بدءاً من إعداد التصاميم الأولية وانتهاءً بالمخططات التنفيذية.",
  },
  {
    icon: HardHat,
    title: "الإشراف وإدارة المشاريع",
    description: "نضم في شركتنا العديد من الكوادر الفنية ذات الخبرات العالية في الإشراف على تنفيذ المشاريع الهندسية.",
  },
  {
    icon: ShieldCheck,
    title: "السلامة الهندسية",
    description: "أحد أهم أقسام الشركة والذي يقدم حلول سلامة متكاملة تشمل تقييم المخاطر وخطط الطوارئ والتدريب.",
  },
  {
    icon: Wrench,
    title: "الدعم الفني والخدمات الاستشارية",
    description: "نقدم حلولاً تقنية متخصصة وتوجيهات لضمان تنفيذ المشاريع بكفاءة وفق المعايير الهندسية المطلوبة.",
  },
  {
    icon: TrafficCone,
    title: "السلامة المرورية",
    description: "نضم في شركتنا العديد من الكوادر الفنية ذات الخبرات العالية في دراسات وتحليل السلامة المرورية.",
  },
  {
    icon: MapPin,
    title: "الأعمال المساحية",
    description: "نقدم خدمات مساحية متكاملة تشمل الرفع المساحي والمعماري وتحديث الصكوك ونقل الملكية والتجزئة والفرز.",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`bg-card rounded-lg p-6 md:p-8 border border-border cursor-pointer
        transition-all duration-700 ease-out
        hover:shadow-xl hover:-translate-y-2 hover:border-accent/30
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6
        transition-all duration-300 hover:bg-accent hover:scale-110">
        <service.icon className="w-8 h-8 text-accent transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
      <span className="text-accent text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all duration-300">
        للمزيد من التفاصيل
        <span className="text-lg">←</span>
      </span>
    </div>
  );
};

const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-brand-light">
      <div className="container">
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-3">خدماتنا</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            نقدم في أسس السلامة والعمارة خدمات هندسية متكاملة من التصميم حتى التسليم
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
