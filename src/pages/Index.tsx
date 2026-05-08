import { Link } from "react-router-dom";
import {
  Dumbbell,
  Apple,
  Calendar,
  Users,
  TrendingUp,
  MessageSquare,
  Check,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { branding } from "@/lib/branding";

const features = [
  {
    icon: Users,
    title: "إدارة عملاء احترافية",
    desc: "أضف عملاءك، تابع تقدمهم، وخزّن كل بياناتهم في مكان واحد منظم.",
  },
  {
    icon: Apple,
    title: "خطط تغذية مخصصة",
    desc: "صمم خطط وجبات بالماكروز والسعرات لكل عميل بضغطة زرار.",
  },
  {
    icon: Dumbbell,
    title: "جداول تمارين ذكية",
    desc: "مكتبة تمارين شاملة + إنشاء جداول مخصصة لكل عميل حسب هدفه.",
  },
  {
    icon: TrendingUp,
    title: "متابعة التقدم",
    desc: "وزن أسبوعي، صور Before/After، رسوم بيانية تظهر التطور الحقيقي.",
  },
  {
    icon: MessageSquare,
    title: "تواصل مباشر مع العملاء",
    desc: "رسائل، ملاحظات، تذكيرات — كل التواصل من داخل المنصة.",
  },
  {
    icon: Calendar,
    title: "حجوزات ومواعيد",
    desc: "نظام حجز جلسات مدمج مع تقويمك يوفر وقتك ووقت عملائك.",
  },
];

const stats = [
  { value: "+500", label: "كوتش يستخدم المنصة" },
  { value: "+12K", label: "عميل نشط" },
  { value: "98%", label: "نسبة الرضا" },
  { value: "24/7", label: "دعم فني" },
];

const plans = [
  {
    name: "البداية",
    price: "299",
    period: "/ شهرياً",
    description: "مثالية للكوتش الفردي",
    features: [
      "حتى 20 عميل",
      "خطط تغذية وتمارين",
      "متابعة التقدم",
      "دعم بالبريد",
    ],
    highlighted: false,
    cta: "ابدأ الآن",
  },
  {
    name: "الاحترافية",
    price: "599",
    period: "/ شهرياً",
    description: "الأكثر طلباً للكوتشز المحترفين",
    features: [
      "حتى 100 عميل",
      "كل مميزات البداية",
      "تخصيص العلامة التجارية (Logo + ألوان)",
      "تصدير PDF للخطط",
      "حجوزات وتقويم",
      "دعم أولوية",
    ],
    highlighted: true,
    cta: "ابدأ تجربة مجانية",
  },
  {
    name: "المراكز",
    price: "1,499",
    period: "/ شهرياً",
    description: "للجيمات ومراكز اللياقة",
    features: [
      "عملاء غير محدودين",
      "فريق متعدد المدربين",
      "كل مميزات الاحترافية",
      "تقارير وإحصائيات متقدمة",
      "دومين مخصص",
      "مدير حساب مخصص",
    ],
    highlighted: false,
    cta: "تواصل مع المبيعات",
  },
];

const faqs = [
  {
    q: "هل أحتاج خبرة تقنية لاستخدام المنصة؟",
    a: "لا أبداً. المنصة مصممة بواجهة بسيطة للغاية تقدر تستخدمها من غير أي خبرة برمجية. خلال أقل من 10 دقائق هتكون جاهز لاستقبال أول عميل.",
  },
  {
    q: "هل يقدر عملائي يدخلوا على حساباتهم؟",
    a: "نعم، كل عميل ليه حساب خاص بيه يقدر يشوف خطته، يسجل وزنه، يرفع صور تقدمه، ويتواصل معاك مباشرة.",
  },
  {
    q: "هل أقدر أستخدم اللوجو والألوان بتاعتي؟",
    a: "في الباقة الاحترافية وما فوقها، تقدر تخصص اللوجو، الألوان، اسم البراند، وحتى ربط دومين خاص بيك.",
  },
  {
    q: "إيه شروط الإلغاء؟",
    a: "تقدر تلغي اشتراكك في أي وقت بدون أي رسوم. هتقدر تستخدم المنصة لحد نهاية الفترة المدفوعة.",
  },
  {
    q: "هل في فترة تجربة مجانية؟",
    a: "أيوة، 14 يوم تجربة مجانية كاملة بدون الحاجة لكارت ائتماني. جرب كل المميزات وقرر بعدها.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 -right-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-10 -left-20 h-96 w-96 rounded-full bg-accent/50 blur-3xl" />
        </div>

        <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="text-center lg:text-right animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>منصة جديدة كلياً للكوتشز العرب</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              نمّي بيزنس الكوتشينج بتاعك
              <br />
              <span className="text-gradient">بأدوات احترافية</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              {branding.name} منصة كاملة لإدارة عملائك، إنشاء خطط التغذية والتمارين،
              ومتابعة تقدمهم — بشكل احترافي يستحق العميل اللي بيدفع.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-accent text-accent-foreground hover:opacity-90 font-bold text-base h-12 px-7 shadow-glow animate-pulse-glow">
                <Link to="/auth?mode=signup">
                  ابدأ تجربة مجانية 14 يوم
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground h-12 px-7">
                <a href="#features">شاهد المميزات</a>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-accent" /> بدون كارت ائتماني
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-accent" /> إلغاء في أي وقت
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-accent opacity-30 blur-3xl rounded-3xl" />
              <Card className="relative bg-card/95 backdrop-blur p-6 shadow-elegant border-0 text-card-foreground">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-full bg-gradient-accent grid place-items-center">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">عملائك النشطين</div>
                    <div className="text-xs text-muted-foreground">لوحة الكوتش</div>
                  </div>
                  <div className="text-2xl font-extrabold text-accent-foreground bg-accent px-3 py-1 rounded-lg">42</div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "أحمد محمد", goal: "خسارة وزن", progress: 78, weight: "-6.5 كجم" },
                    { name: "سارة علي", goal: "بناء عضل", progress: 62, weight: "+3.2 كجم" },
                    { name: "خالد إبراهيم", goal: "لياقة عامة", progress: 91, weight: "-4.1 كجم" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.goal}</div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-success">{c.weight}</div>
                        <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden mt-1">
                          <div className="h-full bg-gradient-accent" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold mb-4">
              <Zap className="h-3.5 w-3.5" /> المميزات
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              كل اللي محتاجه لإدارة بيزنسك
            </h2>
            <p className="text-lg text-muted-foreground">
              أدوات قوية بواجهة بسيطة. وفّر وقتك وركز فيما يهم: تطور عملائك.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Card
                key={i}
                className="group p-6 bg-gradient-card border-border hover:border-accent hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/15 grid place-items-center mb-4 group-hover:bg-gradient-accent transition-colors">
                  <f.icon className="h-6 w-6 text-primary group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold mb-4">
              <Shield className="h-3.5 w-3.5" /> الباقات
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">باقات تناسب كل المستويات</h2>
            <p className="text-lg text-muted-foreground">
              ابدأ مجاناً 14 يوم. ادفع لما تشوف القيمة بنفسك.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((p, i) => (
              <Card
                key={i}
                className={`relative p-7 transition-all ${
                  p.highlighted
                    ? "border-accent border-2 shadow-elegant lg:scale-105 bg-card"
                    : "border-border hover:border-accent/50"
                }`}
              >
                {p.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                    الأكثر شعبية
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className="text-muted-foreground">ج.م {p.period}</span>
                </div>
                <Button
                  asChild
                  className={`w-full mb-6 font-bold ${
                    p.highlighted
                      ? "bg-gradient-accent text-accent-foreground hover:opacity-90"
                      : ""
                  }`}
                  variant={p.highlighted ? "default" : "outline"}
                >
                  <Link to="/auth?mode=signup">{p.cta}</Link>
                </Button>
                <ul className="space-y-3">
                  {p.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold mb-4">
              <ChevronDown className="h-3.5 w-3.5" /> الأسئلة الشائعة
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">عندك سؤال؟ عندنا الإجابة</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5"
              >
                <AccordionTrigger className="text-base md:text-lg font-bold text-right hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-center text-primary-foreground">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/60 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                جاهز ترفع مستوى الكوتشينج بتاعك؟
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                انضم لمئات الكوتشز اللي بقوا يديروا بيزنسهم باحترافية مع {branding.name}.
              </p>
              <Button asChild size="lg" className="bg-gradient-accent text-accent-foreground hover:opacity-90 font-bold text-base h-12 px-8 shadow-glow">
                <Link to="/auth?mode=signup">
                  ابدأ تجربتك المجانية الآن
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
