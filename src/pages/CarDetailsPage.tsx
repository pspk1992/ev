import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BookingModal } from "@/components/showroom/BookingModal";
import { EmiCalculator } from "@/components/showroom/EmiCalculator";
import { LoadingGrid } from "@/components/showroom/LoadingGrid";
import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import { getCarBySlug } from "@/services/carService";
import type { Car } from "@/types/showroom";

const chargeCurveData = [
  { batteryLevel: "10%", minutes: 12 },
  { batteryLevel: "20%", minutes: 15 },
  { batteryLevel: "40%", minutes: 18 },
  { batteryLevel: "80%", minutes: 26 },
];

const chargeCurveConfig = {
  minutes: {
    label: "Charge time",
    color: "hsl(var(--primary))",
  },
};

export default function CarDetailsPage() {
  const { slug = "" } = useParams();
  const { data: car, isLoading } = useQuery({ queryKey: ["car", slug], queryFn: () => getCarBySlug(slug) });
  const [activeCar, setActiveCar] = useState<Car | null>(null);
  usePageTitle(car ? `${car.brand} ${car.model}` : "Car details");
  const specGrid = useMemo(() => car?.specs ?? [], [car]);

  if (isLoading || !car) return <LoadingGrid count={1} label="Loading car details" />;

  return (
    <>
      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel overflow-hidden p-4">
            <Carousel className="px-10">
              <CarouselContent>
                {car.images.map((image) => (
                  <CarouselItem key={image}>
                    <img src={image} alt={`${car.brand} ${car.model}`} className="aspect-[16/10] w-full rounded-[2rem] object-cover" loading="lazy" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3" />
              <CarouselNext className="right-3" />
            </Carousel>
          </div>
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-4">{car.brand}</p>
              <h1 className="text-5xl">{car.model}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{car.longDescription}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {specGrid.map((spec) => (
                <div key={spec.label} className="data-card p-4">
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                  <p className="mt-1 text-lg font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
            <div className="glass-panel p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Availability</p>
              <p className="mt-2 text-3xl font-bold">${car.price.toLocaleString()}</p>
              <p className="mt-2 text-muted-foreground">{car.availability}</p>
              <p className="mt-4 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">{car.promotion}</p>
              <Button className="mt-5 rounded-full" onClick={() => setActiveCar(car)} data-testid="details-book-button">Book test drive</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <SectionHeading eyebrow="Performance" title="Engineered for effortless speed and long-range travel." description="Every model in the Volt showroom balances emotional design with real-world ownership practicality." />
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="glass-panel p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Range", `${car.range} miles`],
                  ["0-60 mph", `${car.acceleration} seconds`],
                  ["Power", `${car.horsepower} hp`],
                  ["Top speed", `${car.topSpeed} mph`],
                  ["Drive", car.drive],
                  ["Battery", car.battery],
                  ["Charge time", car.chargeTime],
                  ["Seats", String(car.seats)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-line/70 p-4">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-1 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Charge Curve</p>
                  <h3 className="mt-2 text-2xl">Battery level vs charging time</h3>
                </div>
                <p className="max-w-48 text-right text-sm text-muted-foreground">Estimated fast-charge time from your requested data points.</p>
              </div>
              <div className="mt-6 h-72 w-full rounded-[1.75rem] border border-line/70 bg-background/40 p-4">
                <ChartContainer config={chargeCurveConfig} className="h-full w-full aspect-auto">
                  <LineChart data={chargeCurveData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="batteryLevel" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}m`} width={40} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent formatter={(value) => [`${value} min`, "Charge time"]} />}
                    />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke="var(--color-minutes)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "var(--color-minutes)" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {chargeCurveData.map((point) => (
                  <div key={point.batteryLevel} className="rounded-2xl border border-line/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{point.batteryLevel}</p>
                    <p className="mt-1 text-lg font-semibold">{point.minutes} min</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <EmiCalculator price={car.price} />
        </div>
      </section>

      <BookingModal car={activeCar} open={Boolean(activeCar)} onOpenChange={(open) => !open && setActiveCar(null)} />
    </>
  );
}
