import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  Banknote,
  Settings,
  HelpCircle,
  LogOut,
  FilePlus2,
  HeartPulse,
} from 'lucide-react'

const menuItems = [
  [LayoutDashboard, 'Dashboard'],
  [ShoppingCart, 'Orders'],
  [Package, 'Inventory'],
  [Wallet, 'Cashflow'],
  [Banknote, 'Budgets'],
  [Settings, 'Settings'],
]

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col gap-2 border-r border-[#bfcaba] bg-[#e7f6ff] p-4 text-[#0d631b]">
      <div className="mb-6 flex items-center gap-2 px-1">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0d631b] text-white">
          <HeartPulse size={22} />
        </div>

        <div>
          <h1 className="text-xl font-black leading-none text-[#0d631b]">MinoxaCare</h1>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#40493d]/70">
            Admin Terminal
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map(([Icon, label]) => {
          const active = activePage === label

          return (
            <button
              key={label}
              onClick={() => setActivePage(label)}
              className={`flex w-full items-center gap-4 rounded p-4 text-left transition-all ${
                active
                  ? 'translate-x-1 bg-[#2e7d32] font-bold text-[#cbffc2]'
                  : 'text-[#40493d] hover:bg-[#d9ebf5]'
              }`}
            >
              <Icon size={20} />
              <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto space-y-1 border-t border-[#bfcaba] pt-6">
        <button
          onClick={() => setActivePage('Reports')}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded bg-[#0d631b] py-4 font-bold text-white hover:opacity-90"
        >
          <FilePlus2 size={18} />
          New Report
        </button>

        <BottomItem icon={HelpCircle} label="Support" setActivePage={setActivePage} />
        <BottomItem icon={LogOut} label="Log Out" setActivePage={setActivePage} />
      </div>
    </aside>
  )
}

function BottomItem({ icon: Icon, label, setActivePage }) {
  return (
    <button
      onClick={() => setActivePage(label)}
      className="flex w-full items-center gap-4 rounded p-4 text-left text-[#40493d] transition-all hover:bg-[#d9ebf5]"
    >
      <Icon size={20} />
      <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  )
}