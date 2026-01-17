export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-48 rounded-md bg-muted" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-20 rounded-xl bg-muted/60" />
        <div className="h-20 rounded-xl bg-muted/60" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded-md bg-muted/50" />
        <div className="h-4 w-11/12 rounded-md bg-muted/50" />
        <div className="h-4 w-10/12 rounded-md bg-muted/50" />
        <div className="h-4 w-9/12 rounded-md bg-muted/50" />
      </div>
      <div className="h-56 rounded-xl bg-muted/60" />
    </div>
  );
}
