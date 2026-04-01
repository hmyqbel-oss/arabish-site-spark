import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "عميل سعيد" },
  { value: 350, suffix: "+", label: "مشاريع مكتملة" },
  { value: 25, suffix: "", label: "مشاريع جاري العمل عليها" },
  { value: 15, suffix: "+", label: "سنوات الخبرة" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-accent">
      {count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            سنوات من النجاح والإنجازات
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            خدمات هندسية متكاملة من التصميم حتى التسليم
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm md:text-base font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
