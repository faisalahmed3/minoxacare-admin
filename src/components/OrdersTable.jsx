import { CheckCircle, ExternalLink, Eye, Trash2 } from 'lucide-react'

const STATUS_OPTIONS = [
  'Pending',
  'Complete',
  'Not Handed Over',
  'Payment Received',
  'Canceled',
]

export default function OrdersTable({ orders, onDelete, onStatusChange }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#bfcaba] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1250px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#bfcaba] bg-[#e7f6ff] text-xs font-bold uppercase tracking-wider text-[#40493d]">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4 text-center">Qty</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Steadfast Parcel ID</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#bfcaba]">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`hover:bg-[#f1f3f4] ${
                  index % 2 === 1 ? 'bg-[#fbfdff]' : ''
                }`}
              >
                <td className="px-6 py-4 font-mono text-sm">#{order.id}</td>
                <td className="px-6 py-4 text-sm">{formatDate(order.date)}</td>
                <td className="px-6 py-4 font-bold">{order.customer}</td>
                <td className="px-6 py-4 font-mono text-sm">{order.phone}</td>
                <td className="px-6 py-4 text-sm">{order.product}</td>
                <td className="px-6 py-4 text-center font-mono">{order.quantity}</td>

                <td className="px-6 py-4 text-right font-mono font-bold text-[#0d631b]">
                  ${Number(order.amount).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                    className={`min-w-[155px] rounded px-2 py-1 text-xs font-bold outline-none ${statusStyle(
                      order.status
                    )}`}
                  >
                    {STATUS_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-6 py-4">
                  {order.steadfastParcelId ? (
                    <a
                      href={`https://www.steadfast.com.bd/user/consignment/${order.steadfastParcelId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded bg-[#b9def7] px-3 py-1 font-mono text-xs font-bold text-[#1f5f91] hover:underline"
                      title="Open Steadfast consignment"
                    >
                      {order.steadfastParcelId}
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-sm text-[#707a6c]">Not added</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="text-[#40493d] hover:text-[#0d631b]"
                      title="View order"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onStatusChange(order.id, 'Payment Received')}
                      className="text-[#40493d] hover:text-[#0d631b]"
                      title="Mark as payment received"
                    >
                      <CheckCircle size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(order.id)}
                      className="text-[#40493d] hover:text-[#ba1a1a]"
                      title="Delete order"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="10" className="px-6 py-10 text-center text-[#40493d]">
                  No orders found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function statusStyle(status) {
  if (status === 'Pending') return 'bg-[#fff176] text-[#111111]'
  if (status === 'Complete') return 'bg-[#00e640] text-[#001f08]'
  if (status === 'Not Handed Over') return 'bg-[#ff7a00] text-[#111111]'
  if (status === 'Payment Received') return 'bg-[#b9def7] text-[#1f5f91]'
  if (status === 'Canceled') return 'bg-[#ff1f1f] text-white'
  return 'bg-[#d9ebf5] text-[#40493d]'
}