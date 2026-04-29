import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/showroom/BookingModal";
import { CarCard } from "@/components/showroom/CarCard";
import { LoadingGrid } from "@/components/showroom/LoadingGrid";
import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import { getFeaturedCars } from "@/services/carService";
import type { Car } from "@/types/showroom";

const promos = [
  { title: "White-glove delivery", text: "Dedicated specialist, home handover and charger walkthrough included." },
  { title: "Charging credit", text: "Receive premium fast-charging credit with selected flagship EVs." },
  { title: "Finance concierge", text: "Compare lease and EMI options in one guided experience." },
];

export default function HomePage() {
  usePageTitle("Electric Car Showroom");
  const { data: cars, isLoading } = useQuery({ queryKey: ["featured-cars"], queryFn: getFeaturedCars });
  const [activeCar, setActiveCar] = useState<Car | null>(null);
  const stats = useMemo(() => [
    { label: "Premium EVs", value: "08" },
    { label: "Max range", value: "396 mi" },
    { label: "Concierge booking", value: "24/7" },
  ], []);

  return (
    <>
      <section className="section-shell pt-10 md:pt-16">
        <div className="glass-panel overflow-hidden p-6 md:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow mb-5">Curated electric performance</p>
              <h1 className="text-balance text-5xl md:text-7xl">Drive the next era of luxury mobility.</h1>
              <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                Discover a premium showroom inspired by Tesla and BMW digital craft — compare, shortlist, finance and book a test drive in minutes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full"><Link to="/cars">Explore inventory <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/booking">Book a drive</Link></Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="data-card p-4">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-glow blur-3xl" />
              <img src="/cars/ev-side-real.jpg" alt="Premium electric car hero" className="w-full animate-float rounded-[2rem] border border-line/70 bg-secondary/30 object-cover p-3 shadow-premium" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <SectionHeading eyebrow="Featured inventory" title="Flagship EVs, selected for presence and performance." description="Browse the most compelling luxury electric cars across sedan, SUV and sportback segments." action={<Button asChild variant="ghost" className="rounded-full"><Link to="/cars">View all cars</Link></Button>} />
        {isLoading || !cars ? <LoadingGrid count={3} label="Loading featured cars" /> : (
          <div className="grid gap-6 lg:grid-cols-3">
            {cars.slice(0, 3).map((car) => <CarCard key={car.id} car={car} onBook={setActiveCar} />)}
          </div>
        )}
      </section>

      <section className="section-shell pt-0">
        <SectionHeading eyebrow="Promotions" title="Ownership support designed for premium buyers." description="Every interaction is tuned to remove friction from discovery to delivery." />
        <div className="grid gap-6 md:grid-cols-3">
          {promos.map((promo, index) => (
            <div key={promo.title} className="glass-panel p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                {index === 0 ? <ShieldCheck /> : index === 1 ? <Zap /> : <Sparkles />}
              </div>
              <h3 className="text-2xl">{promo.title}</h3>
              <p className="mt-3 text-muted-foreground">{promo.text}</p>
            </div>
          ))}
        </div>
      </section>

      <BookingModal car={activeCar} open={Boolean(activeCar)} onOpenChange={(open) => !open && setActiveCar(null)} />
    </>
  );
}
