import { Dumbbell, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { branding } from "@/lib/branding";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-extrabold text-xl mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent">
              <Dumbbell className="h-5 w-5 text-accent-foreground" />
            </span>
            {branding.name}
          </div>
          <p className="text-primary-foreground/70 max-w-md leading-relaxed">
            {branding.description}
          </p>
          <div className="flex gap-3 mt-6">
            <a href={branding.social.instagram} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={branding.social.facebook} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={branding.social.youtube} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">المنتج</h4>
          <ul className="space-y-2 text-primary-foreground/70">
            <li><a href="/#features" className="hover:text-accent transition-colors">المميزات</a></li>
            <li><a href="/#pricing" className="hover:text-accent transition-colors">الباقات</a></li>
            <li><a href="/#faq" className="hover:text-accent transition-colors">الأسئلة الشائعة</a></li>
            <li><Link to="/auth" className="hover:text-accent transition-colors">تسجيل الدخول</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">تواصل معنا</h4>
          <ul className="space-y-2 text-primary-foreground/70">
            <li><a href={`mailto:${branding.email}`} className="hover:text-accent transition-colors">{branding.email}</a></li>
            <li dir="ltr" className="text-right">{branding.whatsapp}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} {branding.name}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};