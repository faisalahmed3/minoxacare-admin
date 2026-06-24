import {
  ExternalLink,
  NotebookPen,
  Pencil,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'

const STATUS_OPTIONS = [
  'Pending',
  'Complete',
  'Not Handed Over',
  'Payment Received',
  'Canceled',
]

const PRODUCT_OPTIONS = [
  'Minoxidil',
  'Derma Rollar',
  'Minoxidil + Derma Rollar',
]

export default function OrdersTable({
  orders,
  onDelete,
  onStatusChange,
  onNoteChange,
  onOrderUpdate,
}) {
  const [selectedNoteOrder, setSelectedNoteOrder] = useState(null)
  const [draftNote, setDraftNote] = useState('')

  const [selectedEditOrder, setSelectedEditOrder] = useState(null)
  const [editForm, setEditForm] = useState(null)

  function openNoteModal(order) {
    setSelectedNoteOrder(order)
    setDraftNote(order.note || '')
  }

  function closeNoteModal() {
    setSelectedNoteOrder(null)
    setDraftNote('')
  }

  function saveNote() {
    if (!selectedNoteOrder) return

    onNoteChange(selectedNoteOrder.id, draftNote)
    closeNoteModal()
  }

  function openEditModal(order) {
    setSelectedEditOrder(order)
    setEditForm({
      date: order.date || '',
      customer: order.customer || '',
      phone: order.phone || '',
      address: order.address || '',
      product: order.product || 'Minoxidil',
      quantity: String(order.quantity || 1),
      amount: String(order.amount || ''),
      status: order.status || 'Pending',
      steadfastParcelId: order.steadfastParcelId || '',
      note: order.note || '',
    })
  }

  function closeEditModal() {
    setSelectedEditOrder(null)
    setEditForm(null)
  }

  function updateEditForm(field, value) {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function saveEditedOrder(event) {
    event.preventDefault()

    if (!selectedEditOrder || !editForm) return

    if (!editForm.date) {
      alert('Please select order date.')
      return
    }

    if (!editForm.customer.trim()) {
      alert('Please enter customer name.')
      return
    }

    if (!editForm.phone.trim()) {
      alert('Please enter phone number.')
      return
    }

    if (!editForm.address.trim()) {
      alert('Please enter address.')
      return
    }

    if (!editForm.amount || Number(editForm.amount) <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    onOrderUpdate(selectedEditOrder.id, {
      date: editForm.date,
      customer: editForm.customer.trim(),
      phone: editForm.phone.trim(),
      address: editForm.address.trim(),
      product: editForm.product,
      quantity: Number(editForm.quantity || 1),
      amount: Number(editForm.amount || 0),
      status: editForm.status,
      steadfastParcelId: editForm.steadfastParcelId.trim(),
      note: editForm.note.trim(),
    })

    closeEditModal()
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-[#bfcaba] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#bfcaba] bg-[#e7f6ff] text-xs font-bold uppercase tracking-wider text-[#40493d]">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Address</th>
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

                  <td className="max-w-[260px] px-6 py-4 text-sm text-[#40493d]">
                    <span className="line-clamp-2">
                      {order.address || 'Not added'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">{order.product}</td>

                  <td className="px-6 py-4 text-center font-mono">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4 text-right font-mono font-bold text-[#0d631b]">
                    {formatBDT(order.amount)}
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
                        onClick={() => openEditModal(order)}
                        className="rounded p-2 text-[#40493d] hover:bg-[#00629e]/10 hover:text-[#00629e]"
                        title="Edit order"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openNoteModal(order)}
                        className={`rounded p-2 ${
                          order.note
                            ? 'bg-[#0d631b]/10 text-[#0d631b] hover:bg-[#0d631b]/20'
                            : 'text-[#40493d] hover:bg-[#d9ebf5] hover:text-[#0d631b]'
                        }`}
                        title={order.note ? 'View or edit note' : 'Add note'}
                      >
                        <NotebookPen size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(order.id)}
                        className="rounded p-2 text-[#40493d] hover:bg-[#ba1a1a]/10 hover:text-[#ba1a1a]"
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
                  <td colSpan="11" className="px-6 py-10 text-center text-[#40493d]">
                    No orders found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedNoteOrder && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-[#bfcaba] p-5">
              <div>
                <h3 className="text-xl font-bold text-[#0d1e25]">Parcel Note</h3>
                <p className="mt-1 text-sm text-[#40493d]">
                  #{selectedNoteOrder.id} • {selectedNoteOrder.customer}
                </p>
              </div>

              <button
                type="button"
                onClick={closeNoteModal}
                className="rounded p-2 text-[#40493d] hover:bg-[#e7f6ff]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-lg bg-[#e7f6ff] p-4 text-sm text-[#40493d]">
                <p>
                  <b>Phone:</b> {selectedNoteOrder.phone}
                </p>
                <p className="mt-1">
                  <b>Address:</b> {selectedNoteOrder.address || 'Not added'}
                </p>
                <p className="mt-1">
                  <b>Steadfast Parcel:</b>{' '}
                  {selectedNoteOrder.steadfastParcelId || 'Not added'}
                </p>
              </div>

              <textarea
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                rows={6}
                placeholder="Write parcel note here..."
                className="w-full resize-none rounded-lg border border-[#bfcaba] bg-[#f4faff] p-4 outline-none focus:border-[#0d631b]"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-[#bfcaba] p-5">
              <button
                type="button"
                onClick={closeNoteModal}
                className="rounded-lg border border-[#bfcaba] px-5 py-2 font-bold text-[#40493d] hover:bg-[#e7f6ff]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveNote}
                className="flex items-center gap-2 rounded-lg bg-[#0d631b] px-5 py-2 font-bold text-white hover:opacity-90"
              >
                <Save size={18} />
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedEditOrder && editForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-[#bfcaba] p-5">
              <div>
                <h3 className="text-xl font-bold text-[#0d1e25]">Edit Order</h3>
                <p className="mt-1 text-sm text-[#40493d]">
                  #{selectedEditOrder.id} • Order ID is locked for tracking safety.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                className="rounded p-2 text-[#40493d] hover:bg-[#e7f6ff]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveEditedOrder}>
              <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
                <FormField label="Order Date" required>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => updateEditForm('date', e.target.value)}
                    className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                    required
                  />
                </FormField>

                <FormField label="Customer Name" required>
                  <input
                    type="text"
                    value={editForm.customer}
                    onChange={(e) => updateEditForm('customer', e.target.value)}
                    className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                    required
                  />
                </FormField>

                <FormField label="Phone" required>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => updateEditForm('phone', e.target.value)}
                    className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                    required
                  />
                </FormField>

                <FormField label="Product" required>
                  <select
                    value={editForm.product}
                    onChange={(e) => updateEditForm('product', e.target.value)}
                    className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                    required
                  >
                    {PRODUCT_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Quantity" required>
                  <input
                    type="number"
                    min="1"
                    value={editForm.quantity}
                    onChange={(e) => updateEditForm('quantity', e.target.value)}
                    className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                    required
                  />
                </FormField>

                <FormField label="Amount (BDT)" required>
                  <input
                    type="number"
                    min="0"
                    value={editForm.amount}
                    onChange={(e) => updateEditForm('amount', e.target.value)}
                    className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                    required
                  />
                </FormField>

                <FormField label="Status" required>
                  <select
                    value={editForm.status}
                    onChange={(e) => updateEditForm('status', e.target.value)}
                    className={`w-full rounded-lg border border-[#bfcaba] px-4 py-2 font-bold outline-none focus:border-[#0d631b] ${statusStyle(
                      editForm.status
                    )}`}
                    required
                  >
                    {STATUS_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Steadfast Parcel ID">
                  <input
                    type="text"
                    value={editForm.steadfastParcelId}
                    onChange={(e) =>
                      updateEditForm('steadfastParcelId', e.target.value)
                    }
                    className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                  />
                </FormField>

                <FormField label="Address" required className="md:col-span-2">
                  <textarea
                    value={editForm.address}
                    onChange={(e) => updateEditForm('address', e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                    required
                  />
                </FormField>

                <FormField label="Parcel Note" className="md:col-span-2">
                  <textarea
                    value={editForm.note}
                    onChange={(e) => updateEditForm('note', e.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                  />
                </FormField>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#bfcaba] p-5">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-[#bfcaba] px-5 py-2 font-bold text-[#40493d] hover:bg-[#e7f6ff]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-[#0d631b] px-5 py-2 font-bold text-white hover:opacity-90"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function FormField({ label, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-bold text-[#0d1e25]">
        {label}
        {required && <span className="text-[#ba1a1a]"> *</span>}
      </span>
      {children}
    </label>
  )
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function formatBDT(amount) {
  return `৳${Number(amount || 0).toLocaleString('en-BD')}`
}

function statusStyle(status) {
  if (status === 'Pending') return 'bg-[#fff176] text-[#111111]'
  if (status === 'Complete') return 'bg-[#00e640] text-[#001f08]'
  if (status === 'Not Handed Over') return 'bg-[#ff7a00] text-[#111111]'
  if (status === 'Payment Received') return 'bg-[#b9def7] text-[#1f5f91]'
  if (status === 'Canceled') return 'bg-[#ff1f1f] text-white'
  return 'bg-[#d9ebf5] text-[#40493d]'
}