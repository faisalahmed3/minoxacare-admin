import {
  ArrowLeft,
  ArrowRight,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react'

const orders = [
  {
    id: '#ORD-2604001',
    date: 'Oct 24, 2023',
    customer: 'Nrepen Mallik',
    initials: 'NM',
    product: 'Minoxidil + Roller',
    qty: '02',
    amount: '$124.50',
    status: 'Payment Received',
    statusType: 'paid',
  },
  {
    id: '#ORD-2604002',
    date: 'Oct 24, 2023',
    customer: 'Harun Bahadur',
    initials: 'HB',
    product: 'Scalp Nourishing Kit',
    qty: '01',
    amount: '$89.00',
    status: 'Pending',
    statusType: 'pending',
  },
  {
    id: '#ORD-2604003',
    date: 'Oct 23, 2023',
    customer: 'Ankit Kumar',
    initials: 'AK',
    product: 'Financial Analysis Pro',
    qty: '01',
    amount: '$499.00',
    status: 'Delivered',
    statusType: 'delivered',
  },
  {
    id: '#ORD-2603998',
    date: 'Oct 22, 2023',
    customer: 'Srijana Shrestha',
    initials: 'SS',
    product: 'Strategic Consulting Pkg',
    qty: '01',
    amount: '$1,200.00',
    status: 'Canceled',
    statusType: 'canceled',
  },
  {
    id: '#ORD-2603995',
    date: 'Oct 22, 2023',
    customer: 'Deepak Pandey',
    initials: 'DP',
    product: 'Minoxidil + Roller',
    qty: '03',
    amount: '$186.75',
    status: 'Payment Received',
    statusType: 'paid',
  },
]

export default function OrdersTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#bfcaba] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#bfcaba] bg-[#e7f6ff] text-xs font-bold uppercase tracking-wider text-[#40493d]">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Qty</th>
              <th className="px-6 py-4 text-right">Total Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#bfcaba]">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`transition-colors hover:bg-[#f1f3f4] ${
                  index % 2 === 1 ? 'bg-[#fbfdff]' : ''
                }`}
              >
                <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.date}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d631b]/10 text-[10px] font-bold text-[#0d631b]">
                      {order.initials}
                    </div>
                    <span className="font-semibold">{order.customer}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm">{order.product}</td>
                <td className="px-6 py-4 font-mono text-sm">{order.qty}</td>
                <td className="px-6 py-4 text-right font-mono text-sm font-bold text-[#0d631b]">
                  {order.amount}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge label={order.status} type={order.statusType} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2 text-[#40493d]">
                    <button className="hover:text-[#0d631b]" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="hover:text-[#00629e]" title="Edit">
                      <Pencil size={18} />
                    </button>
                    <button className="hover:text-[#ba1a1a]" title="Delete">
                      <Trash2 size={18} />
                    </button>
                    <button className="hover:text-[#0d631b]" title="More">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#bfcaba] bg-[#e7f6ff] px-6 py-4">
        <button className="flex items-center gap-2 text-sm text-[#40493d] hover:text-[#0d631b]">
          <ArrowLeft size={18} />
          Previous
        </button>

        <div className="flex gap-1">
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <span className="flex h-8 w-8 items-center justify-center text-[#40493d]">...</span>
          <PageButton>12</PageButton>
        </div>

        <button className="flex items-center gap-2 text-sm text-[#40493d] hover:text-[#0d631b]">
          Next
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

function StatusBadge({ label, type }) {
  const styles = {
    paid: 'bg-[#0d631b]/10 text-[#0d631b]',
    delivered: 'bg-[#0d631b]/10 text-[#0d631b] border border-[#0d631b]/20',
    pending: 'bg-[#d9ebf5] text-[#40493d]',
    canceled: 'bg-[#ba1a1a]/10 text-[#ba1a1a]',
  }

  return (
    <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[type]}`}>
      {label}
    </span>
  )
}

function PageButton({ children, active }) {
  return (
    <button
      className={`h-8 w-8 rounded text-sm font-bold ${
        active
          ? 'bg-[#0d631b] text-white'
          : 'text-[#40493d] hover:bg-[#d9ebf5]'
      }`}
    >
      {children}
    </button>
  )
}