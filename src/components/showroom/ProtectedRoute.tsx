import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShowroom } from "@/hooks/use-showroom";
import type { UserRole } from "@/types/showroom";

interface ProtectedRouteProps extends PropsWithChildren {
  allow: UserRole[];
  title: string;
}

export function ProtectedRoute({ allow, children, title }: ProtectedRouteProps) {
  const { role, signInAs } = useShowroom();

  if (allow.includes(role)) {
    return <>{children}</>;
  }

  return (
    <section className="section-shell">
      <div className="mx-auto max-w-2xl glass-panel p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
          <ShieldCheck />
        </div>
        <p className="eyebrow mb-4">Protected preview</p>
        <h1 className="mb-4 text-4xl">{title} requires a demo role</h1>
        <p className="mx-auto mb-8 max-w-xl text-balance text-muted-foreground">
          This is a UI-only guard for the showroom demo. Sign in as a customer or admin to preview the restricted interface.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => signInAs("user")}>Continue as Customer</Button>
          <Button variant="secondary" onClick={() => signInAs("admin")}>Continue as Admin</Button>
          <Button variant="ghost" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
