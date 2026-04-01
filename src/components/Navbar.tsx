import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const serviceLinks = [
  { label: "التصاميم والمخططات الهندسية", href: "#services" },
  { label: "الإشراف وإدارة المشاريع", href: "#services" },
  { label: "السلامة الهندسية", href: "#services" },
  { label: "الدعم الفني والخدمات الاستشارية", href: "#services" },
  { label: "الدراسات المرورية", href: "#services" },
];

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "مشاريعنا", href: "#projects" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img src={logo} alt="OSAEC" className="h-12 md:h-14 w-auto brightness-0 invert" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            className="text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium"
          >
            الرئيسية
          </a>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a
              href="#services"
              className="flex items-center gap-1 text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium"
            >
              خدماتنا
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </a>

            {/* Dropdown with orange top border like reference */}
            <div
              className={`absolute top-full right-0 mt-0 pt-2 transition-all duration-200 ${
                servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div className="bg-white rounded-md shadow-xl min-w-[250px] border-t-[3px] border-accent overflow-hidden">
                {serviceLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="block px-6 py-3 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors border-b border-border/30 last:border-b-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            استشارة مجانية
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary-foreground p-2"
          aria-label="القائمة"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <div className="container py-4 flex flex-col gap-1">
            <a href="#hero" onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-accent transition-colors py-2 text-sm">
              الرئيسية
            </a>

            {/* Mobile Services Accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between text-primary-foreground/80 hover:text-accent transition-colors py-2 text-sm w-full"
            >
              خدماتنا
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pr-4 flex flex-col gap-1 border-r-2 border-accent mr-2">
                {serviceLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground/60 hover:text-accent transition-colors py-1.5 text-xs"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-accent transition-colors py-2 text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center mt-2"
            >
              استشارة مجانية
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
