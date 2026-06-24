import { Landmark, PlusCircle, TrendingDown, TrendingUp } from 'lucide-react'

const logs = [
  {
    title: 'Ad Run Increase',
    meta: 'Oct 12, 14:20 • Marcus V.',
    amount: '+$15,000.00',
    type: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Logistics Rebalance',
    meta: 'Oct 11, 09:15 • Sarah L.',
    amount: '-$2,400.00',
    type: 'down',
    icon: TrendingDown,
  },
  {
    title: 'Quarterly Top-up',
    meta: 'Oct 08, 16:45 • Automated',
    amount: '+$100,000.00',
    type: 'neutral',
    icon: Landmark,
  },
  {
    title: 'Initial Allocation',
    meta: 'Sep 30, 08:00 • System',
    amount: '$314,749.50 base',
    type: 'base',
    icon: PlusCircle,
  },
]

export default function BudgetAuditTrail() {
  return (
    <section className="col-span-12 overflow-hidden rounded-xl border border-[#bfcaba] bg-white lg:col-span-4">
      <div className="border-b border-[#bfcaba] bg-[#e7f6ff] p-6">
        <h4 className="text-lg font-semibold">Audit Trail</h4>
        <p className="text-sm text-[#40493d]">Recent budget modifications</p>
      </div>

      <div className="max-h-[480px] overflow-y-auto">
        {logs.map((log, index) => {
          const Icon = log.icon

          return (
            <div
              key={log.title}
              className={`border-b border-[#bfcaba] p-4 hover:bg-[#dff1fb] ${
                index % 2 === 1 ? 'bg-[#f8f9fa]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${getIconStyle(log.type)}`}>
                  <Icon size={18} />
                </div>

                <div>
                  <p className="font-bold">{log.title}</p>
                  <p className="text-sm text-[#40493d]">{log.meta}</p>
                  <p className={`mt-1 font-mono font-bold ${getAmountStyle(log.type)}`}>
                    {log.amount}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-[#bfcaba] bg-[#e7f6ff] p-4 text-center">
        <button className="text-xs font-bold uppercase tracking-wider text-[#00629e] hover:underline">
          View Full Audit Log
        </button>
      </div>
    </section>
  )
}

function getIconStyle(type) {
  if (type === 'up') return 'bg-[#0d631b]/10 text-[#0d631b]'
  if (type === 'down') return 'bg-[#ba1a1a]/10 text-[#ba1a1a]'
  return 'bg-[#62b4fe]/20 text-[#00629e]'
}

function getAmountStyle(type) {
  if (type === 'up') return 'text-[#0d631b]'
  if (type === 'down') return 'text-[#ba1a1a]'
  return 'text-[#40493d]'
}