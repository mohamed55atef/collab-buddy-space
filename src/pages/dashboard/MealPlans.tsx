import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Apple, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const MealPlans = () => {
  const [plans, setPlans] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("meal_plans").select("*, clients(full_name)").order("created_at", { ascending: false })
      .then(({ data }) => setPlans(data ?? []));
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">خطط الوجبات</h1>
        <p className="text-muted-foreground">جميع خطط الوجبات لعملائك</p>
      </div>
      {plans.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          <Apple className="h-10 w-10 mx-auto mb-2 text-accent" />
          لا توجد خطط بعد. أضف خطة من صفحة العميل.
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="font-bold text-lg mb-1">{p.title}</div>
              {p.clients && (
                <Link to={`/dashboard/clients/${p.client_id}`} className="text-sm text-accent inline-flex items-center gap-1">
                  {p.clients.full_name} <ArrowLeft className="h-3 w-3" />
                </Link>
              )}
              <div className="text-xs text-muted-foreground mt-2">{new Date(p.created_at).toLocaleDateString("ar-EG")}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default MealPlans;