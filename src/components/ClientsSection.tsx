const clients = [
  "الهيئة العامة للعقار",
  "السعودية",
  "حرقلى",
  "ساسكو SASCO",
  "الفنار alfanar",
  "أزاد العقارية",
  "ضمان للممتلكات",
  "عبداللطيف جميل",
  "صلة sela",
  "موانئ دبي العالمية DP World",
  "AHC أول القابضة",
  "شادن SHADEN RESORT",
  "رافال RAFAL",
  "السدحان",
  "النهدي nahdi",
  "NAFFCO",
  "وزارة الصحة",
  "مجموعة الباتعي GROUP",
  "ابيات",
  "مستشفيات دله",
];

const ClientsSection = () => {
  const firstRow = clients.slice(0, 10);
  const secondRow = clients.slice(10, 20);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mb-12">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            <span className="text-accent">عملاؤنا</span>
          </h2>
        </div>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          نفتخر بثقة عملائنا الكرام
        </p>
      </div>

      {/* Marquee Row 1 - Right to Left */}
      <div className="relative mb-6">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="flex animate-marquee-rtl gap-6 w-max">
          {[...firstRow, ...firstRow, ...firstRow].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-accent/30 hover:border-accent bg-card flex items-center justify-center p-3 transition-all duration-500 hover:shadow-[0_0_20px_-4px_hsl(var(--accent)/0.4)] hover:scale-105 cursor-default"
            >
              <span className="text-[10px] md:text-xs text-foreground font-bold text-center leading-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Left to Right */}
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="flex animate-marquee-ltr gap-6 w-max">
          {[...secondRow, ...secondRow, ...secondRow].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-accent/30 hover:border-accent bg-card flex items-center justify-center p-3 transition-all duration-500 hover:shadow-[0_0_20px_-4px_hsl(var(--accent)/0.4)] hover:scale-105 cursor-default"
            >
              <span className="text-[10px] md:text-xs text-foreground font-bold text-center leading-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
