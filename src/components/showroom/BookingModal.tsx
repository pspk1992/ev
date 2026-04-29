import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShowroom } from "@/hooks/use-showroom";
import type { BookingRequest, Car } from "@/types/showroom";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  date: z.string().min(1, "Select a preferred date"),
  city: z.string().min(2, "Enter your city"),
  note: z.string().max(200, "Keep the note under 200 characters").optional().or(z.literal("")),
  budget: z.coerce.number().min(10000, "Budget must be above $10,000"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ car, open, onOpenChange }: BookingModalProps) {
  const { addBooking } = useShowroom();
  const tomorrow = useMemo(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10), []);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { fullName: "", email: "", phone: "", date: tomorrow, city: "", note: "", budget: car?.price ?? 80000 },
  });

  if (!open || !car) return null;

  const close = () => {
    onOpenChange(false);
    reset();
  };

  const onSubmit = async (values: BookingFormValues) => {
    const parsed = bookingSchema.parse(values) as Required<BookingFormValues>;
    const payload: Omit<BookingRequest, "id" | "createdAt"> = {
      carId: car.id,
      carLabel: `${car.brand} ${car.model}`,
      fullName: parsed.fullName,
      email: parsed.email,
      phone: parsed.phone,
      date: parsed.date,
      city: parsed.city,
      note: parsed.note ?? "",
      budget: parsed.budget,
    };
    addBooking(payload);
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="glass-panel max-h-[92vh] w-full max-w-2xl overflow-auto p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Instant reservation</p>
            <h3 className="text-3xl">Book a test drive for {car.model}</h3>
            <p className="mt-2 text-muted-foreground">Our product specialists will confirm timing, route and financing options.</p>
          </div>
          <button type="button" onClick={close} className="rounded-full border border-line/70 p-2"><X className="h-4 w-4" /></button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} data-testid="booking-modal-form">
          <label><span className="field-label">Full name</span><input className="field-input" {...register("fullName")} />{errors.fullName ? <span className="mt-1 block text-sm text-destructive">{errors.fullName.message}</span> : null}</label>
          <label><span className="field-label">Email</span><input className="field-input" {...register("email")} />{errors.email ? <span className="mt-1 block text-sm text-destructive">{errors.email.message}</span> : null}</label>
          <label><span className="field-label">Phone</span><input className="field-input" {...register("phone")} />{errors.phone ? <span className="mt-1 block text-sm text-destructive">{errors.phone.message}</span> : null}</label>
          <label><span className="field-label">Preferred date</span><input className="field-input" type="date" min={tomorrow} {...register("date")} />{errors.date ? <span className="mt-1 block text-sm text-destructive">{errors.date.message}</span> : null}</label>
          <label><span className="field-label">City</span><input className="field-input" {...register("city")} />{errors.city ? <span className="mt-1 block text-sm text-destructive">{errors.city.message}</span> : null}</label>
          <label><span className="field-label">Budget</span><input className="field-input" type="number" {...register("budget")} />{errors.budget ? <span className="mt-1 block text-sm text-destructive">{errors.budget.message}</span> : null}</label>
          <label className="md:col-span-2"><span className="field-label">Notes</span><textarea className="field-input min-h-28" {...register("note")} />{errors.note ? <span className="mt-1 block text-sm text-destructive">{errors.note.message}</span> : null}</label>
          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2"><Button type="submit" disabled={isSubmitting} className="rounded-full">Confirm booking</Button><Button type="button" variant="ghost" onClick={close} className="rounded-full">Cancel</Button></div>
        </form>
      </div>
    </div>
  );
}
