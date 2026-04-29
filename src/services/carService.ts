import carsData from "@/data/cars.json";
import { DEFAULT_FILTERS, type Car, type CarBrand, type CarBodyStyle, type CarFilters } from "@/types/showroom";

const cars = carsData as Car[];
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

const sorters: Record<CarFilters["sort"], (a: Car, b: Car) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || a.price - b.price,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "range-desc": (a, b) => b.range - a.range,
  "acceleration-asc": (a, b) => a.acceleration - b.acceleration,
};

export async function getCars(filters: Partial<CarFilters> = {}): Promise<Car[]> {
  await delay();
  const activeFilters = { ...DEFAULT_FILTERS, ...filters };
  const searchValue = activeFilters.search.trim().toLowerCase();

  return [...cars]
    .filter((car) => {
      const matchesSearch =
        !searchValue ||
        `${car.brand} ${car.model} ${car.heroTag}`.toLowerCase().includes(searchValue) ||
        car.features.some((feature) => feature.toLowerCase().includes(searchValue));
      const matchesBrand = activeFilters.brand === "All" || car.brand === activeFilters.brand;
      const matchesBodyStyle = activeFilters.bodyStyle === "All" || car.bodyStyle === activeFilters.bodyStyle;
      const matchesPrice = car.price <= activeFilters.maxPrice;
      const matchesRange = car.range >= activeFilters.minRange;

      return matchesSearch && matchesBrand && matchesBodyStyle && matchesPrice && matchesRange;
    })
    .sort(sorters[activeFilters.sort]);
}

export async function getFeaturedCars(): Promise<Car[]> {
  await delay(120);
  return cars.filter((car) => car.featured);
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
  await delay(120);
  return cars.find((car) => car.slug === slug);
}

export function getBrands(): Array<CarBrand | "All"> {
  return ["All", ...new Set(cars.map((car) => car.brand))] as Array<CarBrand | "All">;
}

export function getBodyStyles(): Array<CarBodyStyle | "All"> {
  return ["All", ...new Set(cars.map((car) => car.bodyStyle))] as Array<CarBodyStyle | "All">;
}

export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

export function getAllCars(): Car[] {
  return cars;
}
