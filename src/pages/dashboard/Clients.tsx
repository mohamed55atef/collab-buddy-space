import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, Search, ArrowLeft, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ClientFormDialog } from "@/components/ClientFormDialog";
import { toast } from "sonner";

type Client = {
  id: string;
  full_name: string;
  phone: string | null;
  goal: string | null;
  status: string;
  created_at: string;
};

const Clients = () => {
  const [params, setParams] = useSearchParams();
  const [clients, setClients] = useState<Client[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(params.get("new") === "1");
  const [editing, setEditing] = useState<any>(null);

  const load = async () => {
    const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setClients(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const filtered = clients.filter((c) =>
    c.full_name.toLowerCase().includes(q.toLowerCase()) ||
    (c.phone ?? "").includes(q)
  );

  const remove = async (id: string) => {
    if (!confirm("هل تريد حذف هذا العميل؟ سيتم حذف جميع خططه وقياساته.")) return;
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">العملاء</h1>
          <p className="text-muted-foreground">{clients.length} عميل مسجّل</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }} className="bg-gradient-accent text-accent-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> إضافة عميل
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="ابحث بالاسم أو الهاتف..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pr-10"
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">لا يوجد عملاء.</p>
          <Button onClick={() => { setEditing(null); setOpen(true); }} variant="outline">
            <Plus className="h-4 w-4" /> أضف أول عميل
          </Button>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Card key={c.id} className="p-5 group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{c.full_name}</h3>
                  {c.phone && <p className="text-sm text-muted-foreground" dir="ltr">{c.phone}</p>}
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{c.status}</span>
              </div>
              {c.goal && <p className="text-sm mb-4 line-clamp-2">{c.goal}</p>}
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link to={`/dashboard/clients/${c.id}`}>التفاصيل <ArrowLeft className="h-3 w-3" /></Link>
                </Button>
                <Button size="icon" variant="ghost" onClick={() => { setEditing(c); setOpen(true); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => remove(c.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ClientFormDialog
        open={open}
        onOpenChange={(v) => { setOpen(v); if (!v) setParams({}); }}
        client={editing}
        onSaved={load}
      />
    </div>
  );
};

export default Clients;