import { BarChart3, ShoppingCart, TrendingUp } from 'lucide-react'

const cards = [
  {
    title: 'Monthly Revenue',
    value: '$42,850.00',
    note: '+12.5% vs last month',
    icon: TrendingUp,
    valueColor: 'text-[#0d631b]',
    noteColor: 'text-[#0d631b]',
  },
  {
    title: 'Total Orders',
    value: '1,284',
    note: '+4.2% growth rate',
    icon: ShoppingCart,
    valueColor: 'text-[#0d1e25]',
    noteColor: 'text-[#0d631b]',
  },
  {
    title: 'Average Order Value',
    value: '$33.37',
    note: '-1.8% market variance',
    icon: BarChart3,
    valueColor: 'text-[#0d1e25]',
    noteColor: 'text-[#ba1a1a]',
  },
]

export default function CashflowSummary() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div key={card.title} className="rounded-xl border border-[#bfcaba] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#40493d]/70">
                {card.title}
              </span>
              <Icon className="text-[#0d631b]" size={22} />
            </div>

            <div className={`text-3xl font-bold ${card.valueColor}`}>{card.value}</div>

            <p className={`mt-2 text-sm font-bold ${card.noteColor}`}>{card.note}</p>
          </div>
        )
      })}
    </div>
  )
}