import { useEffect, useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "966500003063";
const BRIDGE_URL = "/odoo-bridge.php";
const STORAGE_KEY = "osaec-service-request";

interface FormData {
  name: string;
  mobile: string;
  email: string;
  message: string;
  website: string; // حقل فخ ضد الروبوتات — يجب أن يبقى فارغاً
}

const emptyForm: FormData = { name: "", mobile: "", email: "", message: "", website: "" };

const validateName = (v: string) =>
  v.trim().length === 0
    ? "الاسم مطلوب"
    : v.trim().length < 3
    ? "الاسم قصير جداً"
    : v.trim().length > 100
    ? "الاسم طويل جداً"
    : "";

const validateMobile = (v: string) => {
  const digits = v.replace(/\D/g, "");
  if (digits.length === 0) return "رقم الجوال مطلوب";
  if (!/^05\d{8}$/.test(digits)) return "رقم الجوال يجب أن يكون 10 أرقام ويبدأ بـ 05";
  return "";
};

const validateEmail = (v: string) => {
  const t = v.trim();
  if (t.length === 0) return "البريد الإلكتروني مطلوب";
  if (t.length > 255) return "البريد طويل جداً";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return "صيغة البريد الإلكتروني غير صحيحة";
  return "";
};

const validateMessage = (v: string) =>
  v.trim().length === 0
    ? "الرسالة مطلوبة"
    : v.trim().length > 1000
    ? "الرسالة طويلة جداً (1000 حرف كحد أقصى)"
    : "";

const validators: Record<keyof FormData, (v: string) => string> = {
  name: validateName,
  mobile: validateMobile,
  email: validateEmail,
  message: validateMessage,
  website: () => "",
};

interface ServiceRequestFormProps {
  serviceName?: string;
  className?: string;
}

const ServiceRequestForm = ({ serviceName, className }: ServiceRequestFormProps) => {
  const [form, setForm] = useState<FormData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // نموذج قديم محفوظ قبل إضافة حقل الفخ
        return { ...emptyForm, ...parsed, website: "" };
      }
    } catch {
      // ignore corrupted storage
    }
    return emptyForm;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "whatsapp">("idle");

  // persist to session storage (lightweight data)
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // storage unavailable
    }
  }, [form]);

  const setField = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validators[field](value) }));
    }
  };

  const blurField = (field: keyof FormData) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validators[field](form[field]) }));
  };

  const openWhatsApp = (data: FormData) => {
    const lines = [
      "طلب خدمة جديد",
      serviceName ? `الخدمة: ${serviceName}` : null,
      `الاسم: ${data.name.trim()}`,
      `الجوال: ${data.mobile.replace(/\D/g, "")}`,
      `البريد: ${data.email.trim()}`,
      `الرسالة: ${data.message.trim()}`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const resetAfterSend = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setForm(emptyForm);
    setTouched({});
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const newErrors = {
      name: validateName(form.name),
      mobile: validateMobile(form.mobile),
      email: validateEmail(form.email),
      message: validateMessage(form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, mobile: true, email: true, message: true });
    if (Object.values(newErrors).some(Boolean)) return;

    setStatus("sending");
    let delivered = false;
    try {
      const res = await fetch(BRIDGE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          mobile: form.mobile.replace(/\D/g, ""),
          email: form.email.trim(),
          message: form.message.trim(),
          service_name: serviceName ?? "",
          page: window.location.pathname,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        delivered = true;
        setStatus("sent");
      } else if (res.ok && data && !data.ok && data.errors) {
        // أخطاء تحقق من جهة الخادم
        setErrors((e) => ({ ...e, ...(data.errors as Record<string, string>) }));
        setStatus("idle");
        return;
      }
    } catch {
      // الشبكة أو الوسيط غير متوفر — الخطوة الاحتياطية أدناه
    }

    if (!delivered) {
      // الوسيط غير جاهز أو تعذر الوصول لأودو → واتساب تلقائياً حتى لا يضيع الطلب
      openWhatsApp(form);
      setStatus("whatsapp");
    }
    resetAfterSend();
  };

  const inputClass = (field: keyof FormData) =>
    cn(
      "w-full bg-background border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors",
      touched[field] && errors[field]
        ? "border-destructive focus:ring-destructive/40"
        : "border-border focus:ring-accent/50"
    );

  const fields: { key: keyof FormData; type: string; placeholder: string; dir?: string }[] = [
    { key: "name", type: "text", placeholder: "الاسم الكامل" },
    { key: "mobile", type: "tel", placeholder: "رقم الجوال (05xxxxxxxx)", dir: "ltr" },
    { key: "email", type: "email", placeholder: "البريد الإلكتروني", dir: "ltr" },
  ];

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit} noValidate>
      {fields.map(({ key, type, placeholder, dir }) => (
        <div key={key}>
          <input
            type={type}
            dir={dir}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setField(key, e.target.value)}
            onBlur={() => blurField(key)}
            maxLength={key === "mobile" ? 13 : 255}
            className={inputClass(key)}
            aria-invalid={Boolean(touched[key] && errors[key])}
          />
          {touched[key] && errors[key] && (
            <p className="text-destructive text-xs mt-1">{errors[key]}</p>
          )}
        </div>
      ))}
      <div>
        <textarea
          placeholder="رسالتك"
          rows={4}
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          onBlur={() => blurField("message")}
          maxLength={1000}
          className={cn(inputClass("message"), "resize-none")}
          aria-invalid={Boolean(touched.message && errors.message)}
        />
        {touched.message && errors.message && (
          <p className="text-destructive text-xs mt-1">{errors.message}</p>
        )}
      </div>
      {/* حقل فخ ضد الروبوتات — مخفي عن الزوار */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(e) => setField("website", e.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-md font-semibold hover:bg-accent/90 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            جارٍ الإرسال...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            إرسال الطلب
          </>
        )}
      </button>
      {status === "sent" && (
        <p className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          تم إرسال طلبك بنجاح — سيتواصل معك فريقنا قريباً
        </p>
      )}
      {status === "whatsapp" && (
        <p className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          تم فتح واتساب — اضغط "إرسال" داخل التطبيق لتوصيل طلبك
        </p>
      )}
      <p className="text-center text-xs text-muted-foreground">
        يصل طلبك مباشرة إلى نظام إدارة العملاء لدينا
      </p>
    </form>
  );
};

export default ServiceRequestForm;
