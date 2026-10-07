import { FileText, Phone, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceRequestForm from "@/components/ServiceRequestForm";

const quickLinks = [
  { label: "الرئيسية", to: "/#hero" },
  { label: "خدماتنا", to: "/#services" },
  { label: "مشاريعنا", to: "/#projects" },
  { label: "من نحن", to: "/#about" },
  { label: "معرض الأعمال", to: "/gallery" },
];

const services = [
  { label: "التصاميم والمخططات الهندسية", to: "/services/design" },
  { label: "الإشراف وإدارة المشاريع", to: "/services/supervision" },
  { label: "السلامة الهندسية", to: "/services/safety" },
  { label: "الدعم الفني والخدمات الاستشارية", to: "/services/technical" },
  { label: "الدراسات المرورية", to: "/services/traffic" },
];

const ServiceRequest = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-brand-light">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-8 text-sm font-medium">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-accent" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">طلب خدمة</h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                املأ النموذج ببياناتك وسيصل طلبك مباشرة إلى فريقنا، وسنعاود التواصل معك في أقرب وقت.
              </p>
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">اتصل بنا</h3>
                    <p className="text-muted-foreground text-sm" dir="ltr">+966 500003063</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground text-sm" dir="ltr">info@osaec.com.sa</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-6">بيانات الطلب</h2>
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">تعرّف على خدماتنا</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {services.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group flex items-center justify-between bg-card p-5 rounded-xl border border-border hover:border-accent/40 transition-colors"
              >
                <span className="font-medium text-foreground text-sm">{s.label}</span>
                <ArrowLeft className="w-4 h-4 text-accent transition-transform group-hover:-translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceRequest;
