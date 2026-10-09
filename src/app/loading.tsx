
export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f2f4f0]">
      {/* Loading Header */}
      <div className="py-3 text-center">
        <p className="text-sm font-medium text-gray-600">
          Loading BazarDor...
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Fetching the latest market prices. Please wait.
        </p>
      </div>

      {/* Hero Skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-500">
              Preparing your market dashboard...
            </p>
            <div className="h-4 w-36 rounded bg-gray-300" />
            <div className="h-10 w-full max-w-lg rounded bg-gray-300" />
            <div className="h-5 w-full max-w-md rounded bg-gray-200" />
            <div className="h-11 w-36 rounded-lg bg-gray-300" />
          </div>

          <div className="h-56 rounded-2xl bg-gray-300 md:h-72" />
        </div>
      </section>

      {/* Product Sections Skeleton */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:px-6">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <p className="mb-3 text-sm text-gray-500">
              {section === 1
                ? "Loading price increases..."
                : section === 2
                  ? "Loading price decreases..."
                  : "Loading all products..."}
            </p>

            <div className="mb-5 h-7 w-64 rounded bg-gray-300" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="mb-4 h-28 rounded-lg bg-gray-200" />
                  <div className="mb-2 h-5 w-3/4 rounded bg-gray-300" />
                  <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-6 w-2/3 rounded bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Loading Footer */}
      <p className="py-6 text-center text-sm text-gray-500">
        Almost ready! Getting market prices for you.
      </p>
    </main>
  );
}