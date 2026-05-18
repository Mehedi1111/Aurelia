export default function PostLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 animate-pulse">
      <div className="h-3 w-48 bg-border rounded mb-6" />
      <div className="aspect-square sm:aspect-[2/1] bg-border rounded-xl mb-8" />
      <div className="h-3 w-24 bg-border rounded mb-3" />
      <div className="h-9 w-3/4 bg-border rounded mb-2" />
      <div className="h-9 w-1/2 bg-border rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-12 mt-8">
        <div className="space-y-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`h-4 bg-border rounded ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
        <div className="hidden lg:block space-y-3">
          <div className="h-48 bg-border rounded-lg" />
          <div className="h-64 bg-border rounded-lg" />
        </div>
      </div>
    </div>
  )
}
