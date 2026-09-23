export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-brand-black px-6">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-brand-yellow" />
      <div className="flex w-full max-w-sm flex-col gap-3" aria-hidden="true">
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="h-3 w-full animate-pulse rounded-full bg-white/5" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/5" />
      </div>
    </main>
  );
}
