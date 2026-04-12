import { Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "contact-form-session";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const initialForm: FormData = { name: "", phone: "", email: "", message: "" };

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidSaudiPhone = (phone: string) =>
  /^05\d{8}$/.test(phone);

const CTASection = () => {
  const [form, setForm] = useState<FormData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialForm;
    } catch {
      return initialForm;
    }
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    if (field === "phone") {
      value = value.replace(/[^\d]/g, "").slice(0, 10);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const phoneError =
    touched.phone && form.phone.length > 0 && !isValidSaudiPhone(form.phone)
      ? "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"
      : "";

  const emailError =
    touched.email && form.email.length > 0 && !isValidEmail(form.email)
      ? "يرجى إدخال بريد إلكتروني صحيح"
      : "";

  return (
    <section id="contact" className="py-16 md:py-24 bg-brand-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">لا تتردد في التواصل معنا</h2>
          <p className="text-muted-foreground text-sm md:text-base">متواجدون على مدار الساعة ونقدم استشارات مجانية</p>
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
                <p className="text-muted-foreground text-sm" dir="ltr">+966 500003063</p>
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
                <p className="text-muted-foreground text-sm">المملكة العربية السعودية - الرياض - المهدية - حي الدهناء</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />

            <div>
              <input
                type="tel"
                placeholder="رقم الجوال (05xxxxxxxx)"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                dir="ltr"
                className={`w-full bg-background border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 ${phoneError ? "border-destructive" : "border-border"}`}
              />
              {phoneError && <p className="text-destructive text-xs mt-1">{phoneError}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                dir="ltr"
                className={`w-full bg-background border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 ${emailError ? "border-destructive" : "border-border"}`}
              />
              {emailError && <p className="text-destructive text-xs mt-1">{emailError}</p>}
            </div>

            <textarea
              placeholder="رسالتك"
              rows={4}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
            <button
              type="submit"
              disabled={!!(phoneError || emailError || !form.name || !form.phone || !form.email || !form.message)}
              className="w-full bg-accent text-accent-foreground py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
