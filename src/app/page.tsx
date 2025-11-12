"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const greetings = useMemo(
    () => [
      "Hi there",
      "Hey friend",
      "Welcome aboard",
      "It’s great to see you",
      "Howdy",
      "Hello world",
    ],
    []
  );

  const nextGreeting = () => {
    setGreetingIdx((idx) => (idx + 1) % greetings.length);
  };

  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const period =
    hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";

  const displayName = name.trim() ? name.trim() : "there";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-violet-100 px-4 py-16 text-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-black dark:text-slate-100">
      <div className="pointer-events-none absolute -z-10 aspect-square w-[60vw] max-w-5xl animate-pulse rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />
      <main className="w-full max-w-3xl rounded-3xl border border-white/60 bg-white/70 p-10 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Little Greeting Studio
        </span>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl">
          {greetings[greetingIdx]}{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {displayName}!
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Drop your name below and let this playful greeting board brighten your
          {` ` + period}. Tap the spark to remix the mood.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Alex"
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-medium text-slate-900 shadow-inner outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/60"
            />
          </label>
          <button
            type="button"
            onClick={nextGreeting}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-transparent bg-slate-900 px-6 py-4 text-base font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent hover:scale-[1.01] active:scale-[0.99] dark:bg-blue-500 dark:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <SparkleEmoji />
              Remix greeting
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>

        <div className="mt-12 grid gap-6 rounded-3xl border border-slate-200/70 bg-white/70 p-6 text-sm text-slate-600 shadow-lg dark:border-slate-700/60 dark:bg-black/30 dark:text-slate-300 sm:grid-cols-3">
          <StatCard label="Current vibe" value={period} accent="bg-amber-300" />
          <StatCard
            label="Local time"
            value={`${hours % 12 || 12}:${minutes}:${seconds}`}
            accent="bg-sky-300"
          />
          <StatCard
            label="Greeting count"
            value={`${greetingIdx + 1} / ${greetings.length}`}
            accent="bg-rose-300"
          />
        </div>

        <footer className="mt-12 text-xs text-slate-500 dark:text-slate-400">
          Need more cheer? Refresh the page or share the link.
        </footer>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-100/80 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
        <span className={`h-2 w-2 rounded-full ${accent}`} />
        {label}
      </div>
      <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </div>
    </div>
  );
}

function SparkleEmoji() {
  return (
    <span
      aria-hidden
      className="inline-flex h-6 w-6 items-center justify-center text-lg"
    >
      ✨
    </span>
  );
}
