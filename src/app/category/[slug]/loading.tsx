
const CategoryLoading = () => {
  return (
    <main className="min-h-screen bg-[#f2f4f0]">
      <div className="mx-auto max-w-[920px] px-4 py-6 md:px-6 md:py-8">
        {/* Category skeleton */}
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gray-200" />

            <div>
              <div className="h-6 w-32 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-48 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Sort skeleton */}
        <div className="mt-5 flex justify-end rounded-2xl border border-gray-200 bg-white px-5 py-4">
          <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200" />
        </div>

        {/* Product skeleton */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gray-200" />

                <div>
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <div>
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="mt-2 h-6 w-24 rounded bg-gray-200" />
                </div>

                <div className="h-6 w-14 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Loading products...
        </p>
      </div>
    </main>
  );
};

export default CategoryLoading;