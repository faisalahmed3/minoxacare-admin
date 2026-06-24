import { MoreVertical } from 'lucide-react'

const transactions = [
  ['#ORD-7291', 'June 12, 2024', 'Liam Henderson', 'Enterprise SaaS Subscription', '$1,250.00', 'Payment Received', 'paid'],
  ['#ORD-6842', 'June 11, 2024', 'Sarah Jenkins', 'Standard Analytics Module', '$450.00', 'Canceled', 'canceled'],
  ['#ORD-5521', 'June 10, 2024', 'Avery Chen', 'Premium Security Suite', '$890.00', 'Payment Received', 'paid'],
  ['#ORD-4412', 'June 08, 2024', 'Marcus Thorne', 'Custom API Integration', '$3,400.00', 'Payment Received', 'paid'],
  ['#ORD-3910', 'June 07, 2024', 'Elena Rodriguez', 'Data Export Tools', '$125.00', 'Pending', 'pending'],
]

export default function TransactionsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#bfcaba] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#bfcaba] p-4">
        <h3 className="text-lg font-semibold">Recent Transactions Log</h3>
        <span className="text-sm text-[#40493d]/70">Showing 15 of 248 records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-[#bfcaba] bg-[#e7f6ff]">
            <tr className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3 text-right">COD Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#bfcaba]">
            {transactions.map(([id, date, customer, product, amount, status, type], index) => (
              <tr
                key={id}
                className={`transition-colors hover:bg-[#e7f6ff] ${index % 2 === 1 ? 'bg-[#f8f9fa]' : ''}`}
              >
                <td className="px-4 py-4 font-mono text-sm">{id}</td>
                <td className="px-4 py-4 text-sm">{date}</td>
                <td className="px-4 py-4 font-bold">{customer}</td>
                <td className="px-4 py-4 text-sm">{product}</td>
                <td className="px-4 py-4 text-right font-mono font-bold">{amount}</td>
                <td className="px-4 py-4 text-center">
                  <StatusBadge status={status} type={type} />
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-[#707a6c] hover:text-[#0d631b]">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#bfcaba] p-4">
        <button disabled className="font-bold text-[#0d631b] opacity-50">
          Previous
        </button>

        <div className="flex gap-2">
          <Page active>1</Page>
          <Page>2</Page>
          <Page>3</Page>
          <span className="flex items-center px-1">...</span>
          <Page>12</Page>
        </div>

        <button className="font-bold text-[#0d631b] hover:underline">Next</button>
      </div>
    </div>
  )
}

function StatusBadge({ status, type }) {
  const styles = {
    paid: 'bg-[#0d631b]/10 text-[#0d631b]',
    canceled: 'bg-[#ba1a1a]/10 text-[#ba1a1a]',
    pending: 'bg-[#b14b6f]/10 text-[#923357]',
  }

  return (
    <span className={`rounded px-3 py-1 text-sm font-bold ${styles[type]}`}>
      {status}
    </span>
  )
}

function Page({ children, active }) {
  return (
    <button
      className={`h-8 w-8 rounded font-bold ${
        active ? 'bg-[#0d631b] text-white' : 'border border-[#bfcaba] hover:bg-[#e7f6ff]'
      }`}
    >
      {children}
    </button>
  )
}