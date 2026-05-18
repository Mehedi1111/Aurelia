export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-3 w-32 bg-border rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-12">
        <div className="space-y-4">
          <div className="h-5 w-24 bg-border rounded" />
          <div className="h-10 w-3/4 bg-border rounded" />
          <div className="h-10 w-1/2 bg-border rounded" />
          <div className="h-4 w-full bg-border rounded mt-6" />
          <div className="h-4 w-5/6 bg-border rounded" />
          <div className="h-4 w-4/6 bg-border rounded" />
          <div className="h-4 w-full bg-border rounded mt-4" />
          <div className="h-4 w-3/4 bg-border rounded" />
        </div>
        <div className="hidden lg:block space-y-3">
          <div className="h-48 bg-border rounded-lg" />
          <div className="h-64 bg-border rounded-lg" />
        </div>
      </div>
    </div>
  )
}
