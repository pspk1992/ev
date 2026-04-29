import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-card/60">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="eyebrow mb-4">Volt Showroom</p>
          <h2 className="text-3xl">Premium electric mobility, curated with taste.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">Explore flagship EVs, compare specs, estimate ownership and book your next drive from one polished showroom experience.</p>
        </div>
        <div>
          <h3 className="mb-4 text-lg">Explore</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li><Link to="/cars">Inventory</Link></li>
            <li><Link to="/booking">Book a drive</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg">Company</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/user">Dashboard</Link></li>
            <li><Link to="/dashboard">Admin UI</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg">Social</h3>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="rounded-full border border-line/70 p-3"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-line/70 p-3"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="rounded-full border border-line/70 p-3"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
