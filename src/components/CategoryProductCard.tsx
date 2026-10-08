import Link from "next/link";

import type { Product } from "@/Types/product";

import {
  productNames,
  unitNames,
} from "@/data/productNames";

interface CategoryProductCardProps {
  product: Product;
}

const CategoryProductCard = ({
  product,
}: CategoryProductCardProps) => {
  const name =
    productNames[product.nameBn] ||
    product.nameBn;

  const unit =
    unitNames[product.unit] ||
    product.unit;

  const isUp = product.change.dir === "up";
  const isDown =
    product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block"
    >
      <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        {/* Product top */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f2f4f0] text-3xl">
            {product.categoryIcon}
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900">
              {name}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {unit}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">
              Today&apos;s Price
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {product.today.toLocaleString("en-US")}{" "}
              <span className="text-sm font-normal text-gray-600">
                BDT
              </span>
            </p>
          </div>

          {/* Change badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isUp
                ? "bg-red-50 text-red-600"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp && "▲ "}
            {isDown && "▼ "}
            {!isUp && !isDown && "— "}

            {product.change.pct.toLocaleString(
              "en-US"
            )}
            %
          </span>
        </div>
      </article>
    </Link>
  );
};

export default CategoryProductCard;