import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { toast } from "sonner";
import { getCarById } from "@/services/carService";
import type { BookingRequest, ThemeMode, UserRole } from "@/types/showroom";

interface ShowroomContextValue {
  theme: ThemeMode;
  role: UserRole;
  compareIds: string[];
  wishlistIds: string[];
  bookings: BookingRequest[];
  toggleTheme: () => void;
  signInAs: (role: Exclude<UserRole, "guest">) => void;
  signOut: () => void;
  toggleCompare: (carId: string) => void;
  toggleWishlist: (carId: string) => void;
  addBooking: (booking: Omit<BookingRequest, "id" | "createdAt">) => BookingRequest;
}

export const ShowroomContext = createContext<ShowroomContextValue | null>(null);

const initialBookings: BookingRequest[] = [
  {
    id: "demo-booking-1",
    carId: "bmw-i4-m50",
    carLabel: "BMW i4 M50",
    fullName: "Alex Mercer",
    email: "alex@voltshowroom.com",
    phone: "+1 202 555 0182",
    date: "2026-03-25",
    city: "San Francisco",
    note: "Interested in lease options.",
    budget: 90000,
    createdAt: new Date().toISOString(),
  },
];

export function ShowroomProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );
  const [role, setRole] = useState<UserRole>("guest");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>(initialBookings);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo<ShowroomContextValue>(
    () => ({
      theme,
      role,
      compareIds,
      wishlistIds,
      bookings,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      signInAs: (nextRole) => {
        setRole(nextRole);
        toast.success(`Signed in as ${nextRole === "admin" ? "admin" : "customer"}`);
      },
      signOut: () => {
        setRole("guest");
        toast.message("Signed out");
      },
      toggleCompare: (carId) => {
        const car = getCarById(carId);
        setCompareIds((current) => {
          if (current.includes(carId)) {
            toast.message(`${car?.brand} ${car?.model} removed from compare`);
            return current.filter((id) => id !== carId);
          }

          if (current.length >= 3) {
            toast.error("You can compare up to 3 cars at once");
            return current;
          }

          toast.success(`${car?.brand} ${car?.model} added to compare`);
          return [...current, carId];
        });
      },
      toggleWishlist: (carId) => {
        const car = getCarById(carId);
        setWishlistIds((current) => {
          const exists = current.includes(carId);
          toast.message(exists ? `${car?.brand} ${car?.model} removed from wishlist` : `${car?.brand} ${car?.model} saved to wishlist`);
          return exists ? current.filter((id) => id !== carId) : [...current, carId];
        });
      },
      addBooking: (booking) => {
        const entry: BookingRequest = {
          ...booking,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        setBookings((current) => [entry, ...current]);
        toast.success(`Booking request created for ${booking.carLabel}`);
        return entry;
      },
    }),
    [bookings, compareIds, role, theme, wishlistIds],
  );

  return <ShowroomContext.Provider value={value}>{children}</ShowroomContext.Provider>;
}
