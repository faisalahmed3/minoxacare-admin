import { useMemo, useState } from 'react'
import { Download, Plus, RotateCcw } from 'lucide-react'
import ordersSeed from '../data/orders.json'
import OrderMetrics from '../components/OrderMetrics'
import OrdersFilterBar from '../components/OrdersFilterBar'
import OrdersTable from '../components/OrdersTable'
import OrderInsights from '../components/OrderInsights'

export default function Orders() {
  const [orders, setOrders] = useState(ordersSeed)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [product, setProduct] = useState('All')
  const [date, setDate] = useState('')

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const query = search.trim().toLowerCase()

        const matchesSearch =
          !query ||
          order.id.toLowerCase().includes(query) ||
          order.customer.toLowerCase().includes(query) ||
          order.product.toLowerCase().includes(query) ||
          order.phone.includes(query) ||
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

  function resetFilters() {
    setSearch('')
    setStatus('All')
    setProduct('All')
    setDate('')
  }

  function exportCSV() {
    const headers = [
      'Order ID',
      'Date',
      'Customer',
      'Phone',
      'Product',
      'Qty',
      'Amount',
      'Status',
      'Steadfast Parcel ID',
      'Steadfast Link',
    ]

    const rows = filteredOrders.map((o) => [
      o.id,
      o.date,
      o.customer,
      o.phone,
      o.product,
      o.quantity,
      o.amount,
      o.status,
      o.steadfastParcelId || '',
      o.steadfastParcelId
        ? `https://www.steadfast.com.bd/user/consignment/${o.steadfastParcelId}`
        : '',
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
            Track MinoxaCare orders by date, product, delivery status, and Steadfast parcel ID.
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

          <button className="flex items-center gap-2 rounded-lg bg-[#0d631b] px-5 py-3 font-bold text-white hover:opacity-90">
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
        />
      </div>

      <div className="mt-8">
        <OrderInsights orders={orders} filteredOrders={filteredOrders} />
      </div>
    </>
  )
}