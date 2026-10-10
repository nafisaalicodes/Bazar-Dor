
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import type { Category, Product } from "@/Types/product";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          fetch("https://api.abcz.workers.dev/api/bazardor/categories"),
          fetch("https://api.abcz.workers.dev/api/bazardor/products"),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Failed to load navigation data.");
        }

        const categoryData: Category[] = await categoryResponse.json();
        const productData: Product[] = await productResponse.json();

        setCategories(categoryData);
        setProducts(productData);

        if (categoryData.length > 0) {
          setActiveCategory(categoryData[0].id);
        }
      } catch (error) {
        console.error("Navbar data error:", error);
      }
    };

    getData();
  }, []);

  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      chal: "Rice",
      dal: "Lentils",
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


const handleSignOut = async () => {
  try {
    setSigningOut(true);

    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Unable to sign out.");
      return;
    }

    setMenuOpen(false);

    toast.success("Signed out successfully!");

    router.replace("/signin");
    router.refresh();
  } catch {
    toast.error("Something went wrong while signing out.");
  } finally {
    setSigningOut(false);
  }
};



  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const user = session?.user;
  useEffect(() => {
  if (session?.user) {
    console.log("Session email:", session.user.email);
    console.log("Session image:", session.user.image);
  }
}, [session]);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
     
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
      
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor"
              width={18}
              height={18}
            />
          </div>

          <div>
            <h1 className="text-[15px] font-bold leading-tight text-gray-900">
              Bazar Dor
            </h1>

            <p className="text-[8px] text-gray-500">{today}</p>
          </div>
        </Link>

        
        <div className="flex items-center gap-2">
          {isPending ? (
            <div
              className="h-9 w-9 animate-pulse rounded-full bg-gray-200"
              aria-label="Loading account"
            />
          ) : user ? (
            <div className="relative" ref={profileMenuRef}>
              
              <button
  type="button"
  onClick={() => setMenuOpen((open) => !open)}
  className="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-gray-100"
  aria-label="Open profile menu"
  aria-expanded={menuOpen}
>
  {user.image ? (
    <Image
      src={user.image}
      alt="Profile"
      width={36}
      height={36}
      unoptimized
      className="h-9 w-9 rounded-full border border-gray-200 object-cover"
    />
  ) : (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
      {user.name?.trim().charAt(0).toUpperCase() || "U"}
    </span>
  )}

  <span className="max-w-28 truncate text-sm font-medium text-gray-800">
    {user.name || "My Account"}
  </span>

  <span className="text-xs text-gray-500" aria-hidden="true">
    ▾
  </span>
</button>

              
              {menuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                  <div className="border-b border-gray-100 px-2 pb-3">
                    <p className="break-words text-sm font-semibold text-gray-900">
                      {user.name || "User"}
                    </p>

                    <p className="mt-1 break-all text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/Profile"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                  >
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signingOut ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-xs text-gray-600 hover:text-green-600"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      
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

