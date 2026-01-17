export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-40 rounded-md bg-muted" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-28 rounded-xl bg-muted/60" />
        <div className="h-28 rounded-xl bg-muted/60" />
        <div className="h-28 rounded-xl bg-muted/60" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded-md bg-muted/50" />
        <div className="h-4 w-5/6 rounded-md bg-muted/50" />
        <div className="h-4 w-4/6 rounded-md bg-muted/50" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-52 rounded-xl bg-muted/60" />
        <div className="h-52 rounded-xl bg-muted/60" />
      </div>
    </div>
  );
}
