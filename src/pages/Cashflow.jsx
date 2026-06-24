import CashflowSummary from '../components/CashflowSummary'
import CashflowFilters from '../components/CashflowFilters'
import TransactionsTable from '../components/TransactionsTable'
import QuarterlyCashflow from '../components/QuarterlyCashflow'
import CashflowSideCards from '../components/CashflowSideCards'

export default function Cashflow() {
  return (
    <>
      <CashflowSummary />

      <div className="mt-6">
        <CashflowFilters />
      </div>

      <div className="mt-6">
        <TransactionsTable />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <QuarterlyCashflow />
        <CashflowSideCards />
      </div>
    </>
  )
}