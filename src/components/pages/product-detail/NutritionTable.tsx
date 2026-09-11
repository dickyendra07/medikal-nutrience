import type { NutritionItem } from "@/data/product-nutrition";

export function NutritionTable({
  title,
  items,
  color,
}: {
  title: string;
  items: NutritionItem[];
  color: string;
}) {
  const hasUnits = items.some((item) => item.unit !== undefined);

  return (
    <div className="min-w-0 rounded-[2rem] bg-white shadow-lg ring-1 ring-black/5">
      <table className="w-full table-fixed border-collapse text-sm">
        <caption
          className="rounded-t-[2rem] px-5 py-5 text-left text-base font-black text-white"
          style={{ backgroundColor: color }}
        >
          {title}
        </caption>
        <colgroup>
          <col className={hasUnits ? "w-[45%]" : "w-[35%]"} />
          <col className={hasUnits ? "w-[35%]" : "w-[65%]"} />
          {hasUnits ? <col className="w-[20%]" /> : null}
        </colgroup>
        <thead>
          <tr className="border-b border-[#eef3f0] text-left text-xs text-[#6b7280]">
            <th scope="col" className="px-3 py-3 sm:px-5">Kandungan Gizi</th>
            <th scope="col" className="px-2 py-3">Per Sajian</th>
            {hasUnits ? <th scope="col" className="px-2 py-3">Satuan</th> : null}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border-b border-[#eef3f0] align-top last:border-0 hover:bg-[#f4fbf8]">
              <th scope="row" className="break-words px-3 py-3 text-left font-bold text-[#374151] sm:px-5">
                {item.name}
              </th>
              <td className="break-words whitespace-pre-wrap px-2 py-3 font-black text-[#111827]">
                {item.value}
              </td>
              {hasUnits ? <td className="break-words px-2 py-3 text-[#6b7280]">{item.unit}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
