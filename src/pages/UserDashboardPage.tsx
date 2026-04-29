import { Heart, CalendarRange } from "lucide-react";
import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import { useShowroom } from "@/hooks/use-showroom";
import { getAllCars } from "@/services/carService";

export default function UserDashboardPage() {
  usePageTitle("User dashboard");
  const { bookings, wishlistIds } = useShowroom();
  const wishlist = getAllCars().filter((car) => wishlistIds.includes(car.id));

  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Customer dashboard" title="Track your bookings, wishlist and next steps." description="A UI-only dashboard preview showing how the ownership journey could feel after sign-in." />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-panel p-6">
          <div className="mb-5 flex items-center gap-3"><CalendarRange className="text-primary" /><h2 className="text-2xl">Recent bookings</h2></div>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-2xl border border-line/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{booking.carLabel}</p>
                    <p className="text-sm text-muted-foreground">{booking.date} • {booking.city}</p>
                  </div>
                  <p className="rounded-full bg-secondary px-3 py-1 text-sm">Pending</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <div className="mb-5 flex items-center gap-3"><Heart className="text-primary" /><h2 className="text-2xl">Wishlist</h2></div>
          <div className="space-y-4">
            {wishlist.length ? wishlist.map((car) => (
              <div key={car.id} className="rounded-2xl border border-line/70 p-4">
                <p className="font-semibold">{car.brand} {car.model}</p>
                <p className="text-sm text-muted-foreground">{car.range} mi range • ${car.price.toLocaleString()}</p>
              </div>
            )) : <p className="text-muted-foreground">No saved cars yet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
