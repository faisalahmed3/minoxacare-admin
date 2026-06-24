import { ArrowUp, TrendingUp, Wallet, Banknote, BarChart3 } from 'lucide-react'

const icons = {
  trending_up: TrendingUp,
  payments: Banknote,
  account_balance_wallet: Wallet,
  analytics: BarChart3,
}

export default function KPICard({
  title,
  value,
  icon,
  iconColor,
  valueColor = 'text-[#0d1e25]',
  note,
  noteColor,
  badge,
}) {
  const Icon = icons[icon] || BarChart3

  return (
    <div className="rounded border border-[#bfcaba] bg-white p-6">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
          {title}
        </span>
        <Icon className={iconColor} size={22} />
      </div>

      <div className={`font-mono text-3xl font-semibold ${valueColor}`}>{value}</div>

      {note && (
        <div className={`mt-1 flex items-center gap-1 text-xs font-bold ${noteColor}`}>
          {title === 'Total Revenue' && <ArrowUp size={14} />}
          {note}
        </div>
      )}

      {badge && (
        <div className="mt-1 w-fit rounded-full bg-[#0d631b]/10 px-2 py-0.5 text-[10px] font-bold uppercase text-[#0d631b]">
          {badge}
        </div>
      )}
    </div>
  )
}