import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, BellRing, CalendarX } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      { name: "description", content: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops." },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      { property: "og:description", content: "Set a route and a target price — we email you when the fare drops." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Radar, title: "盯緊熱門航線", en: "Always-on route watching", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: BellRing, title: "達標自動通知", en: "Target-price email alerts", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: CalendarX, title: "隨時取消", en: "Cancel anytime", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-hero" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <BrandLogo />
        <Link
          to="/signin"
          className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90"
        >
          Sign in / 登入
        </Link>
      </header>

      <section className="relative mx-auto max-w-4xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <p className="animate-fade-up text-sm font-medium tracking-widest text-primary-glow uppercase">機票降價通知</p>
        <h1 className="mt-4 animate-fade-up text-5xl font-bold tracking-tight sm:text-7xl" style={{ animationDelay: "80ms" }}>
          Flight Price <span className="text-gradient">Notifier</span>
        </h1>
        <p className="mt-6 animate-fade-up text-xl sm:text-2xl" style={{ animationDelay: "160ms" }}>
          設定航線與目標價，機票降價就通知你
        </p>
        <p className="mt-3 animate-fade-up text-muted-foreground" style={{ animationDelay: "240ms" }}>
          Set a route and a target price — we email you when the fare drops.
        </p>
        <div className="mt-10 animate-fade-up" style={{ animationDelay: "320ms" }}>
          <Link
            to="/signup"
            className="inline-flex rounded-lg bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            免費開始 Get started
          </Link>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 120}>
              <div className="h-full rounded-2xl border bg-card p-7 transition hover:border-primary/50">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <f.icon className="h-5 w-5 text-primary-glow" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.en}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">© 2026 Flight Price Notifier</footer>
    </div>
  );
}
