import type { ChangeEvent } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBodyStyles, getBrands } from "@/services/carService";
import type { CarFilters } from "@/types/showroom";

interface FilterSidebarProps {
  filters: CarFilters;
  onChange: (filters: CarFilters) => void;
}

const sorts: Array<{ value: CarFilters["sort"]; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "range-desc", label: "Longest Range" },
  { value: "acceleration-asc", label: "Fastest 0-60" },
];

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const brands = getBrands();
  const bodyStyles = getBodyStyles();

  const patch = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    onChange({
      ...filters,
      [name]: name === "maxPrice" || name === "minRange" ? Number(value) : value,
    });
  };

  return (
    <aside className="glass-panel h-fit p-6" data-testid="filter-sidebar">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="eyebrow mb-3">Precision filters</p>
          <h3 className="text-2xl">Shape your shortlist</h3>
        </div>
        <SlidersHorizontal className="text-primary" />
      </div>

      <div className="space-y-5">
        <div>
          <label className="field-label" htmlFor="brand">Brand</label>
          <select id="brand" name="brand" value={filters.brand} onChange={patch} className="field-input" data-testid="brand-filter">
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="bodyStyle">Category</label>
          <select id="bodyStyle" name="bodyStyle" value={filters.bodyStyle} onChange={patch} className="field-input">
            {bodyStyles.map((bodyStyle) => (
              <option key={bodyStyle} value={bodyStyle}>{bodyStyle}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="sort">Sort by</label>
          <select id="sort" name="sort" value={filters.sort} onChange={patch} className="field-input" data-testid="sort-filter">
            {sorts.map((sort) => (
              <option key={sort.value} value={sort.value}>{sort.label}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label className="field-label mb-0" htmlFor="maxPrice">Max price</label>
            <span className="text-muted-foreground">${filters.maxPrice.toLocaleString()}</span>
          </div>
          <input id="maxPrice" name="maxPrice" type="range" min={60000} max={180000} step={5000} value={filters.maxPrice} onChange={patch} className="w-full" data-testid="price-filter" />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label className="field-label mb-0" htmlFor="minRange">Minimum range</label>
            <span className="text-muted-foreground">{filters.minRange} mi</span>
          </div>
          <input id="minRange" name="minRange" type="range" min={250} max={400} step={5} value={filters.minRange} onChange={patch} className="w-full" data-testid="range-filter" />
        </div>

        <Button
          type="button"
          variant="ghost"
          className="w-full rounded-full"
          onClick={() => onChange({ search: "", brand: "All", bodyStyle: "All", maxPrice: 180000, minRange: 250, sort: "featured" })}
        >
          Reset filters
        </Button>
      </div>
    </aside>
  );
}
