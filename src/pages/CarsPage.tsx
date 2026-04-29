import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { BookingModal } from "@/components/showroom/BookingModal";
import { CarCard } from "@/components/showroom/CarCard";
import { FilterSidebar } from "@/components/showroom/FilterSidebar";
import { LoadingGrid } from "@/components/showroom/LoadingGrid";
import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import { getCars } from "@/services/carService";
import { DEFAULT_FILTERS, type Car, type CarFilters } from "@/types/showroom";

export default function CarsPage() {
  usePageTitle("Inventory");
  const [params, setParams] = useSearchParams();
  const initialFilters = useMemo<CarFilters>(() => ({
    ...DEFAULT_FILTERS,
    search: params.get("search") ?? "",
    brand: (params.get("brand") as CarFilters["brand"]) ?? "All",
    bodyStyle: (params.get("bodyStyle") as CarFilters["bodyStyle"]) ?? "All",
    sort: (params.get("sort") as CarFilters["sort"]) ?? "featured",
    maxPrice: Number(params.get("maxPrice") ?? DEFAULT_FILTERS.maxPrice),
    minRange: Number(params.get("minRange") ?? DEFAULT_FILTERS.minRange),
  }), [params]);
  const [filters, setFilters] = useState<CarFilters>(initialFilters);
  const [activeCar, setActiveCar] = useState<Car | null>(null);

  useEffect(() => setFilters(initialFilters), [initialFilters]);
  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.search) next.set("search", filters.search);
    if (filters.brand !== "All") next.set("brand", filters.brand);
    if (filters.bodyStyle !== "All") next.set("bodyStyle", filters.bodyStyle);
    if (filters.sort !== "featured") next.set("sort", filters.sort);
    if (filters.maxPrice !== DEFAULT_FILTERS.maxPrice) next.set("maxPrice", String(filters.maxPrice));
    if (filters.minRange !== DEFAULT_FILTERS.minRange) next.set("minRange", String(filters.minRange));
    setParams(next, { replace: true });
  }, [filters, setParams]);

  const { data: cars, isLoading } = useQuery({ queryKey: ["cars", filters], queryFn: () => getCars(filters) });

  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Inventory" title="Compare premium electric cars with confidence." description="Filter by brand, range and budget to build a shortlist that matches your lifestyle." />
      <div className="mb-6">
        <input value={filters.search} onChange={(e) => setFilters((current) => ({ ...current, search: e.target.value }))} placeholder="Search by brand, model or feature" className="field-input max-w-xl rounded-full" data-testid="cars-search" />
      </div>
      <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <div>
          <p className="mb-5 text-sm text-muted-foreground" data-testid="results-count">Showing {cars?.length ?? 0} cars</p>
          {isLoading || !cars ? <LoadingGrid count={6} label="Loading inventory" /> : (
            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {cars.map((car) => <CarCard key={car.id} car={car} onBook={setActiveCar} />)}
            </div>
          )}
        </div>
      </div>
      <BookingModal car={activeCar} open={Boolean(activeCar)} onOpenChange={(open) => !open && setActiveCar(null)} />
    </section>
  );
}
