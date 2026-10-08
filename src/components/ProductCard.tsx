import Link from "next/link";
import type { Product } from "@/Types/product";
import { productNames, unitNames } from "@/data/productNames";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link href={`/products/${product.id}`}>
      <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

        <div className="mb-4 flex items-center gap-3">
  {/* Product Icon */}
  <div className="text-4xl">
    {product.categoryIcon}
  </div>

  {/* Product Name + Unit */}
  <div>
    <h3 className="text-lg font-bold text-gray-900">
      {productNames[product.nameBn] || product.nameBn}
    </h3>

    <p className="mt-1 text-sm text-gray-500">
      {unitNames[product.unit] || product.unit}
    </p>
  </div>
</div>

        {/* Price Row */}
        <div className="mt-5 flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-500">
              Today&apos;s Price
            </p>

            <p className="text-xl font-bold text-gray-900">
              {product.today.toLocaleString("en-US")} BDT
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
  {isUp && <span className="text-red-600">▲ </span>}
  {isDown && <span className="text-green-600">▼ </span>}
  {!isUp && !isDown && <span className="text-gray-500">— </span>}

  <span className="text-gray-700">
    {product.change.pct.toLocaleString("en-US")}%
  </span>
</span>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;