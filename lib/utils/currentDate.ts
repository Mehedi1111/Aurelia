export function getCurrentDateInfo() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.toLocaleString('en-US', { month: 'long' })
  const monthYear = `${month} ${year}`
  const iso = now.toISOString().split('T')[0]
  return { year, month, monthYear, iso }
}
