import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";

export default function ContactPage() {
  usePageTitle("Contact");
  const items = [
    { icon: Phone, label: "Phone", value: "+1 (800) 555-0188" },
    { icon: Mail, label: "Email", value: "concierge@voltshowroom.com" },
    { icon: MapPin, label: "Studio", value: "101 Electric Ave, San Francisco, CA" },
  ];

  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Contact" title="Talk to a product specialist." description="Reach out for tailored shortlist guidance, fleet consultations or premium delivery support." />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="glass-panel p-6">
            <item.icon className="mb-4 text-primary" />
            <h2 className="text-2xl">{item.label}</h2>
            <p className="mt-3 text-muted-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
