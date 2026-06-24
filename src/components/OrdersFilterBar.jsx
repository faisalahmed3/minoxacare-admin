import { CalendarDays, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

export default function OrdersFilterBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#bfcaba] bg-white p-4">
      <div className="flex min-w-[240px] flex-1 flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-[#0d1e25]">
          <Filter size={18} className="text-[#40493d]" />
          <span>Filters:</span>
        </div>

        <select className="rounded border border-[#bfcaba] bg-[#f4faff] px-4 py-2 text-sm outline-none focus:border-[#0d631b]">
          <option>Status: All</option>
          <option>Payment Received</option>
          <option>Delivered</option>
          <option>Pending</option>
          <option>Canceled</option>
        </select>

        <select className="rounded border border-[#bfcaba] bg-[#f4faff] px-4 py-2 text-sm outline-none focus:border-[#0d631b]">
          <option>Category: All</option>
          <option>Hair Care</option>
          <option>Derma Tools</option>
          <option>Bundles</option>
        </select>

        <div className="flex items-center gap-2 rounded border border-[#bfcaba] bg-[#f4faff] px-4 py-2 text-sm">
          <CalendarDays size={17} />
          <span>Last 30 Days</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[#40493d]">Showing 1-10 of 1,284 orders</span>

        <div className="flex rounded border border-[#bfcaba]">
          <button className="p-2 hover:bg-[#e7f6ff]">
            <ChevronLeft size={18} />
          </button>

          <button className="border-l border-[#bfcaba] p-2 hover:bg-[#e7f6ff]">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}