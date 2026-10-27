import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Radar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your flight route tracking dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/signin", replace: true });
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <BrandLogo />
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-accent"
        >
          <LogOut className="h-4 w-4" /> Sign out / 登出
        </button>
      </header>
      <main className="relative mx-auto max-w-3xl px-6 pt-16">
        <div className="animate-fade-up">
          <h1 className="break-all text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi <span className="text-gradient">{user.email}</span>
          </h1>
          <div className="mt-8 rounded-2xl border bg-card p-8">
            <Radar className="h-8 w-8 text-primary-glow" />
            <p className="mt-4 text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in the next milestone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
