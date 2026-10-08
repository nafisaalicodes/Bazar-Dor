import ProductSection from "@/components/ProductSection";
import type { Product } from "@/Types/product";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

const HomePage = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  const products: Product[] = data.products || data;

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="bg-[#f2f4f0]">
      
      <Hero />

      <div className="mx-auto max-w-7xl px-4 md:px-6">

       <ProductSection
  title={
    <>
      <span className="text-red-600">▲</span> Today’s Price Increased
    </>
  }
  products={risers}
/>

<ProductSection
  title={
    <>
      <span className="text-green-600">▼</span> Today’s Price Decreased
    </>
  }
  products={fallers}
/>

        {/* Section C */}
        <ProductSection
          title="All Products"
          subtitle={`Showing ${products.length} products`}
          products={products}
        />

      </div>

      <Footer />
    </main>
  );
};

export default HomePage;