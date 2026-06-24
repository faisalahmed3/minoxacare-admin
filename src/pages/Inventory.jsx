import { PlusSquare, Download } from 'lucide-react'
import InventorySummaryCard from '../components/InventorySummaryCard'
import InventoryTable from '../components/InventoryTable'
import StockTrendChart from '../components/StockTrendChart'
import RestockCard from '../components/RestockCard'

export default function Inventory() {
  return (
    <>
      <div className="mb-8 grid grid-cols-12 gap-6">
        <InventorySummaryCard
          title="Total Inventory Value"
          value="$14,205.50"
          icon="account_balance"
          type="success"
          note="+12.4% from last month"
        />

        <InventorySummaryCard
          title="Stock Alerts"
          value="03"
          icon="warning"
          type="danger"
          note="Items below reorder point: Minoxidil 5 box and Manuals."
        />

        <div className="col-span-12 flex flex-col gap-2 lg:col-span-4">
          <button className="flex flex-1 items-center justify-between rounded-xl bg-[#0d631b] px-6 py-5 text-white hover:opacity-90">
            <span className="text-lg font-semibold">Add Stock Entry</span>
            <PlusSquare size={26} />
          </button>

          <button className="flex flex-1 items-center justify-between rounded-xl border border-[#bfcaba] bg-[#d4e5ef] px-6 py-5 text-[#004470] hover:bg-[#d9ebf5]">
            <span className="text-lg font-semibold">Export Inventory Report</span>
            <Download size={26} />
          </button>
        </div>
      </div>

      <InventoryTable />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <StockTrendChart />
        <RestockCard />
      </div>
    </>
  )
}