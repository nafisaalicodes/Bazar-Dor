import type { Product } from "@/Types/product";
import ProductCard from "./ProductCard";
import type { ReactNode } from "react";

interface ProductSectionProps {
  title: ReactNode;
  subtitle?: string;
  products: Product[];
}

const ProductSection = ({
  title,
  subtitle,
  products,
}: ProductSectionProps) => {
  return (
    <section className="py-10">
      <div className="mb-6">
         <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;