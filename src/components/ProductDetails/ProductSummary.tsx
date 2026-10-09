import type { Product } from "@/Types/product";
import {
  categoryNames,
  productNames,
  unitNames,
} from "@/data/productNames";

interface ProductSummaryProps {
  product: Product;
}

const ProductSummary = ({ product }: ProductSummaryProps) => {
  const productName =
    productNames[product.nameBn] || product.nameBn;

  const categoryName =
    categoryNames[product.categoryNameBn] ||
    product.categoryNameBn;

  const unitName =
    unitNames[product.unit] || product.unit;

  const priceDifference =
    product.today - product.yesterday;

  let priceMessage =
    "Price remained unchanged compared to yesterday.";

  if (priceDifference > 0) {
    priceMessage = `Price increased by ${priceDifference} BDT compared to yesterday.`;
  }

  if (priceDifference < 0) {
    priceMessage = `Price decreased by ${Math.abs(
      priceDifference
    )} BDT compared to yesterday.`;
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f2f4f0] text-4xl">
            {product.categoryIcon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {productName}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {priceMessage}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Based on {product.markets.length} local markets
            </p>

         
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {categoryName}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                Grocery
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              {unitName}
            </p>
          </div>
        </div>

       
        <div className="w-full rounded-2xl bg-[#f2f4f0] p-5 md:w-[230px]">
          <p className="text-xs font-semibold text-gray-500">
            TODAY&apos;S PRICE
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {product.today.toLocaleString("en-US")} BDT
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {unitName.toLowerCase()}
          </p>

          <span
            className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              isUp
                ? "bg-red-100 text-red-600"
                : isDown
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp && "▲ +"}
            {isDown && "▼ "}
            {!isUp && !isDown && "— "}

            {product.change.pct.toLocaleString("en-US")}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductSummary;