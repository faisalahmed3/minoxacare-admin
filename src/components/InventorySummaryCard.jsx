import { Landmark, AlertTriangle } from 'lucide-react'

const icons = {
  account_balance: Landmark,
  warning: AlertTriangle,
}

export default function InventorySummaryCard({ title, value, icon, type, note }) {
  const isDanger = type === 'danger'
  const Icon = icons[icon] || Landmark

  return (
    <div className="col-span-12 rounded-xl border border-[#bfcaba] bg-white p-6 shadow-sm lg:col-span-4">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#40493d]">
            {title}
          </p>
          <h3 className={`mt-1 text-3xl font-bold ${isDanger ? 'text-[#ba1a1a]' : 'text-[#0d631b]'}`}>
            {value}
          </h3>
        </div>

        <div className={`rounded p-2 ${isDanger ? 'bg-[#ba1a1a]/10' : 'bg-[#0d631b]/10'}`}>
          <Icon className={isDanger ? 'text-[#ba1a1a]' : 'text-[#0d631b]'} size={24} />
        </div>
      </div>

      <p className={`text-sm ${isDanger ? 'text-[#40493d]' : 'font-bold text-[#0d631b]'}`}>
        {note}
      </p>
    </div>
  )
}