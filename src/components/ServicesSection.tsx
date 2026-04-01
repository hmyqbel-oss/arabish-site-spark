import { Ruler, HardHat, ShieldCheck, Wrench, TrafficCone, MapPin } from "lucide-react";

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

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-brand-light">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">خدماتنا</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            نقدم في أسس السلامة والعمارة خدمات هندسية متكاملة من التصميم حتى التسليم
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card rounded-lg p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow group border border-border"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
