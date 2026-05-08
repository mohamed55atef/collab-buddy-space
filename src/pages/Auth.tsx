import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Dumbbell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { branding } from "@/lib/branding";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (session) navigate("/dashboard", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("تم إنشاء حسابك! تحقق من بريدك لتأكيد الحساب.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("أهلاً بعودتك!");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ ما";
      toast.error(msg.includes("Invalid login") ? "بيانات الدخول غير صحيحة" : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero text-primary-foreground">
      <header className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 font-extrabold text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-accent">
            <Dumbbell className="h-5 w-5 text-accent-foreground" />
          </span>
          {branding.name}
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-7 bg-card text-card-foreground shadow-elegant">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">تسجيل دخول</TabsTrigger>
              <TabsTrigger value="signup">حساب جديد</TabsTrigger>
            </TabsList>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold mb-1">
                {mode === "signup" ? "ابدأ تجربتك المجانية" : "أهلاً بعودتك"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {mode === "signup"
                  ? "14 يوم تجربة مجانية. بدون كارت ائتماني."
                  : "سجل دخولك للوصول للوحة التحكم"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="signup" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أحمد محمد"
                    required={mode === "signup"}
                    className="mt-1.5"
                  />
                </div>
              </TabsContent>

              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  dir="ltr"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="mt-1.5"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-accent text-accent-foreground hover:opacity-90 font-bold h-11"
              >
                {loading ? "جاري المعالجة..." : mode === "signup" ? "إنشاء الحساب" : "تسجيل الدخول"}
                <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
              </Button>
            </form>
          </Tabs>

          <p className="text-center text-xs text-muted-foreground mt-6">
            بإنشاء حساب فأنت توافق على شروط الاستخدام وسياسة الخصوصية.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Auth;