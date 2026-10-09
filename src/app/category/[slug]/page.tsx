
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

const CategoryPage = async ({
  params,
  searchParams,
}: CategoryPageProps) => {
  const { slug } = await params;
  const { sort } = await searchParams;

  const categoryKey = slug.toLowerCase();

  // Check whether the category exists
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

  const products: Product[] = data.products || data;

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category === categoryKey
  );

  // Sort products by today's price
  const sortedProducts = [...categoryProducts];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const categoryName = categoryNames[categoryKey];

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
          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white px-6 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-500">
              Showing total{" "}
              <span className="font-semibold text-gray-800">
                {categoryProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                Sort by:
              </span>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/category/${slug}`}
                  className={`rounded-lg border px-4 py-1.5 text-sm ${
                    !sort
                      ? "border-gray-300 bg-gray-100 font-semibold text-gray-900"
                      : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
                  Default
                </Link>

                <Link
                  href={`/category/${slug}?sort=low`}
                  className={`rounded-lg border px-4 py-1.5 text-sm ${
                    sort === "low"
                      ? "border-gray-300 bg-gray-100 font-semibold text-gray-900"
                      : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
                  Price: Low to High
                </Link>

                <Link
                  href={`/category/${slug}?sort=high`}
                  className={`rounded-lg border px-4 py-1.5 text-sm ${
                    sort === "high"
                      ? "border-gray-300 bg-gray-100 font-semibold text-gray-900"
                      : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
                  Price: High to Low
                </Link>
              </div>
            </div>
          </div>

          {/* Products */}
          {categoryProducts.length === 0 ? (
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

