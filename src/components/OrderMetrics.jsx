import {
  AlertCircle,
  CheckCircle,
  Clock3,
  PackageCheck,
  ShoppingBag,
  Wallet,
  XCircle,
} from 'lucide-react'

export default function OrderMetrics({ orders }) {
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length
  const completeOrders = orders.filter((o) => o.status === 'Complete').length
  const notHandedOver = orders.filter((o) => o.status === 'Not Handed Over').length
  const paidOrders = orders.filter((o) => o.status === 'Payment Received').length
  const canceledOrders = orders.filter((o) => o.status === 'Canceled').length
  const totalAmount = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0)

  const metrics = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'text-[#00629e]',
      bg: 'bg-[#62b4fe]/20',
    },
    {
      title: 'Pending',
      value: pendingOrders,
      icon: Clock3,
      color: 'text-[#111111]',
      bg: 'bg-[#fff176]',
    },
    {
      title: 'Complete',
      value: completeOrders,
      icon: PackageCheck,
      color: 'text-[#001f08]',
      bg: 'bg-[#00e640]',
    },
    {
      title: 'Not Handed Over',
      value: notHandedOver,
      icon: AlertCircle,
      color: 'text-[#111111]',
      bg: 'bg-[#ff7a00]',
    },
    {
      title: 'Payment Received',
      value: paidOrders,
      icon: CheckCircle,
      color: 'text-[#1f5f91]',
      bg: 'bg-[#b9def7]',
    },
    {
      title: 'Canceled',
      value: canceledOrders,
      icon: XCircle,
      color: 'text-white',
      bg: 'bg-[#ff1f1f]',
    },
    {
      title: 'Total COD Value',
      value: formatBDT(totalAmount),
      icon: Wallet,
      color: 'text-[#0d631b]',
      bg: 'bg-[#0d631b]/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item) => {
        const Icon = item.icon

        return (
          <div key={item.title} className="rounded-xl border border-[#bfcaba] bg-white p-6">
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${item.bg}`}>
              <Icon className={item.color} size={22} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
              {item.title}
            </p>

            <h3 className="mt-1 text-3xl font-bold text-[#0d1e25]">{item.value}</h3>
          </div>
        )
      })}
    </div>
  )
}

function formatBDT(amount) {
  return `৳${Number(amount || 0).toLocaleString('en-BD')}`
}