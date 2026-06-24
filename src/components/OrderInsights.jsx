import { Info, TrendingUp } from 'lucide-react'

export default function OrderInsights() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex gap-4 rounded-xl border border-[#bfcaba]/40 bg-[#dff1fb] p-6 lg:col-span-2">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d631b]/10 text-[#0d631b]">
          <Info size={28} />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-[#0d1e25]">Optimization Tip</h4>

          <p className="mt-2 leading-relaxed text-[#40493d]">
            Your order processing time improved by <span className="font-bold text-[#0d631b]">18%</span> this month.
            Using bulk delivery more consistently can reduce fulfillment costs for frequent customers.
          </p>
        </div>
      </div>

      <div className="cursor-pointer rounded-xl bg-[#2e7d32] p-6 text-[#cbffc2] shadow-lg transition-transform hover:scale-[1.02]">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">Current Balance</p>

        <h3 className="mt-2 text-3xl font-bold">$248,500.00</h3>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold">
          <TrendingUp size={18} />
          <span>Payout scheduled for tomorrow</span>
        </div>
      </div>
    </div>
  )
}