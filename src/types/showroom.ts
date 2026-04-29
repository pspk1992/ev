export type ThemeMode = "light" | "dark";
export type UserRole = "guest" | "user" | "admin";

export type CarBrand = "Tesla" | "BMW" | "Mercedes-EQ" | "Audi" | "Porsche";
export type CarBodyStyle = "Sedan" | "SUV" | "Coupe" | "Sportback";
export type CarSort = "featured" | "price-asc" | "price-desc" | "range-desc" | "acceleration-asc";

export interface Car {
  id: string;
  slug: string;
  brand: CarBrand;
  model: string;
  bodyStyle: CarBodyStyle;
  heroTag: string;
  description: string;
  longDescription: string;
  price: number;
  range: number;
  acceleration: number;
  horsepower: number;
  topSpeed: number;
  seats: number;
  drive: string;
  battery: string;
  chargeTime: string;
  featured: boolean;
  promotion: string;
  availability: string;
  images: string[];
  features: string[];
  specs: Array<{ label: string; value: string }>;
}

export interface CarFilters {
  search: string;
  brand: CarBrand | "All";
  bodyStyle: CarBodyStyle | "All";
  maxPrice: number;
  minRange: number;
  sort: CarSort;
}

export interface BookingRequest {
  id: string;
  carId?: string;
  carLabel: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  city: string;
  note: string;
  budget: number;
  createdAt: string;
}

export const DEFAULT_FILTERS: CarFilters = {
  search: "",
  brand: "All",
  bodyStyle: "All",
  maxPrice: 180000,
  minRange: 250,
  sort: "featured",
};
