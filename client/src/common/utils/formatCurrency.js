export default function formatCurrency (value) {
  const val = parseFloat(value)

  if (Number.isNaN(val)) return '-'

  const formatted = (val).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatted
}
