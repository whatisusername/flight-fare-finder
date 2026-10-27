import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { BrandLogo } from "./BrandLogo";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSignUp = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/app" },
        });
        if (error) throw error;
        if (!data.session) {
          setInfo("請到信箱點擊確認連結後再登入。Check your email to confirm.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/app", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <header className="relative mx-auto flex w-full max-w-6xl items-center px-6 py-5">
        <BrandLogo />
      </header>
      <main className="relative flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm animate-fade-up rounded-2xl border bg-card p-8 shadow-glow">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isSignUp ? "建立帳號 Sign up" : "登入 Sign in"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp ? "幾秒鐘開始追蹤機票價格。" : "歡迎回來。Welcome back."}
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="text-muted-foreground">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground">Password</span>
              <input
                type="password"
                required
                minLength={6}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </label>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {info && <p className="text-sm text-primary-glow">{info}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "…" : isSignUp ? "Sign up / 註冊" : "Sign in / 登入"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>已有帳號？ <Link to="/signin" className="text-primary-glow hover:underline">Sign in</Link></>
            ) : (
              <>還沒有帳號？ <Link to="/signup" className="text-primary-glow hover:underline">Sign up</Link></>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
