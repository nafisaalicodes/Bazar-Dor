import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import type { Product, Market } from "@/Types/product";
import Footer from "@/components/Footer";

import {
  productNames,
  categoryNames,
  marketNames,
  divisionNames,
  unitNames,
} from "@/data/productNames";

import { auth } from "@/lib/auth";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ProductApiResponse {
  product?: Product;
}

// English category labels
const englishCategories: Record<string, string> = {
  chal: "Rice",
  rice: "Rice",
  dal: "Lentils",
  lentils: "Lentils",
  tel: "Oil",
  oil: "Oil",
  mach: "Fish",
  fish: "Fish",
  mangsho: "Meat",
  meat: "Meat",
  sobji: "Vegetables",
  vegetables: "Vegetables",
  fol: "Fruits",
  fruits: "Fruits",
  moshla: "Spices",
  spices: "Spices",
};

// Format prices consistently
const formatTaka = (amount: number) =>
  `${Number(amount.toFixed(2))} Taka`;

const ProductDetailsPage = async ({
  params,
}: ProductPageProps) => {
  const { slug } = await params;

  // 1. Check authentication on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Redirect signed-out users to the sign-in page
  if (!session) {
  redirect("/signin?reason=auth-required");
}

  // 3. Fetch product details after authentication
  let response: Response;

  try {
    response = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${encodeURIComponent(
        slug
      )}`,
      {
        cache: "no-store",
      }
    );
  } catch {
    notFound();
  }

  if (!response.ok) {
    notFound();
  }

  let data: ProductApiResponse | Product;

  try {
    data = (await response.json()) as ProductApiResponse | Product;
  } catch {
    notFound();
  }

  const product: Product =
    "product" in data && data.product
      ? data.product
      : (data as Product);

  if (!product || !product.id) {
    notFound();
  }

  // Product information
  const rawProductName = (
    product.name ||
    product.nameBn ||
    "Product"
  ).trim();

  const productName =
    productNames[rawProductName] || rawProductName;

  const category = product.category || "general";

  const displayCategory =
    englishCategories[category.toLowerCase()] ||
    categoryNames[category] ||
    englishCategories[
      (product.categoryNameBn || "").toLowerCase()
    ] ||
    category;

  const unit = product.unit || "kg";
  const displayUnit = unitNames[unit] || `per ${unit}`;

  const price = product.price ?? product.today ?? 0;

  const markets: Market[] = Array.isArray(product.markets)
    ? product.markets
    : [];

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  // Calculate prices from actual market data
  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : price;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : price;

  const marketSummary =
    markets.length > 0
      ? `${markets.length} markets available. Prices range from ${formatTaka(
          minPrice
        )} to ${formatTaka(maxPrice)} per ${unit}.`
      : product.change
        ? `Today's price has ${
            isUp
              ? "increased"
              : isDown
                ? "decreased"
                : "remained stable"
          } by ${product.change.pct}% compared with yesterday.`
        : "Today's market price information is currently available.";

  return (
    <>
      <main className="min-h-screen bg-[#f2f4f0] px-4 py-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb — category label removed */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500"
          >
            <Link href="/" className="hover:text-green-700">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-gray-800">
              {productName}
            </span>
          </nav>

          {/* Product Summary Banner */}
          <section className="mb-6 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f2f4f0] text-4xl shadow-inner">
                {product.emoji || product.categoryIcon || "🛒"}
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {productName}
                </h1>

                {/* Category label removed; unit remains */}
                <p className="mt-1 text-sm text-gray-500">
                  {displayUnit}
                </p>

                <p className="mt-2 text-sm font-medium text-gray-600">
                  {marketSummary}
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-[#f8faf7] p-4 md:min-w-[220px]">
              <p className="text-xs font-medium text-gray-400">
                Today&apos;s Price
              </p>

              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  {formatTaka(price)}
                </span>

                {product.change && (
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      isUp
                        ? "text-red-600"
                        : isDown
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {product.change.pct}%
                  </span>
                )}
              </div>

              <p className="mt-1 text-[11px] text-gray-400">
                Per {unit}
              </p>
            </div>
          </section>

          {/* Price Summary Cards */}
          <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Minimum Price */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400">
                Minimum Price
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700">
                {formatTaka(minPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Lowest price among available markets
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400">
                Maximum Price
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {formatTaka(maxPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Highest price among available markets
              </p>
            </div>

            {/* Listed Price */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400">
                Listed Price
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {formatTaka(price)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Listed product price per {unit}
              </p>
            </div>
          </section>

          {/* Market-wise Price Table */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-900">
                Marketwise Today&apos;s Price
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-400">
                    <th className="whitespace-nowrap px-6 py-3.5">
                      Market
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5">
                      Division
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5">
                      Minimum
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5">
                      Maximum
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5">
                      Average
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm">
                  {markets.length > 0 ? (
                    markets.map((market, index) => {
                      const marketName =
                        marketNames[market.market] || market.market;

                      const divisionName =
                        divisionNames[market.division] ||
                        market.division;

                      // Midpoint of the listed minimum and maximum
                      const midpoint =
                        (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market}-${market.division}-${index}`}
                          className="transition hover:bg-gray-50/50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                            {marketName}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                            {divisionName}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                            {formatTaka(market.min)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                            {formatTaka(market.max)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                            {formatTaka(midpoint)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center"
                      >
                        <p className="font-medium text-gray-700">
                          No Market Data Available
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Market-wise prices are not available for
                          this product yet.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailsPage;