import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Apple, Dumbbell, Plus, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { branding } from "@/lib/branding";

const Dashboard = () => {
  const [stats, setStats] = useState({ clients: 0, meals: 0, workouts: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [c, m, w, r] = await Promise.all([
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("meal_plans").select("*", { count: "exact", head: true }),
        supabase.from("workout_plans").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("id, full_name, goal, created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({ clients: c.count ?? 0, meals: m.count ?? 0, workouts: w.count ?? 0 });
      setRecent(r.data ?? []);
    })();
  }, []);

  const cards = [
    { icon: Users, label: "العملاء", value: stats.clients, color: "text-blue-500", to: "/dashboard/clients" },
    { icon: Apple, label: "خطط الوجبات", value: stats.meals, color: "text-green-500", to: "/dashboard/meal-plans" },
    { icon: Dumbbell, label: "جداول التمارين", value: stats.workouts, color: "text-orange-500", to: "/dashboard/workout-plans" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">نظرة عامة</h1>
          <p className="text-muted-foreground">أهلاً بك في {branding.name}</p>
        </div>
        <Button asChild className="bg-gradient-accent text-accent-foreground hover:opacity-90">
          <Link to="/dashboard/clients?new=1"><Plus className="h-4 w-4" /> عميل جديد</Link>
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {cards.map((s, i) => (
          <Link key={i} to={s.to}>
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-8 w-8 ${s.color}`} />
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-3xl font-extrabold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">آخر العملاء</h2>
          <Button asChild variant="ghost" size="sm"><Link to="/dashboard/clients">عرض الكل</Link></Button>
        </div>
        {recent.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">لا يوجد عملاء بعد. ابدأ بإضافة أول عميل.</p>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((c) => (
              <Link key={c.id} to={`/dashboard/clients/${c.id}`} className="flex items-center justify-between py-3 hover:bg-secondary/40 px-2 rounded">
                <div>
                  <div className="font-semibold">{c.full_name}</div>
                  <div className="text-xs text-muted-foreground">{c.goal || "بدون هدف محدد"}</div>
                </div>
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;