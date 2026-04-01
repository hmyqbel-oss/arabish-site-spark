import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "خدماتنا", href: "#services" },
  { label: "مشاريعنا", href: "#projects" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img src={logo} alt="OSAEC" className="h-12 md:h-14 w-auto brightness-0 invert" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
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
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
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
