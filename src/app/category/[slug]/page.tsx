
import Link from "next/link";
import { notFound } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/Types/product";
import Footer from "@/components/Footer";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

const validCategories = [
  "chal",
  "dal",
  "tel",
  "sobji",
  "mach",
  "mangsho",
  "dim-dui",
  "mosla",
];

const categoryNames: Record<string, string> = {
  chal: "Rice",
  dal: "Lentils",
  tel: "Oil",
  sobji: "Vegetables",
  mach: "Fish",
  mangsho: "Meat",
  "dim-dui": "Egg-Milk",
  mosla: "Spices",
};

const sortOptions = [
  { value: "", label: "Default" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

const CategoryPage = async ({
  params,
  searchParams,
}: CategoryPageProps) => {
  const { slug } = await params;
  const { sort } = await searchParams;

  const categoryKey = slug.toLowerCase();

  if (!validCategories.includes(categoryKey)) {
    notFound();
  }

  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : data.products ?? [];

  const categoryProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() === categoryKey
  );

  // Ignore invalid sort values and use Default.
  const activeSort =
    sort === "low" || sort === "high" ? sort : "";

  const sortedProducts = [...categoryProducts];

  if (activeSort === "low") {
    sortedProducts.sort(
      (a, b) => a.today - b.today
    );
  } else if (activeSort === "high") {
    sortedProducts.sort(
      (a, b) => b.today - a.today
    );
  }

  const categoryName = categoryNames[categoryKey];

  const selectedSort =
    sortOptions.find(
      (option) => option.value === activeSort
    ) ?? sortOptions[0];

  return (
    <>
      <main className="min-h-screen bg-[#f2f4f0] px-4 py-8 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Category Header */}
          <div className="mb-6 flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f2f4f0] text-3xl">
              {categoryProducts[0]?.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {categoryName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Today&apos;s prices and changes for{" "}
                {categoryProducts.length} products
              </p>
            </div>
          </div>

          {/* Sorting */}
          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing total{" "}
              <span className="font-semibold text-gray-800">
                {categoryProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-3">
              <label
                htmlFor="sort-dropdown"
                className="shrink-0 text-sm font-medium text-gray-600"
              >
                Sort by
              </label>

              <details className="group relative">
                <summary
                  id="sort-dropdown"
                  className="flex min-w-[205px] cursor-pointer list-none items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition hover:border-green-500 [&::-webkit-details-marker]:hidden"
                >
                  <span className="font-medium">
                    {selectedSort.label}
                  </span>

                  <svg
                    className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m6 9 6 6 6-6"
                    />
                  </svg>
                </summary>

                <div className="absolute right-0 z-50 mt-2 w-full min-w-[220px] overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
                  {sortOptions.map((option) => (
                    <Link
                      key={option.value || "default"}
                      href={
                        option.value
                          ? `/category/${categoryKey}?sort=${option.value}`
                          : `/category/${categoryKey}`
                      }
                      scroll={false}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition hover:bg-green-50 hover:text-green-700 ${
                        activeSort === option.value
                          ? "bg-green-50 font-semibold text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{option.label}</span>

                      {activeSort === option.value && (
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          </div>

          {/* Products */}
          {sortedProducts.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="text-5xl">🔍</div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No Products Found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                No products are available in this category.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Go Back Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CategoryPage;

