import { BarChart3, Clock, TriangleAlert } from 'lucide-react'

export default function BudgetInsights() {
  const items = [
    {
      title: 'Efficiency Score',
      value: '94% Optimal',
      icon: BarChart3,
      color: 'text-[#0d631b]',
    },
    {
      title: 'Liquidity Alert',
      value: 'Low Reserve',
      icon: TriangleAlert,
      color: 'text-[#923357]',
    },
    {
      title: 'Next Cycle',
      value: '12 Days Rem.',
      icon: Clock,
      color: 'text-[#00629e]',
    },
  ]

  return (
    <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div key={item.title} className="flex items-center gap-4 rounded-xl border border-[#bfcaba] bg-white p-6">
            <div className="rounded-lg bg-[#d4e5ef] p-4">
              <Icon className={item.color} size={22} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
                {item.title}
              </p>
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}