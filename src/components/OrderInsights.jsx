import { Info, TrendingUp } from 'lucide-react'

export default function OrderInsights({ orders = [], filteredOrders = [] }) {
  const paymentReceivedOrders = orders.filter(
    (order) => order.status === 'Payment Received'
  )

  const paymentReceivedValue = paymentReceivedOrders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  )

  const totalOrderValue = orders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  )

  const averageOrder =
    orders.length > 0 ? totalOrderValue / orders.length : 0

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex gap-4 rounded-xl border border-[#bfcaba]/40 bg-[#dff1fb] p-6 lg:col-span-2">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d631b]/10 text-[#0d631b]">
          <Info size={28} />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-[#0d1e25]">
            Order Data Insight
          </h4>

          <p className="mt-2 leading-relaxed text-[#40493d]">
            Orders are filtered by exact calendar date and sorted newest first.
            Product filter supports <b>Minoxidil</b>, <b>Derma Rollar</b>, and{' '}
            <b>Minoxidil + Derma Rollar</b>. Showing{' '}
            <b>{filteredOrders.length}</b> matching orders from{' '}
            <b>{orders.length}</b> total records.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-[#2e7d32] p-6 text-[#cbffc2] shadow-lg">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">
          Payment Received Value
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          ৳{paymentReceivedValue.toLocaleString()}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold">
          <TrendingUp size={18} />
          <span>Average order: ৳{averageOrder.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}