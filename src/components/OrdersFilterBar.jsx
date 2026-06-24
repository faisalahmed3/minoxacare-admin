import { useRef } from 'react'
import { CalendarDays, Search, X } from 'lucide-react'

const STATUS_OPTIONS = [
  'All',
  'Pending',
  'Complete',
  'Not Handed Over',
  'Payment Received',
  'Canceled',
]

const PRODUCT_OPTIONS = [
  'All',
  'Minoxidil',
  'Derma Rollar',
  'Minoxidil + Derma Rollar',
]

export default function OrdersFilterBar({
  search,
  setSearch,
  status,
  setStatus,
  product,
  setProduct,
  date,
  setDate,
}) {
  const dateInputRef = useRef(null)

  function openDatePicker() {
    const input = dateInputRef.current

    if (!input) return

    if (typeof input.showPicker === 'function') {
      input.showPicker()
    } else {
      input.focus()
      input.click()
    }
  }

  return (
    <div className="rounded-xl border border-[#bfcaba] bg-white p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707a6c]"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order, customer, phone..."
            className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] py-2 pl-10 pr-4 outline-none focus:border-[#0d631b]"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
        >
          {STATUS_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item === 'All' ? 'Status: All' : item}
            </option>
          ))}
        </select>

        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
        >
          {PRODUCT_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item === 'All' ? 'Product: All' : item}
            </option>
          ))}
        </select>

        <div className="relative">
          <input
            ref={dateInputRef}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onClick={openDatePicker}
            className="w-full cursor-pointer rounded-lg border border-[#bfcaba] bg-[#f4faff] py-2 pl-4 pr-20 outline-none focus:border-[#0d631b]"
          />

          {date && (
            <button
              type="button"
              onClick={() => setDate('')}
              className="absolute right-10 top-1/2 -translate-y-1/2 rounded p-1 text-[#707a6c] hover:bg-[#d9ebf5] hover:text-[#0d1e25]"
              title="Clear date"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={openDatePicker}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#0d631b] hover:bg-[#d9ebf5]"
            title="Open calendar"
          >
            <CalendarDays size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}