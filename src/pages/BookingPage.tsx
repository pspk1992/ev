import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import { useShowroom } from "@/hooks/use-showroom";
import type { BookingRequest } from "@/types/showroom";

const formSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  date: z.string().min(1, "Select a date"),
  city: z.string().min(2, "Enter your city"),
  carLabel: z.string().min(2, "Enter the car you want"),
  budget: z.coerce.number().min(10000, "Budget must be above $10,000"),
  note: z.string().max(200, "Keep the note under 200 characters").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingPage() {
  usePageTitle("Booking");
  const { addBooking } = useShowroom();
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", phone: "", date: tomorrow, city: "", carLabel: "Tesla Model S Plaid", budget: 90000, note: "" },
  });

  const onSubmit = (values: FormValues) => {
    const parsed = formSchema.parse(values) as Required<FormValues>;
    const payload: Omit<BookingRequest, "id" | "createdAt"> = {
      fullName: parsed.fullName,
      email: parsed.email,
      phone: parsed.phone,
      date: parsed.date,
      city: parsed.city,
      carLabel: parsed.carLabel,
      budget: parsed.budget,
      note: parsed.note ?? "",
    };
    addBooking(payload);
  };

  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Book a drive" title="Reserve a premium EV consultation and test drive." description="Reactive validation, quick handoff and concierge-level follow-up — all in one clean form." />
      <div className="mx-auto max-w-4xl glass-panel p-6 md:p-8">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} data-testid="booking-page-form">
          <label><span className="field-label">Full name</span><input className="field-input" {...register("fullName")} data-testid="booking-name" />{errors.fullName ? <span className="mt-1 block text-sm text-destructive">{errors.fullName.message}</span> : null}</label>
          <label><span className="field-label">Email</span><input className="field-input" {...register("email")} data-testid="booking-email" />{errors.email ? <span className="mt-1 block text-sm text-destructive">{errors.email.message}</span> : null}</label>
          <label><span className="field-label">Phone</span><input className="field-input" {...register("phone")} />{errors.phone ? <span className="mt-1 block text-sm text-destructive">{errors.phone.message}</span> : null}</label>
          <label><span className="field-label">Preferred date</span><input className="field-input" type="date" min={tomorrow} {...register("date")} />{errors.date ? <span className="mt-1 block text-sm text-destructive">{errors.date.message}</span> : null}</label>
          <label><span className="field-label">City</span><input className="field-input" {...register("city")} />{errors.city ? <span className="mt-1 block text-sm text-destructive">{errors.city.message}</span> : null}</label>
          <label><span className="field-label">Car of interest</span><input className="field-input" {...register("carLabel")} />{errors.carLabel ? <span className="mt-1 block text-sm text-destructive">{errors.carLabel.message}</span> : null}</label>
          <label className="md:col-span-2"><span className="field-label">Budget</span><input className="field-input" type="number" {...register("budget")} />{errors.budget ? <span className="mt-1 block text-sm text-destructive">{errors.budget.message}</span> : null}</label>
          <label className="md:col-span-2"><span className="field-label">Notes</span><textarea className="field-input min-h-28" {...register("note")} />{errors.note ? <span className="mt-1 block text-sm text-destructive">{errors.note.message}</span> : null}</label>
          <div className="md:col-span-2"><Button type="submit" className="rounded-full" data-testid="submit-booking">Submit request</Button></div>
        </form>
      </div>
    </section>
  );
}
