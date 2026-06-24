import OrderMetrics from '../components/OrderMetrics'
import OrdersFilterBar from '../components/OrdersFilterBar'
import OrdersTable from '../components/OrdersTable'
import OrderInsights from '../components/OrderInsights'
import { Download, Plus } from 'lucide-react'

export default function Orders() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-bold text-[#0d1e25]">
            Order Management
          </h2>

          <p className="text-[#40493d] mt-1">
            Track, process and manage customer orders.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn btn-outline border-[#0d631b] text-[#0d631b]">
            <Download size={18} />
            Export Orders
          </button>

          <button className="btn bg-[#0d631b] text-white hover:bg-[#095214]">
            <Plus size={18} />
            Create Order
          </button>
        </div>
      </div>

      <OrderMetrics />

      <div className="mt-6">
        <OrdersFilterBar />
      </div>

      <div className="mt-6">
        <OrdersTable />
      </div>

      <div className="mt-8">
        <OrderInsights />
      </div>
    </>
  )
}