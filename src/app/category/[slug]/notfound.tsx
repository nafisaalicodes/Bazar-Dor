
import Link from "next/link";

const CategoryNotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f2f4f0] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🔍</div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          404 - Category Not Found
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Sorry, the category you are looking for does not exist
          or has no available products.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
};

export default CategoryNotFound;