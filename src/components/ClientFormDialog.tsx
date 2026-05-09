import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  client?: any;
  onSaved?: () => void;
};

const empty = {
  full_name: "",
  phone: "",
  email: "",
  gender: "",
  age: "",
  height_cm: "",
  weight_kg: "",
  goal: "",
  notes: "",
  status: "active",
};

export const ClientFormDialog = ({ open, onOpenChange, client, onSaved }: Props) => {
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (client) {
      setForm({
        full_name: client.full_name ?? "",
        phone: client.phone ?? "",
        email: client.email ?? "",
        gender: client.gender ?? "",
        age: client.age ?? "",
        height_cm: client.height_cm ?? "",
        weight_kg: client.weight_kg ?? "",
        goal: client.goal ?? "",
        notes: client.notes ?? "",
        status: client.status ?? "active",
      });
    } else setForm(empty);
  }, [client, open]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const payload = {
      coach_id: user.id,
      full_name: form.full_name,
      phone: form.phone || null,
      email: form.email || null,
      gender: form.gender || null,
      age: form.age ? Number(form.age) : null,
      height_cm: form.height_cm ? Number(form.height_cm) : null,
      weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
      goal: form.goal || null,
      notes: form.notes || null,
      status: form.status,
    };

    const res = client?.id
      ? await supabase.from("clients").update(payload).eq("id", client.id)
      : await supabase.from("clients").insert(payload);

    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    toast.success(client?.id ? "تم التحديث" : "تم إضافة العميل");
    onSaved?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{client?.id ? "تعديل عميل" : "إضافة عميل جديد"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>الاسم الكامل *</Label>
            <Input required value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>الهاتف</Label>
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} dir="ltr" />
            </div>
            <div>
              <Label>البريد</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} dir="ltr" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>الجنس</Label>
              <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
                <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>العمر</Label>
              <Input type="number" value={form.age} onChange={(e) => set("age", e.target.value)} />
            </div>
            <div>
              <Label>الحالة</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="paused">متوقف</SelectItem>
                  <SelectItem value="finished">منتهي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>الطول (سم)</Label>
              <Input type="number" value={form.height_cm} onChange={(e) => set("height_cm", e.target.value)} />
            </div>
            <div>
              <Label>الوزن (كجم)</Label>
              <Input type="number" step="0.1" value={form.weight_kg} onChange={(e) => set("weight_kg", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>الهدف</Label>
            <Input placeholder="مثال: خسارة 10 كجم" value={form.goal} onChange={(e) => set("goal", e.target.value)} />
          </div>
          <div>
            <Label>ملاحظات</Label>
            <Textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
            <Button type="submit" disabled={saving} className="bg-gradient-accent text-accent-foreground hover:opacity-90">
              {saving ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};