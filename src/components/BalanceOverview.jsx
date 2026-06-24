import { TrendingUp } from 'lucide-react'

export default function BalanceOverview() {
  return (
    <section className="rounded-xl border border-[#bfcaba] bg-white p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#40493d]">
            Current Bank Balance
          </p>

          <h3 className="text-4xl font-bold text-[#0d631b]">$428,950.00</h3>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[#0d631b]/10 px-2 py-1 text-sm font-bold text-[#0d631b]">
              <TrendingUp size={16} />
              +12.4%
            </span>
            <span className="text-sm text-[#40493d]">vs last month</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 text-right">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#40493d]">
              Available Funds
            </p>
            <p className="font-mono text-lg font-bold">$114,200.50</p>
          </div>

          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#40493d]">
              Allocated Funds
            </p>
            <p className="font-mono text-lg font-bold">$314,749.50</p>
          </div>
        </div>
      </div>
    </section>
  )
}