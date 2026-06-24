const bars = [
  ['Apr', '45%', '20%'],
  ['May', '60%', '25%'],
  ['Jun', '85%', '30%'],
  ['Jul', '10%', null],
]

export default function QuarterlyCashflow() {
  return (
    <div className="col-span-12 rounded-xl border border-[#bfcaba] bg-white p-6 lg:col-span-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quarterly Cashflow Trends</h3>

        <div className="flex gap-4">
          <Legend color="bg-[#0d631b]" label="Inflow" />
          <Legend color="bg-[#923357]" label="Outflow" />
        </div>
      </div>

      <div className="flex h-64 items-end justify-between gap-2 pt-4">
        {bars.map(([month, inflow, outflow]) => (
          <div key={month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-52 w-full flex-col justify-end gap-1">
              <div
                className={`w-full rounded-t bg-[#0d631b] hover:opacity-80 ${
                  month === 'Jul' ? 'bg-[#d4e5ef]' : ''
                }`}
                style={{ height: inflow }}
              />
              {outflow && (
                <div
                  className="w-full rounded-t bg-[#923357] hover:opacity-80"
                  style={{ height: outflow }}
                />
              )}
            </div>
            <span className={`text-xs font-bold uppercase ${month === 'Jul' ? 'opacity-40' : ''}`}>
              {month}
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
      <span className="text-sm text-[#40493d]">{label}</span>
    </div>
  )
}