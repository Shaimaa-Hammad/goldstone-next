export default function Loading() {
  return (
    <div className="w-full px-6 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-9 w-2/3 max-w-xl rounded-md bg-muted" />
        <div className="h-4 w-1/2 max-w-md rounded-md bg-muted/70" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-xl bg-muted/60" />
          <div className="h-40 rounded-xl bg-muted/60" />
          <div className="h-40 rounded-xl bg-muted/60" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-52 rounded-xl bg-muted/60" />
          <div className="h-52 rounded-xl bg-muted/60" />
        </div>
      </div>
    </div>
  );
}
