import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}

export function SectionHeading({ eyebrow, title, description, align = "left", action }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2 className="text-balance text-3xl md:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
