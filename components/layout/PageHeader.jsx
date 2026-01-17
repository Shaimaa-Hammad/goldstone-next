"use client";

export function PageHeader({ title, subtitle, actions }) {
    return (<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (<p className="text-muted-foreground mt-1">{subtitle}</p>)}
      </div>
      {actions && (<div className="flex items-center gap-3">
          {actions}
        </div>)}
    </div>);
}
