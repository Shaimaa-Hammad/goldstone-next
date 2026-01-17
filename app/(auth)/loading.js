export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-7 w-36 rounded-md bg-muted" />
          <div className="h-4 w-2/3 rounded-md bg-muted/70" />
          <div className="space-y-3">
            <div className="h-10 rounded-lg bg-muted/60" />
            <div className="h-10 rounded-lg bg-muted/60" />
          </div>
          <div className="h-10 rounded-lg bg-muted/60" />
          <div className="h-4 w-1/2 rounded-md bg-muted/70" />
        </div>
      </div>
    </div>
  );
}
