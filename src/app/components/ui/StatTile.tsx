interface StatTileProps {
  label: string
  value: string | number
  subtext?: string
  trend?: {
    value: string
    positive?: boolean
  }
}

export function StatTile({ label, value, subtext, trend }: StatTileProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </span>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.positive ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="text-3xl font-semibold text-slate-900 mb-1">{value}</div>
      {subtext && <div className="text-sm text-slate-600">{subtext}</div>}
    </div>
  )
}

