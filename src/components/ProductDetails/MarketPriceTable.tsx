import type { Product } from "@/Types/product";
import {
  divisionNames,
  marketNames,
} from "@/data/productNames";

interface MarketPriceTableProps {
  product: Product;
}

const MarketPriceTable = ({
  product,
}: MarketPriceTableProps) => {
  return (
    <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm md:p-7">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          Market-wise Today&apos;s Price
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Today&apos;s price information from different local markets.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                Market
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                Division
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                Minimum
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                Maximum
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                Average
              </th>
            </tr>
          </thead>

          <tbody>
            {product.markets.map((market) => {
              const average =
                (market.min + market.max) / 2;

              const marketName =
                marketNames[market.market] ||
                market.market;

              const divisionName =
                divisionNames[market.division] ||
                market.division;

              return (
                <tr
                  key={`${market.market}-${market.division}`}
                  className="border-b border-gray-100 transition hover:bg-[#f8faf7]"
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">
                    {marketName}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-500">
                    {divisionName}
                  </td>

                  <td className="px-4 py-4 text-right text-sm text-gray-700">
                    {market.min.toLocaleString("en-US")} BDT
                  </td>

                  <td className="px-4 py-4 text-right text-sm text-gray-700">
                    {market.max.toLocaleString("en-US")} BDT
                  </td>

                  <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                    {average.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    BDT
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MarketPriceTable;