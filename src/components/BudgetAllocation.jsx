import { useState } from 'react'

export default function BudgetAllocation() {
  const [adRun, setAdRun] = useState(85000)
  const [logistics, setLogistics] = useState(229749)

  return (
    <section className="col-span-12 rounded-xl border border-[#bfcaba] bg-white p-6 lg:col-span-8">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-lg font-semibold">Budget Allocation</h4>
        <span className="text-sm text-[#40493d]">Q4 Fiscal Year 2024</span>
      </div>

      <div className="space-y-8">
        <AllocationRow
          label="Ad Run Allocation"
          value={adRun}
          max={200000}
          onChange={setAdRun}
          description="Projected ROI: 4.2x based on historical conversion data."
        />

        <AllocationRow
          label="Logistics & Product Supply"
          value={logistics}
          max={500000}
          onChange={setLogistics}
          description="Covers shipping lanes and product procurement."
        />

        <div className="opacity-60">
          <div className="mb-2 flex items-center justify-between">
            <label className="font-bold">Emergency Reserve</label>
            <span className="font-mono font-bold">$50,000.00</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#d4e5ef]">
            <div className="h-full w-[25%] rounded-full bg-[#707a6c]" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4 border-t border-[#bfcaba] pt-6">
        <button className="font-bold text-[#40493d] hover:text-[#0d1e25]">Reset Changes</button>
        <button className="rounded-lg bg-[#0d631b] px-8 py-3 font-bold text-white hover:opacity-90">
          Apply Allocation
        </button>
      </div>
    </section>
  )
}

function AllocationRow({ label, value, max, onChange, description }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="font-bold">{label}</label>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[#40493d]">Current:</span>
          <span className="font-mono font-bold text-[#0d631b]">
            ${value.toLocaleString()}.00
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <input
          className="range range-sm flex-1 accent-[#0d631b]"
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />

        <div className="w-36">
          <input
            className="w-full rounded-lg border border-[#bfcaba] bg-white px-4 py-2 text-right font-mono outline-none focus:border-[#0d631b]"
            value={value.toLocaleString()}
            onChange={(e) => {
              const clean = e.target.value.replaceAll(',', '')
              if (!Number.isNaN(Number(clean))) onChange(Number(clean))
            }}
          />
        </div>
      </div>

      <p className="mt-2 text-sm text-[#40493d]">{description}</p>
    </div>
  )
}