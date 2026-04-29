// import { useState } from "react";
// import { ArrowRightLeft, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { getAllCars } from "@/services/carService";
// import { useShowroom } from "@/hooks/use-showroom";

// function CompareModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
//   const { compareIds, toggleCompare } = useShowroom();
//   const cars = getAllCars().filter((car) => compareIds.includes(car.id));

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
//       <div className="glass-panel max-h-[92vh] w-full max-w-6xl overflow-auto p-6" data-testid="compare-modal">
//         <div className="mb-6 flex items-center justify-between gap-4">
//           <div>
//             <p className="eyebrow mb-3">Side by side</p>
//             <h3 className="text-3xl">Compare electric flagships</h3>
//           </div>
//           <button type="button" onClick={() => onOpenChange(false)} className="rounded-full border border-line/70 p-2"><X className="h-4 w-4" /></button>
//         </div>

//         <div className="grid gap-4 md:grid-cols-3">
//           {cars.map((car) => (
//             <div key={car.id} className="data-card overflow-hidden">
//               <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="aspect-[16/10] w-full object-cover" loading="lazy" />
//               <div className="space-y-4 p-5">
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{car.brand}</p>
//                     <h4 className="text-2xl">{car.model}</h4>
//                   </div>
//                   <Button variant="ghost" size="sm" onClick={() => toggleCompare(car.id)}>Remove</Button>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   {[
//                     ["Price", `$${car.price.toLocaleString()}`],
//                     ["Range", `${car.range} mi`],
//                     ["0-60", `${car.acceleration}s`],
//                     ["Power", `${car.horsepower} hp`],
//                     ["Top speed", `${car.topSpeed} mph`],
//                     ["Drive", car.drive],
//                   ].map(([label, value]) => (
//                     <div key={label} className="rounded-xl border border-line/70 p-3">
//                       <p className="text-muted-foreground">{label}</p>
//                       <p className="mt-1 font-semibold">{value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export function CompareTray() {
//   const { compareIds, toggleCompare } = useShowroom();
//   const [open, setOpen] = useState(false);
//   const cars = getAllCars().filter((car) => compareIds.includes(car.id));

//   if (!cars.length) return null;

//   return (
//     <>
//       <div className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-line/70 bg-card/90 backdrop-blur-xl" data-testid="compare-tray">
//         <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Compare queue</p>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {cars.map((car) => (
//                 <button key={car.id} type="button" className="rounded-full border border-line/70 px-3 py-1 text-sm" onClick={() => toggleCompare(car.id)}>
//                   {car.model}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <Button variant="secondary" className="rounded-full" onClick={() => cars.forEach((car) => toggleCompare(car.id))}>Clear</Button>
//             <Button className="rounded-full" onClick={() => setOpen(true)} disabled={cars.length < 2} data-testid="open-compare-modal">
//               <ArrowRightLeft className="mr-2 h-4 w-4" />Compare {cars.length} cars
//             </Button>
//           </div>
//         </div>
//       </div>
//       <CompareModal open={open} onOpenChange={setOpen} />
//     </>
//   );
// }
