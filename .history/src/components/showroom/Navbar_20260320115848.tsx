import { useMemo, useState } from "react";
import { ChevronDown, Heart, Menu, Shield, User2 } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/showroom/ThemeToggle";
import { useShowroom } from "@/hooks/use-showroom";
import { getBodyStyles } from "@/services/carService";

const links = [
  { to: "/cars", label: "Cars" },
  { to: "/booking", label: "Booking" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const navigate = useNavigate();
  const { role, signInAs, signOut, wishlistIds } = useShowroom();
  const [search, setSearch] = useState("");
  const categories = useMemo(() => getBodyStyles().filter((item) => item !== "All"), []);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/cars?search=${encodeURIComponent(search)}`);
  };

  const navItems = (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {link.label}
        </NavLink>
      ))}
      <div className="group relative hidden lg:block">
        <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
          Categories <ChevronDown className="h-4 w-4" />
        </button>
        <div className="invisible absolute left-0 top-full mt-3 min-w-44 rounded-2xl border border-line/70 bg-card/95 p-3 opacity-0 shadow-premium transition group-hover:visible group-hover:opacity-100">
          {categories.map((category) => (
            <button key={category} type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground" onClick={() => navigate(`/cars?bodyStyle=${encodeURIComponent(category)}`)}>
              {category}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/78 backdrop-blur-xl">
      <div className="container flex min-h-20 items-center gap-4 py-3">
        <Link to="/" className="mr-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">P</div>
          <div>
            <p className="font-display text-lg">PSPK</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Electric showroom</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">{navItems}</nav>

        <form onSubmit={submitSearch} className="ml-auto hidden min-w-0 flex-1 items-center justify-end md:flex">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Tesla, BMW, long range..."
            className="field-input max-w-sm rounded-full"
            data-testid="nav-search"
          />
        </form>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className="rounded-full" asChild>
            <Link to="/user"><User2 className="mr-2 h-4 w-4" />Profile</Link>
          </Button>
          <Button variant="ghost" className="rounded-full" asChild>
            <Link to="/user"><Heart className="mr-2 h-4 w-4" />{wishlistIds.length}</Link>
          </Button>
          <Button variant="ghost" className="rounded-full" onClick={() => (role === "guest" ? signInAs("user") : role === "user" ? signInAs("admin") : signOut())}>
            <Shield className="mr-2 h-4 w-4" />
            {role === "guest" ? "Demo sign in" : role === "user" ? "Switch admin" : "Sign out"}
          </Button>
          <ThemeToggle />
        </div>

        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent className="bg-card">
              <div className="mt-10 flex flex-col gap-5">
                <form onSubmit={submitSearch}><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inventory" className="field-input rounded-full" /></form>
                {navItems}
                <ThemeToggle />
                <Button className="rounded-full" onClick={() => (role === "guest" ? signInAs("user") : signOut())}>{role === "guest" ? "Demo sign in" : "Sign out"}</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
