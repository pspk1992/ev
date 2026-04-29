import { Heart, Scale, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useShowroom } from "@/hooks/use-showroom";
import type { Car } from "@/types/showroom";

interface CarCardProps {
  car: Car;
  onBook?: (car: Car) => void;
}

export function CarCard({ car, onBook }: CarCardProps) {
  const { compareIds, wishlistIds, toggleCompare, toggleWishlist } = useShowroom();
  const isCompared = compareIds.includes(car.id);
  const isWishlisted = wishlistIds.includes(car.id);

  // return (
  //   <Card className="group overflow-hidden rounded-[calc(var(--radius)+0.5rem)] border-line/70 bg-card/85 transition-transform duration-300 hover:-translate-y-1 hover:shadow-premium">
  //     <div className="relative overflow-hidden border-b border-line/70 bg-secondary/40">
  //       <img
  //         src={car.images[0]}
  //         alt={`${car.brand} ${car.model}`}
  //         className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
  //         loading="lazy"
  //       />
  //       <div className="absolute left-4 top-4 flex items-center gap-2">
  //         <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
  //           {car.brand}
  //         </span>
  //         {car.featured ? <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Featured</span> : null}
  //       </div>
  //       <div className="absolute right-4 top-4 flex gap-2">
  //         <button
  //           type="button"
  //           aria-label="Toggle wishlist"
  //           data-testid={`wishlist-${car.slug}`}
  //           onClick={() => toggleWishlist(car.id)}
  //           className={cn(
  //             "rounded-full border border-line/70 bg-card/80 p-2 text-muted-foreground transition hover:text-foreground",
  //             isWishlisted && "bg-accent text-accent-foreground",
  //           )}
  //         >
  //           <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
  //         </button>
  //         <button
  //           type="button"
  //           aria-label="Toggle compare"
  //           data-testid={`compare-${car.slug}`}
  //           onClick={() => toggleCompare(car.id)}
  //           className={cn(
  //             "rounded-full border border-line/70 bg-card/80 p-2 text-muted-foreground transition hover:text-foreground",
  //             isCompared && "bg-primary text-primary-foreground",
  //           )}
  //         >
  //           <Scale className="h-4 w-4" />
  //         </button>
  //       </div>
  //     </div>

  //     <CardContent className="space-y-6 p-6">
  //       <div className="space-y-3">
  //         <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{car.heroTag}</p>
  //         <div className="flex items-start justify-between gap-4">
  //           <div>
  //             <h3 className="text-2xl">{car.model}</h3>
  //             <p className="mt-2 text-sm text-muted-foreground">{car.description}</p>
  //           </div>
  //           <div className="text-right">
  //             <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">From</p>
  //             <p className="text-xl font-bold">${car.price.toLocaleString()}</p>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-3 gap-3 text-sm">
  //         <div className="data-card p-3">
  //           <p className="text-muted-foreground">Range</p>
  //           <p className="mt-1 font-semibold">{car.range} mi</p>
  //         </div>
  //         <div className="data-card p-3">
  //           <p className="text-muted-foreground">0-60</p>
  //           <p className="mt-1 font-semibold">{car.acceleration}s</p>
  //         </div>
  //         <div className="data-card p-3">
  //           <p className="text-muted-foreground">Power</p>
  //           <p className="mt-1 font-semibold">{car.horsepower} hp</p>
  //         </div>
  //       </div>

  //       <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
  //         {car.features.slice(0, 3).map((feature) => (
  //           <span key={feature} className="rounded-full border border-line/70 px-3 py-1">
  //             {feature}
  //           </span>
  //         ))}
  //       </div>

  //       <div className="flex flex-wrap gap-3">
  //         <Button asChild className="flex-1 rounded-full">
  //           <Link to={`/cars/${car.slug}`}>View details</Link>
  //         </Button>
  //         <Button variant="secondary" className="flex-1 rounded-full" onClick={() => onBook?.(car)}>
  //           <Zap className="mr-1 h-4 w-4" />
  //           Book test drive
  //         </Button>
  //       </div>
  //     </CardContent>
  //   </Card>
  // );
}
