import { Bell, Settings } from 'lucide-react'

export default function Topbar({ activePage, setActivePage }) {
  const navItems = ['Dashboard', 'Orders', 'Inventory', 'Cashflow']

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-[#bfcaba] bg-[#f4faff] px-8">
      <h2 className="text-2xl font-bold text-[#0d631b]">{activePage}</h2>

      <div className="flex items-center gap-6">
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={
                activePage === item
                  ? 'border-b-2 border-[#0d631b] py-5 font-bold text-[#0d631b]'
                  : 'px-2 py-5 text-[#40493d] hover:bg-[#d9ebf5]'
              }
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActivePage('Notifications')}
          className="rounded-full p-2 text-[#40493d] hover:bg-[#d9ebf5]"
        >
          <Bell size={20} />
        </button>

        <button
          onClick={() => setActivePage('Settings')}
          className="rounded-full p-2 text-[#40493d] hover:bg-[#d9ebf5]"
        >
          <Settings size={20} />
        </button>

        <div className="h-8 w-8 rounded-full border border-[#bfcaba] bg-[#d9ebf5]" />
      </div>
    </header>
  )
}