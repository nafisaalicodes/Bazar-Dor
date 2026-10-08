interface CategoryHeaderProps {
  name: string;
  icon: string;
  productCount: number;
}

const CategoryHeader = ({
  name,
  icon,
  productCount,
}: CategoryHeaderProps) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm md:px-6">
      <div className="flex items-center gap-4">
        <div className="text-4xl">
          {icon}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {name}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {productCount} products available today
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeader;