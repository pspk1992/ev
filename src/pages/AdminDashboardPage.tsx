import { BarChart3, CarFront, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SectionHeading } from "@/components/showroom/SectionHeading";
import { usePageTitle } from "@/hooks/use-page-title";
import { getAllCars } from "@/services/carService";
import { useShowroom } from "@/hooks/use-showroom";

const monthlySalesData = [
  { month: "Jan", sales: 18 },
  { month: "Feb", sales: 24 },
  { month: "Mar", sales: 21 },
  { month: "Apr", sales: 30 },
  { month: "May", sales: 35 },
  { month: "Jun", sales: 41 },
];

const revenueGrowthData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 148000 },
  { month: "Mar", revenue: 171000 },
  { month: "Apr", revenue: 196000 },
  { month: "May", revenue: 228000 },
  { month: "Jun", revenue: 262000 },
];

const categoryDistributionData = [
  { name: "SUV", value: 42, fill: "var(--color-suv)" },
  { name: "Sedan", value: 28, fill: "var(--color-sedan)" },
  { name: "Coupe", value: 18, fill: "var(--color-coupe)" },
  { name: "Sportback", value: 12, fill: "var(--color-sportback)" },
];

const salesChartConfig = {
  sales: {
    label: "Monthly sales",
    color: "hsl(var(--primary))",
  },
};

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--accent))",
  },
};

const categoryChartConfig = {
  suv: {
    label: "SUV",
    color: "hsl(var(--primary))",
  },
  sedan: {
    label: "Sedan",
    color: "hsl(var(--accent))",
  },
  coupe: {
    label: "Coupe",
    color: "hsl(188 48% 58%)",
  },
  sportback: {
    label: "Sportback",
    color: "hsl(210 18% 55%)",
  },
};

export default function AdminDashboardPage() {
  usePageTitle("Admin dashboard");
  const cars = getAllCars();
  const { bookings } = useShowroom();
  const stats = [
    { label: "Cars in catalog", value: cars.length, icon: CarFront },
    { label: "Booking requests", value: bookings.length, icon: Users },
    { label: "Featured cars", value: cars.filter((car) => car.featured).length, icon: BarChart3 },
  ];

  return (
    <section className="section-shell">
      <SectionHeading eyebrow="Admin UI" title="Manage showroom merchandising and lead flow." description="A frontend-only dashboard with management cards, catalog status and booking overview." />
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-panel p-6">
            <stat.icon className="mb-4 text-primary" />
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="mt-2 text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_1.1fr_0.9fr]">
        <div className="glass-panel p-6">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Bar Chart</p>
            <h3 className="mt-2 text-2xl">Monthly sales</h3>
            <p className="mt-2 text-sm text-muted-foreground">Dummy order volume across the last six months.</p>
          </div>
          <ChartContainer config={salesChartConfig} className="h-72 w-full aspect-auto">
            <BarChart data={monthlySalesData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="sales" radius={[12, 12, 4, 4]} fill="var(--color-sales)" animationDuration={900} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="glass-panel p-6">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Line Chart</p>
            <h3 className="mt-2 text-2xl">Revenue growth over time</h3>
            <p className="mt-2 text-sm text-muted-foreground">Projected showroom revenue with steady month-on-month growth.</p>
          </div>
          <ChartContainer config={revenueChartConfig} className="h-72 w-full aspect-auto">
            <LineChart data={revenueGrowthData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`} width={54} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--color-revenue)" }}
                activeDot={{ r: 7 }}
                animationDuration={1000}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="glass-panel p-6">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Pie Chart</p>
            <h3 className="mt-2 text-2xl">Category distribution</h3>
            <p className="mt-2 text-sm text-muted-foreground">Dummy inventory mix by body style.</p>
          </div>
          <ChartContainer config={categoryChartConfig} className="h-72 w-full aspect-auto">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`${value}%`, "Share"]} />} />
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              <Pie
                data={categoryDistributionData}
                dataKey="value"
                nameKey="name"
                innerRadius={56}
                outerRadius={92}
                paddingAngle={3}
                animationDuration={950}
                label={({ name, value }) => `${name} ${value}%`}
              >
                {categoryDistributionData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
      <div className="mt-8 glass-panel overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-line/70 px-6 py-4 text-sm font-semibold text-muted-foreground">
          <span>Model</span><span>Status</span><span>Promotion</span>
        </div>
        {cars.map((car) => (
          <div key={car.id} className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 px-6 py-4 text-sm border-b border-line/40 last:border-b-0">
            <span>{car.brand} {car.model}</span>
            <span>{car.availability}</span>
            <span>{car.promotion}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
