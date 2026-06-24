import { Download, Plus } from 'lucide-react'
import BalanceOverview from '../components/BalanceOverview'
import BudgetAllocation from '../components/BudgetAllocation'
import BudgetAuditTrail from '../components/BudgetAuditTrail'
import BudgetInsights from '../components/BudgetInsights'

export default function Budgets() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0d1e25]">Financial Allocation</h2>
          <p className="text-sm text-[#40493d]">
            Real-time budget management and balance tracking
          </p>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-lg border border-[#bfcaba] bg-white px-6 py-3 font-bold hover:bg-[#e7f6ff]">
            <Download size={18} />
            Export
          </button>

          <button className="flex items-center gap-2 rounded-lg bg-[#0d631b] px-6 py-3 font-bold text-white hover:opacity-90">
            <Plus size={18} />
            Update Balance
          </button>
        </div>
      </div>

      <BalanceOverview />

      <div className="mt-8 grid grid-cols-12 gap-8">
        <BudgetAllocation />
        <BudgetAuditTrail />
      </div>

      <BudgetInsights />
    </>
  )
}