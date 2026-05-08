import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { branding } from "@/lib/branding";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "المميزات", href: "/#features" },
  { label: "الباقات", href: "/#pricing" },
  { label: "الأسئلة الشائعة", href: "/#faq" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-lg md:text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-accent shadow-glow">
            <Dumbbell className="h-5 w-5 text-accent-foreground" />
          </span>
          <span className="text-foreground">{branding.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth">تسجيل دخول</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-accent text-accent-foreground hover:opacity-90 font-bold">
            <Link to="/auth?mode=signup">ابدأ مجاناً</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-base font-medium hover:bg-secondary rounded-lg"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
              <Button asChild variant="outline">
                <Link to="/auth">تسجيل دخول</Link>
              </Button>
              <Button asChild className="bg-gradient-accent text-accent-foreground hover:opacity-90 font-bold">
                <Link to="/auth?mode=signup">ابدأ مجاناً</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};