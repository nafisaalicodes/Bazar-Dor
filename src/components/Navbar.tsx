"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category, Product } from "@/Types/product";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const categoryResponse = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        const productResponse = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );

        const categoryData = await categoryResponse.json();
        const productData = await productResponse.json();

        setCategories(categoryData);
        setProducts(productData);

        // First category will be active
        if (categoryData.length > 0) {
          setActiveCategory(categoryData[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      chal: "Rice",
      dal: "Dal",
      tel: "Oil",
      mosla: "Spices",
      mach: "Fish",
      mangsho: "Meat",
      sobji: "Vegetables",
      fol: "Fruits",
      "dim-dui": "Egg-Milk",
    };

    return names[category] || category;
  };

  const getProductName = (slug: string) => {
    return slug
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="w-full border-b border-gray-200 bg-white">

      {/* Top Section */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-2">

          {/* Green Logo Container */}
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor"
              width={18}
              height={18}
            />
          </div>

          {/* Name and Date */}
          <div>
            <h1 className="text-[15px] font-bold leading-tight text-gray-900">
              Bazar Dor
            </h1>

            <p className="text-[8px] text-gray-500">
              {today}
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          <Link
            href="/sign-in"
            className="text-xs text-gray-600 hover:text-green-600"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
          >
            Sign Up
          </Link>

        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4">

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              onClick={() => setActiveCategory(category.id)}
              className={`flex shrink-0 items-center gap-1 border-b-2 py-2 text-[11px] font-medium ${
                activeCategory === category.id
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600"
              }`}
            >
              <span>{category.icon}</span>

              <span>{getCategoryName(category.id)}</span>
            </Link>
          ))}

        </div>
      </nav>

      {/* Price Ticker */}
      <div className="w-full overflow-hidden border-t border-gray-100 bg-gray-50">

        <div className="flex w-max animate-marquee">

          {[...products, ...products].map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex items-center gap-1 whitespace-nowrap border-r border-gray-200 px-4 py-1.5 text-[10px]"
            >
              <span>{product.categoryIcon}</span>

              <span className="text-gray-600">
                {getProductName(product.slug)}
              </span>

              <span className="text-gray-700">
                {product.today} Taka/{product.unit}
              </span>

              {product.change.dir === "up" ? (
                <span className="font-medium text-red-500">
                  ▲ {product.change.pct}%
                </span>
              ) : (
                <span className="font-medium text-green-600">
                  ▼ {Math.abs(product.change.pct)}%
                </span>
              )}
            </div>
          ))}

        </div>
      </div>
    </header>
  );
}