export function getCurrentDateInfo() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.toLocaleString('en-US', { month: 'long' })
  const monthYear = `${month} ${year}`
  const iso = now.toISOString().split('T')[0]
  return { year, month, monthYear, iso }
}

const MONTH_NAMES =
  'January|February|March|April|May|June|July|August|September|October|November|December'

// Processes WordPress post HTML content, replacing date references with live values.
//
// Safe rules (no false positives on birthstone/fixed content):
//   1. Explicit shortcodes:  [month], [year], [month_year]
//   2. "[Month] [Year]"  e.g. "May 2026" → current monthYear
//      SAFE because birthstone text never includes a year ("May birthstone", not "May 2026 birthstone")
//   3. Year after context words: "in 2025", "of 2026", "updated 2025" → current year
//      Only replaces year-1 and current year. Years like 2022/2023/2024 stay fixed (historical).
//   4. Year before data words: "2026 diamond prices" → "{currentYear} diamond prices"
//
// Skipped (unsafe — would break birthstone/fixed content):
//   - Standalone month names without a year ("May", "January", etc.)
//
// HTML-aware: processes only text nodes, never modifies content inside HTML tags or attributes.
export function processContentDates(
  content: string,
  month: string,
  year: number,
  monthYear: string,
): string {
  const recentYears = `${year - 1}|${year}`

  const DATA_WORDS =
    'diamond|moissanite|gem(?:stone)?|pearl|sapphire|ruby|emerald|opal|amethyst|aquamarine|' +
    'jewelry|jewellery|engagement|ring|necklace|bracelet|earring|pendant|band|setting|' +
    'price|market|data|guide|review|comparison|cost|value|report|carat|trend|' +
    'edition|update|best|top|buy|buying|pick|choice|deals?'

  // Split on HTML tags so we only touch text nodes — never attributes or URLs
  return content.replace(/(<[^>]*>)|([^<]+)/g, (_, tag, text) => {
    if (tag) return tag
    if (!text) return ''

    let t = text

    // Rule 1: explicit shortcodes
    t = t
      .replace(/\[month_year\]/gi, monthYear)
      .replace(/\[month\]/gi, month)
      .replace(/\[year\]/gi, String(year))

    // Rule 2: "[Month] [Year]" — any year 2020-2039 paired with a month name
    // Birthstone pages never write "May 2026 birthstone", so this is safe
    t = t.replace(
      new RegExp(`\\b(${MONTH_NAMES})\\s+20[2-3]\\d\\b`, 'gi'),
      monthYear,
    )

    // Rule 3: year after contextual prepositions/verbs
    // Only replaces the previous year and the current year — older years stay fixed
    t = t.replace(
      new RegExp(
        `\\b(in|of|for|since|by|through|during|updated|per|until|as of)\\s+(${recentYears})\\b`,
        'gi',
      ),
      (_: string, prefix: string) => `${prefix} ${year}`,
    )

    // Rule 4: year before a data/content word
    t = t.replace(
      new RegExp(`\\b(${recentYears})\\b(?=\\s+(?:${DATA_WORDS}))`, 'gi'),
      String(year),
    )

    return t
  })
}
