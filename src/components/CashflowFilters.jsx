import { Download, Filter } from 'lucide-react'

export default function CashflowFilters() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-[#bfcaba] bg-white p-4 md:flex-row">
      <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
        <Field label="Month">
          <select className="min-w-[130px] rounded border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]">
            <option>June 2024</option>
            <option>May 2024</option>
            <option>April 2024</option>
          </select>
        </Field>

        <Field label="Status">
          <select className="min-w-[160px] rounded border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]">
            <option>All Statuses</option>
            <option>Payment Received</option>
            <option>Canceled</option>
            <option>Pending</option>
          </select>
        </Field>
      </div>

      <div className="flex w-full gap-2 md:w-auto">
        <button className="flex flex-1 items-center justify-center gap-2 rounded border border-[#0d631b] px-6 py-2 font-bold text-[#0d631b] hover:bg-[#e7f6ff] md:flex-none">
          <Filter size={18} />
          Advanced
        </button>

        <button className="flex flex-1 items-center justify-center gap-2 rounded bg-[#0d631b] px-6 py-2 font-bold text-white hover:opacity-90 md:flex-none">
          <Download size={18} />
          Export Monthly Report
        </button>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-[#0d1e25]">{label}</label>
      {children}
    </div>
  )
}