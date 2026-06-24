import { useMemo, useState } from 'react'
import { Download, Plus, RotateCcw, Save, X } from 'lucide-react'
import ordersSeed from '../data/orders.json'
import OrderMetrics from '../components/OrderMetrics'
import OrdersFilterBar from '../components/OrdersFilterBar'
import OrdersTable from '../components/OrdersTable'
import OrderInsights from '../components/OrderInsights'

const PRODUCT_OPTIONS = [
  'Minoxidil',
  'Derma Rollar',
  'Minoxidil + Derma Rollar',
]

const STATUS_OPTIONS = [
  'Pending',
  'Complete',
  'Not Handed Over',
  'Payment Received',
  'Canceled',
]

const emptyOrderForm = {
  date: '',
  customer: '',
  phone: '',
  address: '',
  product: 'Minoxidil',
  quantity: 1,
  amount: '',
  status: 'Pending',
  steadfastParcelId: '',
  note: '',
}

export default function Orders() {
  const [orders, setOrders] = useState(ordersSeed)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [product, setProduct] = useState('All')
  const [date, setDate] = useState('')

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [orderForm, setOrderForm] = useState(emptyOrderForm)

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const query = search.trim().toLowerCase()

        const matchesSearch =
          !query ||
          normalizeOrderId(order.id).toLowerCase().includes(query) ||
          String(order.customer || '').toLowerCase().includes(query) ||
          String(order.product || '').toLowerCase().includes(query) ||
          String(order.phone || '').includes(query) ||
          String(order.address || '').toLowerCase().includes(query) ||
          String(order.note || '').toLowerCase().includes(query) ||
          String(order.steadfastParcelId || '').toLowerCase().includes(query)

        const matchesStatus = status === 'All' || order.status === status
        const matchesProduct = product === 'All' || order.product === product
        const matchesDate = !date || order.date === date

        return matchesSearch && matchesStatus && matchesProduct && matchesDate
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [orders, search, status, product, date])

  function handleDelete(id) {
    setOrders((prev) => prev.filter((order) => order.id !== id))
  }

  function handleStatusChange(id, nextStatus) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: nextStatus } : order
      )
    )
  }

  function handleNoteChange(id, note) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, note } : order
      )
    )
  }

  function handleOrderUpdate(id, updatedOrder) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              ...updatedOrder,
              id: order.id,
            }
          : order
      )
    )
  }

  function resetFilters() {
    setSearch('')
    setStatus('All')
    setProduct('All')
    setDate('')
  }

  function openCreateModal() {
    setOrderForm({
      ...emptyOrderForm,
      date: new Date().toISOString().slice(0, 10),
    })
    setIsCreateOpen(true)
  }

  function closeCreateModal() {
    setIsCreateOpen(false)
    setOrderForm(emptyOrderForm)
  }

  function updateForm(field, value) {
    setOrderForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleCreateOrder(event) {
    event.preventDefault()

    if (!orderForm.date) {
      alert('Please select order date.')
      return
    }

    if (!orderForm.customer.trim()) {
      alert('Please enter customer name.')
      return
    }

    if (!orderForm.phone.trim()) {
      alert('Please enter phone number.')
      return
    }

    if (!orderForm.address.trim()) {
      alert('Please enter address.')
      return
    }

    if (!orderForm.quantity || Number(orderForm.quantity) < 1) {
      alert('Please enter a valid quantity.')
      return
    }

    if (!orderForm.amount || Number(orderForm.amount) <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    const generatedId = generateOrderId(orderForm.date, orders)

    const newOrder = {
      id: generatedId,
      date: orderForm.date,
      customer: orderForm.customer.trim(),
      phone: orderForm.phone.trim(),
      address: orderForm.address.trim(),
      product: orderForm.product,
      quantity: Number(orderForm.quantity),
      amount: Number(orderForm.amount),
      status: orderForm.status,
      steadfastParcelId: orderForm.steadfastParcelId.trim(),
      note: orderForm.note.trim(),
    }

    setOrders((prev) => [newOrder, ...prev])
    closeCreateModal()
  }

  function exportCSV() {
    const headers = [
      'Order ID',
      'Date',
      'Customer',
      'Phone',
      'Address',
      'Product',
      'Qty',
      'Amount (BDT)',
      'Status',
      'Steadfast Parcel ID',
      'Steadfast Link',
      'Note',
    ]

    const rows = filteredOrders.map((order) => [
      `#${normalizeOrderId(order.id)}`,
      order.date,
      order.customer,
      order.phone,
      order.address || '',
      order.product,
      order.quantity,
      order.amount,
      order.status,
      order.steadfastParcelId || '',
      order.steadfastParcelId
        ? `https://www.steadfast.com.bd/user/consignment/${order.steadfastParcelId}`
        : '',
      order.note || '',
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')
      )
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'minoxacare-orders.csv'
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-[#0d1e25]">Order Management</h2>
          <p className="mt-1 text-[#40493d]">
            Track MinoxaCare orders by date, product, address, parcel status, and Steadfast parcel ID.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 rounded-lg border border-[#bfcaba] px-5 py-3 font-bold text-[#40493d] hover:bg-[#e7f6ff]"
          >
            <RotateCcw size={18} />
            Reset
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg border border-[#0d631b] px-5 py-3 font-bold text-[#0d631b] hover:bg-[#e7f6ff]"
          >
            <Download size={18} />
            Export Orders
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-lg bg-[#0d631b] px-5 py-3 font-bold text-white hover:opacity-90"
          >
            <Plus size={18} />
            Create Order
          </button>
        </div>
      </div>

      <OrderMetrics orders={orders} />

      <div className="mt-6">
        <OrdersFilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          product={product}
          setProduct={setProduct}
          date={date}
          setDate={setDate}
        />
      </div>

      <div className="mt-6">
        <OrdersTable
          orders={filteredOrders}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onNoteChange={handleNoteChange}
          onOrderUpdate={handleOrderUpdate}
        />
      </div>

      <div className="mt-8">
        <OrderInsights orders={orders} filteredOrders={filteredOrders} />
      </div>

      {isCreateOpen && (
        <CreateOrderModal
          form={orderForm}
          orders={orders}
          updateForm={updateForm}
          onClose={closeCreateModal}
          onSubmit={handleCreateOrder}
        />
      )}
    </>
  )
}

function CreateOrderModal({ form, orders, updateForm, onClose, onSubmit }) {
  const previewId = form.date ? generateOrderId(form.date, orders) : ''

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#bfcaba] p-5">
          <div>
            <h3 className="text-xl font-bold text-[#0d1e25]">Create New Order</h3>
            <p className="mt-1 text-sm text-[#40493d]">
              Order ID will be generated automatically from the selected date.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-[#40493d] hover:bg-[#e7f6ff]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
            <div className="md:col-span-2 rounded-lg bg-[#e7f6ff] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
                Generated Order ID
              </p>

              <p className="mt-1 font-mono text-2xl font-bold text-[#0d631b]">
                {previewId ? `#${previewId}` : 'Select a date'}
              </p>
            </div>

            <FormField label="Order Date" required>
              <input
                type="date"
                value={form.date}
                onChange={(event) => updateForm('date', event.target.value)}
                className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                required
              />
            </FormField>

            <FormField label="Customer Name" required>
              <input
                type="text"
                value={form.customer}
                onChange={(event) => updateForm('customer', event.target.value)}
                placeholder="Enter customer name"
                className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                required
              />
            </FormField>

            <FormField label="Phone" required>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => updateForm('phone', event.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                required
              />
            </FormField>

            <FormField label="Product" required>
              <select
                value={form.product}
                onChange={(event) => updateForm('product', event.target.value)}
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
                value={form.quantity}
                onChange={(event) => updateForm('quantity', event.target.value)}
                className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                required
              />
            </FormField>

            <FormField label="Amount (BDT)" required>
              <input
                type="number"
                min="0"
                value={form.amount}
                onChange={(event) => updateForm('amount', event.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                required
              />
            </FormField>

            <FormField label="Status" required>
              <select
                value={form.status}
                onChange={(event) => updateForm('status', event.target.value)}
                className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
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
                value={form.steadfastParcelId}
                onChange={(event) =>
                  updateForm('steadfastParcelId', event.target.value)
                }
                placeholder="Enter parcel ID"
                className="w-full rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
              />
            </FormField>

            <FormField label="Address" required className="md:col-span-2">
              <textarea
                value={form.address}
                onChange={(event) => updateForm('address', event.target.value)}
                rows={3}
                placeholder="Enter delivery address"
                className="w-full resize-none rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
                required
              />
            </FormField>

            <FormField label="Parcel Note" className="md:col-span-2">
              <textarea
                value={form.note}
                onChange={(event) => updateForm('note', event.target.value)}
                rows={4}
                placeholder="Write note about this parcel..."
                className="w-full resize-none rounded-lg border border-[#bfcaba] bg-[#f4faff] px-4 py-2 outline-none focus:border-[#0d631b]"
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#bfcaba] p-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#bfcaba] px-5 py-2 font-bold text-[#40493d] hover:bg-[#e7f6ff]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#0d631b] px-5 py-2 font-bold text-white hover:opacity-90"
            >
              <Save size={18} />
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
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

function generateOrderId(orderDate, orders) {
  if (!orderDate) return ''

  const [fullYear, month] = orderDate.split('-')

  if (!fullYear || !month) return ''

  const year = fullYear.slice(-2)
  const prefix = `ORD-${year}${month}`

  const existingCounts = orders
    .map((order) => normalizeOrderId(order.id))
    .filter((id) => id.startsWith(prefix))
    .map((id) => Number(id.slice(prefix.length)))
    .filter((number) => Number.isFinite(number))

  const nextCount =
    existingCounts.length > 0 ? Math.max(...existingCounts) + 1 : 1

  return `${prefix}${String(nextCount).padStart(3, '0')}`
}

function normalizeOrderId(orderId) {
  return String(orderId).replace('#', '').trim()
}