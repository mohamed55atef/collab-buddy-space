import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Plus, Apple, Dumbbell, TrendingUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [measurements, setMeasurements] = useState<any[]>([]);

  const load = async () => {
    if (!id) return;
    const [c, m, w, ms] = await Promise.all([
      supabase.from("clients").select("*").eq("id", id).maybeSingle(),
      supabase.from("meal_plans").select("*").eq("client_id", id).order("created_at", { ascending: false }),
      supabase.from("workout_plans").select("*").eq("client_id", id).order("created_at", { ascending: false }),
      supabase.from("measurements").select("*").eq("client_id", id).order("measured_on", { ascending: false }),
    ]);
    setClient(c.data);
    setMeals(m.data ?? []);
    setWorkouts(w.data ?? []);
    setMeasurements(ms.data ?? []);
  };

  useEffect(() => { load(); }, [id]);

  const addMeasurement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !id) return;
    const payload: any = { coach_id: user.id, client_id: id };
    ["weight_kg","body_fat_pct","waist_cm","chest_cm","arms_cm","thighs_cm"].forEach(k => {
      const v = fd.get(k); if (v) payload[k] = Number(v);
    });
    const measured_on = fd.get("measured_on"); if (measured_on) payload.measured_on = measured_on;
    const notes = fd.get("notes"); if (notes) payload.notes = notes;
    const { error } = await supabase.from("measurements").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("تم إضافة القياس");
    (e.target as HTMLFormElement).reset();
    load();
  };

  const removeMeasurement = async (mid: string) => {
    const { error } = await supabase.from("measurements").delete().eq("id", mid);
    if (error) return toast.error(error.message);
    load();
  };

  if (!client) return <div className="text-muted-foreground">جاري التحميل...</div>;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/dashboard/clients"><ArrowRight className="h-4 w-4" /> رجوع للعملاء</Link>
      </Button>

      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">{client.full_name}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mt-2">
              {client.phone && <span dir="ltr">{client.phone}</span>}
              {client.age && <span>{client.age} سنة</span>}
              {client.weight_kg && <span>{client.weight_kg} كجم</span>}
              {client.height_cm && <span>{client.height_cm} سم</span>}
            </div>
            {client.goal && <p className="mt-3"><span className="font-semibold">الهدف: </span>{client.goal}</p>}
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-bold">{client.status}</span>
        </div>
      </Card>

      <Tabs defaultValue="measurements">
        <TabsList>
          <TabsTrigger value="measurements"><TrendingUp className="h-4 w-4" /> القياسات</TabsTrigger>
          <TabsTrigger value="meals"><Apple className="h-4 w-4" /> الوجبات</TabsTrigger>
          <TabsTrigger value="workouts"><Dumbbell className="h-4 w-4" /> التمارين</TabsTrigger>
        </TabsList>

        <TabsContent value="measurements" className="space-y-4">
          <Card className="p-5">
            <h3 className="font-bold mb-3">إضافة قياس جديد</h3>
            <form onSubmit={addMeasurement} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div><Label>التاريخ</Label><Input type="date" name="measured_on" defaultValue={new Date().toISOString().slice(0,10)} /></div>
              <div><Label>الوزن (كجم)</Label><Input type="number" step="0.1" name="weight_kg" /></div>
              <div><Label>نسبة الدهون %</Label><Input type="number" step="0.1" name="body_fat_pct" /></div>
              <div><Label>الخصر (سم)</Label><Input type="number" step="0.1" name="waist_cm" /></div>
              <div><Label>الصدر (سم)</Label><Input type="number" step="0.1" name="chest_cm" /></div>
              <div><Label>الذراع (سم)</Label><Input type="number" step="0.1" name="arms_cm" /></div>
              <div><Label>الفخذ (سم)</Label><Input type="number" step="0.1" name="thighs_cm" /></div>
              <div className="flex items-end"><Button type="submit" className="w-full bg-gradient-accent text-accent-foreground hover:opacity-90"><Plus className="h-4 w-4" /> حفظ</Button></div>
            </form>
          </Card>

          {measurements.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">لا توجد قياسات بعد.</p>
          ) : (
            <Card className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50"><tr>
                  <th className="text-right p-3">التاريخ</th><th className="text-right p-3">الوزن</th>
                  <th className="text-right p-3">دهون</th><th className="text-right p-3">خصر</th>
                  <th className="text-right p-3">صدر</th><th className="text-right p-3">ذراع</th>
                  <th className="text-right p-3">فخذ</th><th></th>
                </tr></thead>
                <tbody>{measurements.map((m) => (
                  <tr key={m.id} className="border-t border-border">
                    <td className="p-3">{m.measured_on}</td>
                    <td className="p-3">{m.weight_kg ?? "—"}</td>
                    <td className="p-3">{m.body_fat_pct ?? "—"}</td>
                    <td className="p-3">{m.waist_cm ?? "—"}</td>
                    <td className="p-3">{m.chest_cm ?? "—"}</td>
                    <td className="p-3">{m.arms_cm ?? "—"}</td>
                    <td className="p-3">{m.thighs_cm ?? "—"}</td>
                    <td className="p-3"><Button size="icon" variant="ghost" onClick={() => removeMeasurement(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
                  </tr>
                ))}</tbody>
              </table>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="meals">
          <PlansList items={meals} type="meal" clientId={id!} onChange={load} />
        </TabsContent>
        <TabsContent value="workouts">
          <PlansList items={workouts} type="workout" clientId={id!} onChange={load} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PlansList = ({ items, type, clientId, onChange }: { items: any[]; type: "meal" | "workout"; clientId: string; onChange: () => void }) => {
  const table = type === "meal" ? "meal_plans" : "workout_plans";
  const [title, setTitle] = useState("");

  const add = async () => {
    if (!title.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from(table).insert({ coach_id: user.id, client_id: clientId, title });
    if (error) return toast.error(error.message);
    setTitle("");
    toast.success("تمت الإضافة");
    onChange();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    onChange();
  };

  return (
    <div className="space-y-3">
      <Card className="p-4 flex gap-2">
        <Input placeholder={type === "meal" ? "اسم خطة الوجبات..." : "اسم جدول التمارين..."} value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button onClick={add} className="bg-gradient-accent text-accent-foreground hover:opacity-90"><Plus className="h-4 w-4" /> إضافة</Button>
      </Card>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">لا توجد خطط بعد.</p>
      ) : items.map((p) => (
        <Card key={p.id} className="p-4 flex items-center justify-between">
          <div>
            <div className="font-bold">{p.title}</div>
            <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString("ar-EG")}</div>
          </div>
          <Button size="icon" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </Card>
      ))}
    </div>
  );
};

export default ClientDetail;