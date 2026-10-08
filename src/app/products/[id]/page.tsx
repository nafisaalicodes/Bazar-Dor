import Link from "next/link";
import type { Product } from "@/Types/product";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailsPage = async ({
  params,
}: ProductPageProps) => {
  const { id } = await params;

  const response = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data = await response.json();

  const product: Product = data.product || data;

  return (
    <main className="min-h-screen bg-[#f2f4f0] px-4 py-10">

      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-green-700"
        >
          ← Back to Products
        </Link>

        <div className="rounded-2xl bg-white p-6 md:p-10">

          <div className="text-7xl">
            {product.emoji}
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-2 text-gray-500">
            {product.unit}
          </p>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Today&apos;s Price
            </p>

            <p className="text-3xl font-bold text-gray-900">
              {product.price.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

        </div>

      </div>

    </main>
  );
};

export default ProductDetailsPage;