const bars = [
  ['Mon', '60%', 'bg-[#0d631b]/20'],
  ['Tue', '45%', 'bg-[#0d631b]/40'],
  ['Wed', '75%', 'bg-[#0d631b]/60'],
  ['Thu', '90%', 'bg-[#0d631b]'],
  ['Fri', '30%', 'bg-[#0d631b]/50'],
  ['Sat', '55%', 'bg-[#0d631b]/30'],
  ['Sun', '20%', 'bg-[#0d631b]/10'],
]

export default function StockTrendChart() {
  return (
    <div className="rounded-xl border border-[#bfcaba] bg-white p-6">
      <h4 className="mb-4 text-lg font-semibold">Stock Depletion Trend</h4>

      <div className="relative flex h-48 items-end justify-between gap-2 px-2">
        {bars.map(([day, height, color]) => (
          <div key={day} className={`group relative flex-1 rounded-t-lg ${color}`} style={{ height }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100">
              {day}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm italic text-[#40493d]">
        Higher volume of outbound orders detected on Thursday.
      </p>
    </div>
  )
}