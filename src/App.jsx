import { useState } from 'react'
import { Construction } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import KPICard from './components/KPICard'
import CashflowChart from './components/CashflowChart'
import InventoryStatus from './components/InventoryStatus'
import FinancialTable from './components/FinancialTable'
import Inventory from './pages/Inventory'
import Orders from './pages/Orders'
import Cashflow from './pages/Cashflow'
import Budgets from './pages/Budgets'
import { kpiCards } from './data/dashboardData'

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4faff] text-[#0d1e25]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="ml-64 flex-1 flex flex-col h-full overflow-hidden">
        <Topbar activePage={activePage} setActivePage={setActivePage} />

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activePage === 'Dashboard' && <Dashboard />}
          {activePage === 'Orders' && <Orders />}
          {activePage === 'Inventory' && <Inventory />}
          {activePage === 'Cashflow' && <Cashflow />}
          {activePage === 'Budgets' && <Budgets />}

          {!['Dashboard', 'Orders', 'Inventory', 'Cashflow', 'Budgets'].includes(activePage) && (
            <ComingSoon title={activePage} />
          )}
        </div>
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiCards.map((card) => (
          <KPICard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <CashflowChart />
        <InventoryStatus />
      </div>

      <FinancialTable />
    </>
  )
}

function ComingSoon({ title }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="rounded-xl border border-[#bfcaba] bg-white p-10 text-center shadow-sm">
        <Construction className="mx-auto mb-4 text-[#0d631b]" size={52} />
        <h2 className="text-2xl font-bold text-[#0d631b]">{title}</h2>
        <p className="mt-2 text-[#40493d]">This page is connected. Now build its content.</p>
      </div>
    </div>
  )
}