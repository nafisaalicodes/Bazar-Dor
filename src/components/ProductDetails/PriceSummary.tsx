import type { Product } from "@/Types/product";

interface PriceSummaryProps {
  product: Product;
}

const PriceSummary = ({ product }: PriceSummaryProps) => {
  const minimum = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const maximum = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const average =
    product.markets.reduce(
      (total, market) =>
        total + (market.min + market.max) / 2,
      0
    ) / product.markets.length;

  return (
    <section className="mt-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Price Summary
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Minimum */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Minimum Price
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {minimum.toLocaleString("en-US")} BDT
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Lowest market price
          </p>
        </div>

        {/* Maximum */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Maximum Price
          </p>

          <p className="mt-2 text-2xl font-bold text-red-500">
            {maximum.toLocaleString("en-US")} BDT
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Highest market price
          </p>
        </div>

        {/* Average */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Average Price
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {average.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}{" "}
            BDT
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Average across all markets
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceSummary;