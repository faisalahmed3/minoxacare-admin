const chartData = [
  { month: 'April', revenue: '100%', expenses: '60%', faded: true },
  { month: 'May', revenue: '85%', expenses: '75%', tooltip: 'May Spend: 30,470' },
  { month: 'June', revenue: '95%', expenses: '55%', tooltip: 'June Withdraw: 24,000' },
]

export default function CashflowChart() {
  return (
    <div className="rounded border border-[#bfcaba] bg-white p-6 lg:col-span-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#0d1e25]">Monthly Cashflow Trend</h3>
          <p className="text-xs text-[#40493d]">Revenue vs Expenses (Apr - Jun)</p>
        </div>

        <div className="flex gap-4">
          <Legend color="bg-[#0d631b]" label="Revenue" />
          <Legend color="bg-[#923357]" label="Expenses" />
        </div>
      </div>

      <div className="flex h-48 items-end justify-around gap-6 pb-4 pt-6">
        {chartData.map((item) => (
          <div key={item.month} className="group relative flex flex-1 flex-col items-center">
            {item.tooltip && (
              <div className="absolute -top-6 rounded bg-[#0d1e25] px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.tooltip}
              </div>
            )}

            <div className="flex h-32 items-end justify-center gap-1">
              <div
                className={`w-8 rounded-t bg-[#0d631b] ${item.faded ? 'opacity-20' : ''}`}
                style={{ height: item.revenue }}
              />
              <div
                className={`w-8 rounded-t bg-[#923357] ${item.faded ? 'opacity-20' : ''}`}
                style={{ height: item.expenses }}
              />
            </div>

            <span className="mt-4 text-[10px] font-bold uppercase tracking-wider">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`h-3 w-3 rounded-full ${color}`} />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
  )
}