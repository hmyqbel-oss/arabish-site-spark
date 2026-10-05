import { FileText, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestForm from "@/components/ServiceRequestForm";

const ServiceRequest = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-brand-light">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-accent" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                طلب خدمة
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                املأ النموذج ببياناتك وسيصل طلبك مباشرة إلى فريقنا، وسنعاود التواصل
                معك في أقرب وقت.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">اتصل بنا</h3>
                    <p className="text-muted-foreground text-sm" dir="ltr">
                      +966 500003063
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">
                      البريد الإلكتروني
                    </h3>
                    <p className="text-muted-foreground text-sm" dir="ltr">
                      info@osaec.com.sa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-6">بيانات الطلب</h2>
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServiceRequest;
