import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, LogOut, Users, TrendingUp, Calendar, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { branding } from "@/lib/branding";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
      else setEmail(session.user.email ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth", { replace: true });
      else setEmail(session.user.email ?? null);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-muted-foreground">جاري التحميل...</div>
      </div>
    );
  }

  const stats = [
    { icon: Users, label: "العملاء النشطين", value: "0", color: "text-blue-500" },
    { icon: Apple, label: "خطط تغذية", value: "0", color: "text-green-500" },
    { icon: Dumbbell, label: "جداول تمارين", value: "0", color: "text-orange-500" },
    { icon: Calendar, label: "حجوزات اليوم", value: "0", color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
              <Dumbbell className="h-4 w-4 text-accent-foreground" />
            </span>
            {branding.name}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline" dir="ltr">{email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">خروج</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-1">لوحة التحكم</h1>
          <p className="text-muted-foreground">أهلاً بك في {branding.name} — ابدأ بإضافة عملائك.</p>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((s, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-8 w-8 ${s.color}`} />
              </div>
              <div className="text-3xl font-extrabold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </Card>
          ))}
        </div>

        <Card className="p-10 text-center">
          <TrendingUp className="h-12 w-12 mx-auto text-accent mb-4" />
          <h2 className="text-xl font-bold mb-2">قريباً: المزيد من المميزات</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            بنشتغل دلوقتي على إضافة العملاء، خطط الوجبات، جداول التمارين، والمتابعة التفصيلية.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;