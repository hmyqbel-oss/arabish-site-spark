const clients = [
  { name: "الهيئة العامة للعقار", logo: "/clients/client-1.png" },
  { name: "السعودية", logo: "/clients/client-2.png" },
  { name: "ساسكو SASCO", logo: "/clients/client-3.png" },
  { name: "الفنار alfanar", logo: "/clients/client-4.png" },
  { name: "أزاد العقارية", logo: "/clients/client-5.png" },
  { name: "عبداللطيف جميل", logo: "/clients/client-6.png" },
  { name: "صلة sela", logo: "/clients/client-7.png" },
  { name: "موانئ دبي العالمية DP World", logo: "/clients/client-8.png" },
  { name: "شادن SHADEN RESORT", logo: "/clients/client-9.png" },
  { name: "رافال RAFAL", logo: "/clients/client-10.png" },
  { name: "السدحان", logo: "/clients/client-11.png" },
  { name: "النهدي nahdi", logo: "/clients/client-12.png" },
  { name: "NAFFCO", logo: "/clients/client-13.png" },
  { name: "وزارة الصحة", logo: "/clients/client-14.png" },
  { name: "مجموعة الباتعي", logo: "/clients/client-15.png" },
  { name: "ابيات", logo: "/clients/client-16.png" },
  { name: "مستشفيات دله", logo: "/clients/client-17.png" },
  { name: "ضمان للممتلكات", logo: "/clients/client-18.png" },
  { name: "حرقلى", logo: "/clients/client-19.png" },
  { name: "AHC أول القابضة", logo: "/clients/client-20.png" },
];

const ClientLogo = ({ client }: { client: { name: string; logo: string } }) => (
  <div className="flex-shrink-0 group">
    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-accent/20 hover:border-accent bg-card flex items-center justify-center p-4 transition-all duration-500 hover:shadow-[0_0_25px_-4px_hsl(var(--accent)/0.35)] hover:scale-110 cursor-default overflow-hidden">
      <img
        src={client.logo}
        alt={client.name}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        width={128}
        height={128}
      />
    </div>
  </div>
);

const ClientsSection = () => {
  const firstRow = clients.slice(0, 10);
  const secondRow = clients.slice(10, 20);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          <span className="text-accent">عملاؤنا</span>
        </h2>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          نفتخر بثقة عملائنا الكرام
        </p>
      </div>

      {/* Row 1 */}
      <div className="relative mb-8">
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="flex animate-marquee-rtl gap-8 w-max items-center">
          {[...firstRow, ...firstRow, ...firstRow].map((client, i) => (
            <ClientLogo key={i} client={client} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="flex animate-marquee-ltr gap-8 w-max items-center">
          {[...secondRow, ...secondRow, ...secondRow].map((client, i) => (
            <ClientLogo key={i} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
