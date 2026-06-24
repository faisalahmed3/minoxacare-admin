import { PackageSearch } from 'lucide-react'

export default function RestockCard() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-[#bfcaba] bg-white p-6 text-center">
      <div className="absolute right-0 top-0 p-6 opacity-10">
        <PackageSearch size={120} />
      </div>

      <h4 className="mb-2 text-lg font-semibold">Automated Restock</h4>

      <p className="mb-4 px-6 text-sm text-[#40493d]">
        Connect supplier accounts to automatically trigger reorders when stock levels reach your predefined threshold.
      </p>

      <button className="rounded bg-[#00629e] px-6 py-2 font-bold text-white hover:opacity-90">
        Configure Smart Reorder
      </button>
    </div>
  )
}