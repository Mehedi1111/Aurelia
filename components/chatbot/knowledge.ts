export interface BotLink {
  label: string
  url: string
  affiliate?: boolean
}

export interface BotResponse {
  text: string
  links: BotLink[]
}

interface Topic {
  keywords: string[]
  response: BotResponse
  productSearch: string
}

const TOPICS: Topic[] = [
  {
    keywords: [
      'moissanite vs diamond', 'moissanite diamond', 'difference moissanite',
      'moissanite compare', 'vs diamond', 'moissanite or diamond',
      'what is moissanite', 'moissanite better', 'moissanite real',
      'sparkle', 'sparkly', 'shine', 'brilliant', 'brilliance',
      'which is better', 'moissanite good', 'real diamond',
    ],
    response: {
      text: "Moissanite sparkles more than diamond — it has a higher refractive index — and costs 80–90% less. Mehedi's full comparison breaks down brilliance, durability, and resale value side by side.",
      links: [
        { label: 'Moissanite vs Diamond — Full Comparison', url: '/which-is-more-sparkly-diamond-or-moissanite/' },
        { label: 'Moissanite vs Diamond Price Calculator', url: '/moissanite-vs-diamond-price-calculator/' },
        { label: 'Shop Moissanite at Charles & Colvard', url: 'https://www.charlesandcolvard.com/', affiliate: true },
      ],
    },
    productSearch: 'moissanite',
  },
  {
    keywords: [
      'moissanite price', 'moissanite cost', 'how much moissanite',
      'moissanite cheap', 'moissanite affordable', 'moissanite worth',
      'moissanite ring price', '1 carat moissanite', 'moissanite 1ct',
      'moissanite budget', 'moissanite expensive',
    ],
    response: {
      text: "A 1ct moissanite typically runs $300–$600 — about 90% cheaper than a natural diamond of the same size. Use the calculator to get an exact estimate for any carat weight.",
      links: [
        { label: 'Moissanite Price Calculator', url: '/moissanite-price-calculator/' },
        { label: 'Complete Moissanite Guide', url: '/moissanite/' },
        { label: 'Shop Moissanite', url: 'https://www.charlesandcolvard.com/', affiliate: true },
      ],
    },
    productSearch: 'moissanite ring',
  },
  {
    keywords: [
      'blue nile', 'bluenile', 'blue nile review', 'blue nile promo',
      'blue nile coupon', 'blue nile discount', 'blue nile code',
      'blue nile legit', 'blue nile good', 'blue nile trustworthy',
    ],
    response: {
      text: "Blue Nile is the largest certified diamond retailer online — great prices and a 30-day return policy. Mehedi has verified promo codes that can save you hundreds.",
      links: [
        { label: 'Blue Nile Promo Codes (Verified)', url: '/blue-nile-promo-code/' },
        { label: 'Blue Nile Review by Mehedi', url: '/category/blue-nile-jewelry-reviews-guide/' },
        { label: 'Shop Blue Nile', url: 'https://bluenile.com/?a_aid=66fc3592af524&utm_source=pap&utm_medium=affiliates', affiliate: true },
      ],
    },
    productSearch: 'diamond ring',
  },
  {
    keywords: [
      'james allen', 'james allen review', 'james allen promo',
      'james allen coupon', 'james allen discount', 'james allen code',
      'james allen good', 'james allen legit', '360 diamond', '360 view',
    ],
    response: {
      text: "James Allen has 360° HD video on every diamond — you see exactly what you're buying before spending a cent. Their promo codes stack with sale prices for serious savings.",
      links: [
        { label: 'James Allen Promo Codes', url: '/james-allen-promotional-code/' },
        { label: 'James Allen Review by Mehedi', url: '/james-allen-review/' },
        { label: 'Shop James Allen', url: 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=home', affiliate: true },
      ],
    },
    productSearch: 'diamond ring',
  },
  {
    keywords: [
      'rare carat', 'rarecarat', 'diamond comparison', 'compare diamonds',
      'best diamond price', 'cheapest diamond', 'find diamond',
    ],
    response: {
      text: "Rare Carat is like Google for diamonds — it compares prices from 100+ vendors and flags overpriced stones. Best for buyers who know how to read a GIA report.",
      links: [
        { label: 'Best Place to Buy Engagement Rings Online', url: '/best-place-to-buy-engagement-rings-online-tool/' },
        { label: 'Top Jewelry Retailers Ranked', url: '/top-jewelry-retailers/' },
        { label: 'Compare on Rare Carat', url: 'https://www.awin1.com/cread.php?awinmid=44489&awinaffid=1756887&ued=https%3A%2F%2Fwww.rarecarat.com%2F', affiliate: true },
      ],
    },
    productSearch: 'diamond',
  },
  {
    keywords: [
      'engagement ring', 'propose', 'proposal', 'ring for her',
      'best ring', 'buy ring online', 'engagement', 'wedding ring',
      'promise ring', 'ring', 'getting engaged', 'i want to propose',
    ],
    response: {
      text: "Buying an engagement ring online saves 20–40% vs a local jeweler. Use Mehedi's 3-question finder to get matched to the best retailer for your stone type and budget.",
      links: [
        { label: 'Engagement Ring Retailer Finder Tool', url: '/best-place-to-buy-engagement-rings-online-tool/' },
        { label: 'Top Jewelry Retailers Ranked', url: '/top-jewelry-retailers/' },
        { label: 'Shop James Allen', url: 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=home', affiliate: true },
      ],
    },
    productSearch: 'engagement ring',
  },
  {
    keywords: [
      'lab grown', 'lab diamond', 'laboratory diamond', 'synthetic diamond',
      'man made diamond', 'lab created', 'lgd', 'man-made', 'lab-grown',
      'lab grown worth', 'lab diamond vs', 'are lab diamonds',
    ],
    response: {
      text: "Lab-grown diamonds are chemically identical to natural diamonds but cost 50–70% less. They're GIA certified and visually indistinguishable — even to expert gemologists.",
      links: [
        { label: 'Lab-Grown Diamond Guide', url: '/category/lab-grown-diamond/' },
        { label: 'Diamond 4Cs Explained', url: '/diamond-grading-chart-4-cs-of-diamonds/' },
        { label: 'Shop Lab Diamonds at James Allen', url: 'https://www.jamesallen.com/?a_aid=66fc3592af524&a_cid=dfef9309&chan=lab', affiliate: true },
      ],
    },
    productSearch: 'lab diamond',
  },
  {
    keywords: [
      '4cs', '4 cs', 'cut clarity color carat', 'diamond quality',
      'diamond grade', 'gia', 'diamond certificate', 'grading', 'grade',
      'diamond quality', 'best quality', 'excellent cut', 'vvs', 'vs diamond clarity',
      'what grade', 'diamond clarity', 'diamond color', 'diamond cut',
    ],
    response: {
      text: "Cut is the most important of the 4Cs — it determines how much a diamond sparkles. Mehedi's guide shows exactly which grades to prioritize and where you can save money without sacrificing beauty.",
      links: [
        { label: 'Diamond 4Cs Complete Guide', url: '/diamond-grading-chart-4-cs-of-diamonds/' },
        { label: 'Diamond Cut Chart', url: '/diamond-cut-chart/' },
        { label: 'Diamond Rate Calculator', url: '/diamond-rate-calculator/' },
      ],
    },
    productSearch: 'diamond',
  },
  {
    keywords: [
      'diamond price', 'diamond cost', 'diamond value', 'diamond appraisal',
      'diamond worth', 'how much diamond', 'price of diamond', 'diamond ring cost',
      'diamond budget', '1 carat diamond', '2 carat', 'diamond expensive',
    ],
    response: {
      text: "Diamond prices vary hugely by cut, carat, clarity, and color. Use the appraisal calculator to estimate market value — or the resale calculator if you're looking to sell.",
      links: [
        { label: 'Diamond Appraisal Calculator', url: '/diamond-appraisal-calculator/' },
        { label: 'Diamond Rate Calculator', url: '/diamond-rate-calculator/' },
        { label: 'Diamond Resale Calculator', url: '/diamond-resale-price-calculator/' },
      ],
    },
    productSearch: 'diamond ring',
  },
  {
    keywords: [
      'coupon', 'promo code', 'discount', 'deal', 'sale', 'savings',
      'code', 'offer', 'save money', 'best deal', 'cheapest',
      'promo', 'voucher', 'percentage off', '% off',
    ],
    response: {
      text: "Mehedi keeps an updated list of verified coupon codes for Blue Nile, James Allen, and Charles & Colvard — some codes save $500+ on a single purchase.",
      links: [
        { label: 'All Jewelry Coupons & Promo Codes', url: '/jewelry-coupons/' },
        { label: 'Blue Nile Promo Code', url: '/blue-nile-promo-code/' },
        { label: 'James Allen Promo Code', url: '/james-allen-promotional-code/' },
      ],
    },
    productSearch: 'jewelry',
  },
  {
    keywords: [
      'pearl', 'akoya', 'freshwater pearl', 'south sea', 'pearl necklace',
      'pearl earring', 'pearl size', 'pearl guide', 'pearl ring', 'pearl bracelet',
      'pearl daily wear', 'pearl jewelry',
    ],
    response: {
      text: "For daily wear, 6.5–7.5mm Akoya pearls hit the sweet spot — elegant but not fragile. The pearl value guide breaks down sizing, luster grades, and what to avoid when buying.",
      links: [
        { label: 'Akoya Pearl Guide by Mehedi', url: '/akoya-pearl-guide/' },
        { label: 'Natural vs Cultured Pearls Explained', url: '/natural-pearls-vs-cultured-pearls/' },
        { label: 'Pearl Value Calculator', url: '/pearl-value-calculator/' },
      ],
    },
    productSearch: 'pearl',
  },
  {
    keywords: [
      'sapphire', 'blue sapphire', 'colored gemstone', 'gemstone ring',
      'colored stone', 'gemstone', 'alternative', 'non-diamond', 'colored ring',
      'padparadscha', 'pink sapphire', 'ruby', 'emerald',
    ],
    response: {
      text: "Sapphires are the most popular diamond alternative for engagement rings — hardness 9/10 and stunning in blue, pink, or padparadscha. Here's everything you need to know.",
      links: [
        { label: 'Sapphire Guide by Mehedi', url: '/category/gemstone/sapphire-guide/' },
        { label: 'Gemstone Buying Guides', url: '/category/gemstone/' },
        { label: 'Shop Blue Nile for Sapphires', url: 'https://bluenile.com/?a_aid=66fc3592af524&utm_source=pap&utm_medium=affiliates', affiliate: true },
      ],
    },
    productSearch: 'sapphire',
  },
  {
    keywords: [
      'carat', 'carat size', 'how big', 'ring size', 'finger coverage',
      'mm size', 'size of diamond', 'big diamond', 'large diamond',
      'carat weight', 'looks bigger', 'appear bigger',
    ],
    response: {
      text: "A 1ct round diamond measures about 6.5mm — but carat weight looks very different across shapes. The carat size chart shows actual millimeter dimensions on a finger.",
      links: [
        { label: 'Diamond Carat Size Chart', url: '/diamond-carat-size-chart/' },
        { label: 'Diamond Finger Coverage Calculator', url: '/diamond-finger-coverage-calculator/' },
        { label: 'Diamond Rate Calculator', url: '/diamond-rate-calculator/' },
      ],
    },
    productSearch: 'diamond ring',
  },
  {
    keywords: [
      'charles colvard', 'charles and colvard', 'forever one', 'caydia',
      'moissanite brand', 'best moissanite', 'c&c', 'charles & colvard',
    ],
    response: {
      text: "Charles & Colvard created moissanite jewelry — their Forever One grade is the clearest and most brilliant available, backed by a lifetime warranty.",
      links: [
        { label: 'Complete Moissanite Guide', url: '/moissanite/' },
        { label: 'C&C Discount Code', url: '/charles-and-colvard-discount-code/' },
        { label: 'Shop Charles & Colvard', url: 'https://www.charlesandcolvard.com/', affiliate: true },
      ],
    },
    productSearch: 'moissanite',
  },
  {
    keywords: [
      'where to buy', 'best place to buy', 'best retailer', 'which store',
      'online jewelry', 'jewelry store', 'shop', 'store', 'purchase',
      'retailer', 'who sells', 'where can i buy', 'which website',
      'online store', 'trusted store',
    ],
    response: {
      text: "The best retailer depends on what you're buying. James Allen leads for diamond visualization, Blue Nile for selection, and Charles & Colvard for moissanite.",
      links: [
        { label: 'Top Jewelry Retailers Ranked', url: '/top-jewelry-retailers/' },
        { label: 'Engagement Ring Finder Tool', url: '/best-place-to-buy-engagement-rings-online-tool/' },
        { label: 'All Jewelry Coupons', url: '/jewelry-coupons/' },
      ],
    },
    productSearch: 'jewelry',
  },
  {
    keywords: [
      'resale', 'sell diamond', 'diamond resale', 'sell jewelry',
      'second hand diamond', 'used diamond', 'trade in', 'trade-in',
      'sell my ring', 'pawn', 'resell',
    ],
    response: {
      text: "Natural diamonds resell at 20–50% of retail; lab-grown diamonds resell much lower. The resale calculator gives you a realistic cash offer vs trade-in estimate.",
      links: [
        { label: 'Diamond Resale Price Calculator', url: '/diamond-resale-price-calculator/' },
        { label: 'Diamond Appraisal Calculator', url: '/diamond-appraisal-calculator/' },
        { label: 'Top Retailers Guide', url: '/top-jewelry-retailers/' },
      ],
    },
    productSearch: 'diamond',
  },
  {
    keywords: [
      'necklace', 'pendant', 'chain', 'bracelet', 'earring', 'earrings',
      'jewelry', 'jewellery', 'fine jewelry', 'gold jewelry', 'silver jewelry',
      'gift', 'present', 'anniversary', 'birthday gift', 'gift for her',
    ],
    response: {
      text: "From moissanite pendants to diamond tennis bracelets — Mehedi's shop curates the best fine jewelry across every category and budget.",
      links: [
        { label: 'Shop Fine Jewelry', url: '/shop-fine-jewelry/' },
        { label: 'Top Jewelry Retailers Ranked', url: '/top-jewelry-retailers/' },
        { label: 'All Jewelry Coupons', url: '/jewelry-coupons/' },
      ],
    },
    productSearch: 'jewelry',
  },
]

// ─── Fallback ────────────────────────────────────────────────────────────────
export const FALLBACK: BotResponse = {
  text: "Great question! Mehedi has 400+ expert guides on diamonds, moissanite, pearls, and fine jewelry. Here are some popular starting points:",
  links: [
    { label: 'Moissanite vs Diamond Guide', url: '/which-is-more-sparkly-diamond-or-moissanite/' },
    { label: 'Top Jewelry Retailers Ranked', url: '/top-jewelry-retailers/' },
    { label: 'Shop Fine Jewelry', url: '/shop-fine-jewelry/' },
  ],
}

// ─── Matcher ─────────────────────────────────────────────────────────────────
export function getResponse(userMessage: string): BotResponse {
  const msg = userMessage.toLowerCase()

  let bestScore = 0
  let bestResponse = FALLBACK

  for (const topic of TOPICS) {
    const score = topic.keywords.filter(kw => msg.includes(kw)).length
    if (score > bestScore) {
      bestScore = score
      bestResponse = topic.response
    }
  }

  return bestResponse
}

// Returns the best keyword to use for product search for a given message
export function getProductKeyword(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  // Check specific product categories first
  if (msg.includes('pearl')) return 'pearl'
  if (msg.includes('sapphire')) return 'sapphire'
  if (msg.includes('moissanite')) return 'moissanite'
  if (msg.includes('lab grown') || msg.includes('lab diamond') || msg.includes('lab-grown')) return 'lab diamond'
  if (msg.includes('engagement') || msg.includes('propose') || msg.includes('wedding')) return 'engagement ring'
  if (msg.includes('necklace') || msg.includes('pendant')) return 'necklace'
  if (msg.includes('bracelet')) return 'bracelet'
  if (msg.includes('earring')) return 'earring'
  if (msg.includes('diamond')) return 'diamond ring'
  if (msg.includes('ring')) return 'ring'

  // Generic fallback
  return 'jewelry'
}

// ─── Quick prompts shown in the widget ───────────────────────────────────────
export const QUICK_PROMPTS = [
  'Moissanite vs diamond — which is better?',
  'Best engagement ring retailers?',
  'Blue Nile promo code?',
  'Lab grown diamonds worth it?',
  'Which pearl size for daily wear?',
]
