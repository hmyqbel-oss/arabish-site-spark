import { Ruler, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const features = [
  "التصميم المعماري",
  "التصميم الانشائي",
  "المخططات الكهربائية",
  "التصميم الداخلي",
  "الأعمال المساحية",
  "المخططات الميكانيكية",
];

const DesignService = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-brand-light">
      <div className="container">
        <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-8 text-sm font-medium">
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <Ruler className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
              التصاميم والمخططات الهندسية
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              ﻳﻮﻓــﺮ ﻣﻜﺘﺒﻨــﺎ أﻋﻠــﻰ ﻣﺴــﺘﻮى ﻣــﻦ ﺧﺪﻣﺎت اﻟﺘﺼﻤﻴﻢ اﻟﻤﺘﻜﺎﻣﻞ ﻣﻦ ﺧﻼل ﻓﺮﻳﻖ ﻋﻤﻞ ﻣﺘﺨﺼﺺ ﻣﻦ اﻟﻤﻬﻨﺪﺳــﻴﻦ ذوي
              اﻟﺨﺒﺮات اﻟﻌﺎﻟﻴﺔ ﻓﻲ ﻣﺠﺎﻻت اﻟﺘﺼﻤﻴـــﻢ اﻟﻤﺨﺘـــﻠﻔﺔ ,وذﻟﻚ ﻣﻦ ﺧﻼل اﺳﺘﺨـــﺪام ﺑﺮاﻣﺞ ﺗﺼﻤﻴﻢ وﻣﻨﺎﻫﺞ ﺗﺤﻠﻴﻞ ﻫﻨـــﺪﺳﻲ
              ﺣـﺪﻳﺜـــﺔ ودراﻳـــﺔ ﻛـﺎﻣﻠــــﺔ ﺑﺄﻧﻈﻤـــﺔ اﻟﺒﻨﺎء اﻟﻌﺎﻟﻤﻴـــﺔ واﻟﻤﺤﻠﻴـــﺔ وﺗﻌﺘﻤﺪ ﻋﻤﻠﻴــــﺔ اﻟﺘﺼﻤﻴـــﻢ
              اﻟﻬﻨـﺪﺳﻲ ﻓـﻲ ﻣﻜﺘﺒﻨﺎ ﻋـــﻠﻰ ﺛﻼث اﻋﺘﺒــﺎرات رﺋـﻴﺴﻴـﺔ ﻫــي ﺳﻬـــﻮﻟﺔ اﻹﻧﺸـــﺎء واﻟﺠـــﻮدة ﻣﻘﺎﺑﻞ اﻟﻜﻠﻔـــﺔ
              واﻟﻜﻔـﺎءة اﻟـﻮﻇﻴﻔﻴﺔ ﺣﻴـﺚ ﺗﻘـﻮد ﻫﺬه اﻟﻌﻨﺎﺻـــﺮ اﻟﻔﺮﻳﻖ اﻟﻬﻨﺪﺳﻲ اﻟﻤﺼﻤ ﻢ ﻹﻳﺠــــــــــــﺎد ﺣـــﻠـــــــــﻮل
              اﻟﺘﺼﻤﻴــــــــــــﻢ اﻟﻨﻬــــــــــــــــﺎﺋﻴـــــــــــﺔ اﻟﻤﺜــــــﻠـــﻰ وﻓـــــــــﻖ رؤﻳــــــــــــــﺔ
              واﺣﺘﻴــــــﺎﺟـــــــــــــــــﺎت اﻟﻌﻤــــــــــــﻼ ء.
            </p>
            <a
              href="/#contact"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              اطلب استشارة مجانية
            </a>
          </div>
          <div className="space-y-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border hover:border-accent/20 transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span className="text-foreground text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <CTASection />
    <Footer />
  </div>
);

export default DesignService;
