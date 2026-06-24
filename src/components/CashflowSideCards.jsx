import { ArrowRight, CircleHelp, FileText } from 'lucide-react'

export default function CashflowSideCards() {
  return (
    <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
      <div className="relative flex-1 overflow-hidden rounded-xl bg-[#2e7d32] p-6 text-[#cbffc2]">
        <div className="relative z-10">
          <h4 className="mb-1 text-lg font-semibold">Export Analysis</h4>
          <p className="mb-6 text-sm opacity-90">
            Generate an audit-ready PDF of all cashflow movements for Q2.
          </p>

          <button className="flex items-center gap-2 rounded bg-[#cbffc2] px-4 py-2 font-bold text-[#2e7d32] hover:bg-white">
            <FileText size={18} />
            Download PDF
          </button>
        </div>

        <FileText className="absolute -bottom-8 -right-8 rotate-12 opacity-20" size={160} />
      </div>

      <div className="rounded-xl border border-[#bfcaba] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9ebf5] text-[#00629e]">
            <CircleHelp size={22} />
          </div>

          <div>
            <h4 className="font-bold">Need Help?</h4>
            <p className="text-sm text-[#40493d]">Access the financial reporting guide.</p>
          </div>
        </div>

        <button className="flex items-center gap-1 text-sm font-bold text-[#0d631b] hover:underline">
          View Documentation
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}