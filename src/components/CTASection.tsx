import { Phone, Mail, MapPin } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">لا تتردد في التواصل معنا</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            متواجدون على مدار الساعة ونقدم استشارات مجانية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">اتصل بنا</h3>
                <p className="text-muted-foreground text-sm" dir="ltr">+966 50 275 7025</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">البريد الإلكتروني</h3>
                <p className="text-muted-foreground text-sm">info@osaec.com.sa</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">العنوان</h3>
                <p className="text-muted-foreground text-sm">المملكة العربية السعودية</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="الاسم الكامل"
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <input
              type="tel"
              placeholder="رقم الجوال"
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <textarea
              placeholder="رسالتك"
              rows={4}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors"
            >
              إرسال الطلب
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
