import { Ruler, HardHat, ShieldCheck, Wrench, TrafficCone, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const serviceCategories = [
  {
    id: "all",
    label: "جميع الخدمات",
  },
  {
    id: "engineering",
    label: "الخدمات الهندسية",
  },
  {
    id: "safety",
    label: "خدمات السلامة",
  },
  {
    id: "consulting",
    label: "الاستشارات والدعم",
  },
];

const services = [
  {
    icon: Ruler,
    title: "التصاميم والمخططات الهندسية",
    description: "يتخصص مهندسونا في تقديم خدمات التصميم بكافة مراحله بدءاً من إعداد التصاميم الأولية وانتهاءً بالمخططات التنفيذية.",
    color: "bg-brand-black text-white",
    borderColor: "border-brand-black",
    iconBg: "bg-white text-brand-black",
    category: "engineering",
    align: "right" as const,
  },
  {
    icon: TrafficCone,
    title: "الدراسات المرورية",
    description: "نضم في شركتنا العديد من الكوادر الفنية ذات الخبرات العالية في دراسات وتحليل السلامة المرورية.",
    color: "bg-teal-500 text-white",
    borderColor: "border-teal-500",
    iconBg: "bg-white text-teal-600",
    category: "safety",
    align: "left" as const,
  },
  {
    icon: ShieldCheck,
    title: "السلامة الهندسية",
    description: "أحد أهم أقسام الشركة والذي يقدم حلول سلامة متكاملة تشمل تقييم المخاطر وخطط الطوارئ والتدريب.",
    color: "bg-red-400 text-white",
    borderColor: "border-red-400",
    iconBg: "bg-white text-red-500",
    category: "safety",
    align: "right" as const,
  },
  {
    icon: Wrench,
    title: "الدعم الفني والخدمات الإستشارية",
    description: "نقدم حلولاً تقنية متخصصة وتوجيهات لضمان تنفيذ المشاريع بكفاءة وفق المعايير الهندسية المطلوبة.",
    color: "bg-indigo-400 text-white",
    borderColor: "border-indigo-400",
    iconBg: "bg-white text-indigo-500",
    category: "consulting",
    align: "left" as const,
  },
  {
    icon: HardHat,
    title: "الإشراف وإدارة المشاريع",
    description: "نضم في شركتنا العديد من الكوادر الفنية ذات الخبرات العالية في الإشراف على تنفيذ المشاريع الهندسية.",
    color: "bg-brand-red text-white",
    borderColor: "border-brand-red",
    iconBg: "bg-white text-brand-red",
    category: "engineering",
    align: "right" as const,
  },
  {
    icon: MapPin,
    title: "الأعمال المساحية",
    description: "نقدم خدمات مساحية متكاملة تشمل الرفع المساحي والمعماري وتحديث الصكوك ونقل الملكية والتجزئة والفرز.",
    color: "bg-amber-500 text-white",
    borderColor: "border-amber-500",
    iconBg: "bg-white text-amber-600",
    category: "consulting",
    align: "left" as const,
  },
];

const ServiceBanner = ({ service, index }: { service: typeof services[0]; index: number }) => {
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

  const isRight = service.align === "right";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 180}ms` }}
      className={`flex items-center gap-0 transition-all duration-700 ease-out
        ${isRight ? "justify-end" : "justify-start"}
        ${isVisible
          ? "opacity-100 translate-x-0"
          : isRight ? "opacity-0 translate-x-16" : "opacity-0 -translate-x-16"
        }`}
    >
      {/* Icon - shown before banner on left-aligned */}
      {!isRight && (
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${service.borderColor} ${service.iconBg} flex items-center justify-center z-10 -ml-3 shrink-0 shadow-lg`}>
          <service.icon className="w-7 h-7 md:w-9 md:h-9" />
        </div>
      )}

      {/* Banner */}
      <div
        className={`${service.color} py-4 px-8 md:px-12 md:py-5 cursor-pointer
          transition-all duration-300 hover:scale-105 hover:shadow-xl
          ${isRight ? "rounded-l-full rounded-r-lg pr-6" : "rounded-r-full rounded-l-lg pl-6"}
          min-w-[260px] md:min-w-[340px]`}
      >
        <h3 className="text-base md:text-xl font-bold font-heading tracking-wide">
          {service.title}
        </h3>
      </div>

      {/* Icon - shown after banner on right-aligned */}
      {isRight && (
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${service.borderColor} ${service.iconBg} flex items-center justify-center z-10 -mr-3 shrink-0 shadow-lg`}>
          <service.icon className="w-7 h-7 md:w-9 md:h-9" />
        </div>
      )}
    </div>
  );
};

const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredServices = activeTab === "all"
    ? services
    : services.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="py-16 md:py-24 bg-brand-light">
      <div className="container">
        <div
          ref={headerRef}
          className={`text-center mb-10 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-3 font-heading">خدماتنا</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            نقدم في أسس السلامة والعمارة خدمات هندسية متكاملة من التصميم حتى التسليم
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-12" dir="rtl">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
            {serviceCategories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-border
                  data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:border-accent
                  data-[state=inactive]:bg-white data-[state=inactive]:text-foreground
                  transition-all duration-300 hover:border-accent/50"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Staggered Banners */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto">
          {filteredServices.map((service, index) => (
            <ServiceBanner key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
