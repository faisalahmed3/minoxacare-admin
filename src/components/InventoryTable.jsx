import { Edit, Trash2, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'

const products = [
  ['MNX-005-B', 'Minoxidil 5 box', 'Low Stock', '12 Units', '$45.00', '$540.00', 'danger'],
  ['DMR-015-R', 'Derma Roller 1.5mm', 'Healthy', '240 Units', '$8.50', '$2,040.00', 'success'],
  ['MAN-200-P', 'User Manual 200 pcs', 'Reorder', '45 Units', '$0.25', '$11.25', 'danger'],
  ['PKG-LRG-B', 'Shipping Boxes (Large)', 'Healthy', '1,200 Units', '$1.10', '$1,320.00', 'success'],
  ['SER-VIT-C', 'Vitamin C Serum 30ml', 'Pending Arrival', '85 Units', '$12.00', '$1,020.00', 'pending'],
]

export default function InventoryTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#bfcaba] bg-white shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 border-b border-[#bfcaba] px-6 py-4 sm:flex-row">
        <h4 className="text-lg font-semibold">Product Inventory Logs</h4>

        <div className="flex gap-2">
          <button className="flex items-center gap-1 rounded border border-[#bfcaba] px-3 py-1 text-sm font-bold hover:bg-[#e7f6ff]">
            <Filter size={15} />
            Filter
          </button>
          <button className="flex items-center gap-1 rounded border border-[#bfcaba] px-3 py-1 text-sm font-bold hover:bg-[#e7f6ff]">
            <ArrowUpDown size={15} />
            Sort
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#bfcaba] bg-[#dff1fb] text-[11px] font-bold uppercase tracking-wider text-[#40493d]">
              <th className="px-6 py-4">Product SKU</th>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">In Stock</th>
              <th className="px-6 py-4 text-right">Cost Per Unit</th>
              <th className="px-6 py-4 text-right">Total Value</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(([sku, name, status, stock, cost, total, type], index) => (
              <tr
                key={sku}
                className={`border-b border-[#bfcaba] hover:bg-[#f1f3f4] ${
                  index % 2 === 1 ? 'bg-[#f8f9fa]' : ''
                }`}
              >
                <td className="px-6 py-4 font-mono text-sm">{sku}</td>
                <td className="px-6 py-4 font-bold">{name}</td>
                <td className="px-6 py-4">
                  <StatusBadge label={status} type={type} />
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm">{stock}</td>
                <td className="px-6 py-4 text-right font-mono text-sm">{cost}</td>
                <td className="px-6 py-4 text-right font-mono text-sm font-bold">{total}</td>
                <td className="px-6 py-4 text-center">
                  <button className="p-1 hover:text-[#0d631b]">
                    <Edit size={18} />
                  </button>
                  <button className="ml-2 p-1 hover:text-[#ba1a1a]">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#bfcaba] px-6 py-4">
        <p className="text-sm text-[#40493d]">Showing 5 of 42 products</p>

        <div className="flex gap-1">
          <button className="rounded border border-[#bfcaba] p-1 hover:bg-[#e7f6ff]">
            <ChevronLeft size={18} />
          </button>
          <button className="rounded bg-[#0d631b] px-3 py-1 text-sm font-bold text-white">1</button>
          <button className="rounded border border-[#bfcaba] px-3 py-1 text-sm font-bold hover:bg-[#e7f6ff]">2</button>
          <button className="rounded border border-[#bfcaba] px-3 py-1 text-sm font-bold hover:bg-[#e7f6ff]">3</button>
          <button className="rounded border border-[#bfcaba] p-1 hover:bg-[#e7f6ff]">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ label, type }) {
  const styles = {
    success: 'bg-[#0d631b]/10 text-[#0d631b]',
    danger: 'bg-[#ba1a1a]/10 text-[#ba1a1a]',
    pending: 'bg-[#7f2448]/10 text-[#7f2448]',
  }

  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${styles[type]}`}>
      {label}
    </span>
  )
}