import { monthlyData } from '../data/dashboardData'

export default function FinancialTable() {
  return (
    <div className="overflow-hidden rounded border border-[#bfcaba] bg-white">
      <div className="border-b border-[#bfcaba] bg-[#e7f6ff] p-6">
        <h3 className="text-lg font-semibold text-[#0d1e25]">Monthly Financial Breakdown</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#d4e5ef] text-[11px] font-bold uppercase tracking-wider text-[#40493d]">
              <th className="p-4">Month</th>
              <th className="p-4 text-right">Revenue</th>
              <th className="p-4 text-right">Spend</th>
              <th className="p-4 text-right">Withdrawals</th>
              <th className="p-4 text-right">Net Position</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#bfcaba] font-mono text-sm">
            {monthlyData.map((row) => (
              <tr key={row.month} className="hover:bg-[#e7f6ff]">
                <td className="p-4 font-bold">{row.month}</td>
                <td className="p-4 text-right">{row.revenue}</td>
                <td className="p-4 text-right">{row.spend}</td>
                <td className="p-4 text-right">{row.withdrawals}</td>
                <td
                  className={`p-4 text-right ${
                    row.net.startsWith('-') ? 'text-[#923357]' : 'text-[#0d631b]'
                  }`}
                >
                  {row.net}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      row.statusType === 'danger'
                        ? 'bg-[#ba1a1a]/10 text-[#ba1a1a]'
                        : 'bg-[#0d631b]/10 text-[#0d631b]'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}