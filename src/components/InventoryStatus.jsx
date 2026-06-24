import { Package } from 'lucide-react'

export default function InventoryStatus() {
  return (
    <div className="rounded border border-[#bfcaba] bg-white p-6 lg:col-span-4">
      <h3 className="mb-4 text-lg font-semibold text-[#0d1e25]">Inventory Status</h3>

      <div className="space-y-4">
        <ProgressRow label="Core Assets" value="82% Stocked" width="82%" color="bg-[#0d631b]" />

        <div>
          <ProgressRow label="High-Demand SKUs" value="12% Stocked" width="12%" color="bg-[#ba1a1a]" />
          <p className="mt-1 text-[10px] font-bold uppercase text-[#ba1a1a]">
            Action Required: Low Stock
          </p>
        </div>

        <div className="mt-6 border-t border-[#bfcaba] pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="text-[#00629e]" size={20} />
              <span className="text-sm">Total Valuation</span>
            </div>
            <span className="font-mono font-bold">$218,000.00</span>
          </div>
        </div>

        <button className="mt-6 w-full rounded border border-[#0d631b] py-2 text-sm font-bold text-[#0d631b] hover:bg-[#0d631b]/5">
          View Full Inventory
        </button>
      </div>
    </div>
  )
}

function ProgressRow({ label, value, width, color }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#d4e5ef]">
        <div className={`h-full ${color}`} style={{ width }} />
      </div>
    </div>
  )
}