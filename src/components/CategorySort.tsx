"use client";
interface CategorySortProps {
  currentSort: string;
}

const CategorySort = ({
  currentSort,
}: CategorySortProps) => {
  return (
    <section className="mt-5 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex justify-end">
        <form className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-sm text-gray-500"
          >
            Sort:
          </label>

          <select
            id="sort"
            name="sort"
            defaultValue={currentSort}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-500"
            onChange={(event) => {
              const value = event.target.value;

              const url = new URL(
                window.location.href
              );

              if (value === "default") {
                url.searchParams.delete("sort");
              } else {
                url.searchParams.set("sort", value);
              }

              window.location.href = url.toString();
            }}
          >
            <option value="default">
              Default
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>
          </select>
        </form>
      </div>
    </section>
  );
};

export default CategorySort;