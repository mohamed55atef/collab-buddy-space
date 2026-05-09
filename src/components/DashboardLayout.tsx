import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import { Dumbbell, LogOut, Users, LayoutDashboard, Apple, CalendarDays, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { branding } from "@/lib/branding";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const nav = [
  { to: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard, end: true },
  { to: "/dashboard/clients", label: "العملاء", icon: Users },
  { to: "/dashboard/meal-plans", label: "خطط الوجبات", icon: Apple },
  { to: "/dashboard/workout-plans", label: "جداول التمارين", icon: CalendarDays },
  { to: "/dashboard/settings", label: "الإعدادات", icon: Settings },
];

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate("/auth", { replace: true });
      else setEmail(s.user.email ?? null);
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
    return <div className="min-h-screen grid place-items-center text-muted-foreground">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 h-screen w-64 bg-card border-l border-border z-40 transition-transform",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
              <Dumbbell className="h-4 w-4 text-accent-foreground" />
            </span>
            {branding.name}
          </Link>
          <button className="lg:hidden p-1" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button className="lg:hidden p-2" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div />
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline" dir="ltr">{email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">خروج</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;