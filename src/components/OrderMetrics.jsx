import { CheckCircle, Clock3, ShoppingBag } from 'lucide-react'

const metrics = [
  {
    title: 'Total Orders',
    value: '1,284',
    icon: ShoppingBag,
    note: '+12.5%',
    iconBox: 'bg-[#62b4fe]/20',
    color: 'text-[#00629e]',
    valueColor: 'text-[#0d631b]',
  },
  {
    title: 'Pending Orders',
    value: '42',
    icon: Clock3,
    note: 'High Priority',
    iconBox: 'bg-[#b14b6f]/10',
    color: 'text-[#923357]',
    valueColor: 'text-[#0d1e25]',
  },
  {
    title: 'Successful Deliveries',
    value: '1,242',
    icon: CheckCircle,
    note: '98% Rate',
    iconBox: 'bg-[#0d631b]/10',
    color: 'text-[#0d631b]',
    valueColor: 'text-[#0d631b]',
  },
]

export default function OrderMetrics() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {metrics.map((item) => {
        const Icon = item.icon

        return (
          <div key={item.title} className="rounded-xl border border-[#bfcaba] bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className={`rounded-full p-3 ${item.iconBox}`}>
                <Icon className={item.color} size={22} />
              </div>

              <span className={`text-xs font-bold uppercase tracking-wider ${item.color}`}>
                {item.note}
              </span>
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
              {item.title}
            </p>

            <h3 className={`mt-1 text-4xl font-bold ${item.valueColor}`}>
              {item.value}
            </h3>
          </div>
        )
      })}
    </div>
  )
}