import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";

export default function AboutPage() {
  usePageTitle("About");
  return (
    <section className="section-shell">
      <SectionHeading eyebrow="About Volt" title="A digital showroom concept for modern electric luxury." description="Volt is designed like a premium retail experience: editorial hero moments, precise filters and a sales flow that feels calm, fast and high-trust." />
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ["Curated", "Only premium electric models with strong design, performance and ownership appeal."],
          ["Responsive", "Optimized for mobile, tablet and widescreen showroom browsing."],
          ["Scalable", "Modular routes, reusable components and clean mock-service architecture."],
        ].map(([title, text]) => (
          <div key={title} className="glass-panel p-6"><h2 className="text-2xl">{title}</h2><p className="mt-3 text-muted-foreground">{text}</p></div>
        ))}
      </div>
    </section>
  );
}
