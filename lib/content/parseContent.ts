// WordPress content cleanup pipeline.
// All transforms are pure string operations — no DOM parsing, zero runtime cost.
// Order in cleanWordPressContent() matters; don't reorder without testing.

const STYLE_PROPS_TO_STRIP = new Set([
  'font-family','font-size','line-height','color','background-color','background',
  'margin','margin-top','margin-bottom','margin-left','margin-right',
  'padding','padding-top','padding-bottom','padding-left','padding-right',
  'border','border-top','border-bottom','border-left','border-right',
  'border-radius','box-shadow','text-align','vertical-align',
  'width','max-width','min-width','height','float','clear',
  'display','flex','flex-direction','align-items','justify-content',
])

const INLINE_COLOR_MAP: Record<string, string> = {
  '#2ecc71': 'text-green-600','#27ae60': 'text-green-700',
  '#e74c3c': 'text-red-500',  '#c0392b': 'text-red-600',
  '#f39c12': 'text-amber-500','#e67e22': 'text-orange-500',
  '#3498db': 'text-blue-500', '#2980b9': 'text-blue-600',
  'green':   'text-green-600','red':     'text-red-500',
  'orange':  'text-orange-500','blue':   'text-blue-500',
}

const PIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`

// ─── Lasso affiliate plugin ───────────────────────────────────────────────────

// Converts Lasso affiliate boxes → clean au-retailer cards.
// Extracts the retailer link + description; strips CLICK TO VISIT, Lasso Brag, disclosure, etc.
function transformLassoBlocks(html: string): string {
  // Strip Lasso HTML comments first
  let result = html.replace(/<!--\s*LASSO[^-]*-->/gi, '')

  // Also match lasso-display for templates that skip the lasso-container wrapper
  const outerRx = /<div[^>]*class="[^"]*(?:wp-block-affiliate-plugin-lasso|lasso-container|lasso-display)\b[^"]*"[^>]*>/gi
  let safety = 0

  while (safety++ < 30) {
    const match = outerRx.exec(result)
    if (!match) break
    outerRx.lastIndex = 0

    const start = match.index
    const { innerEnd, blockEnd } = findClosingDiv(result, start + match[0].length)
    const inner = result.slice(start + match[0].length, innerEnd)

    // Retailer affiliate link + name (href may come before or after class= in any order)
    const linkTagM = inner.match(/<a\b([^>]*class="[^"]*lasso-title[^"]*"[^>]*)>([\s\S]*?)<\/a>/i)
    const href = linkTagM ? (linkTagM[1].match(/href="([^"]+)"/i)?.[1] ?? '') : ''
    const name = linkTagM ? linkTagM[2].replace(/<[^>]+>/g, '').trim() : ''

    if (!href || !name) {
      // No recognisable Lasso content — strip block entirely
      result = result.slice(0, start) + result.slice(blockEnd)
      continue
    }

    // Description lives in lasso-lite-description (p + ul only, no nested divs)
    const descM = inner.match(/<div[^>]*class="[^"]*lasso-lite-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    const desc = descM ? descM[1].trim() : ''

    const replacement = `\n<div class="au-retailer">` +
      `<div class="au-retailer-header"><a href="${href}" class="au-retailer-name" target="_blank" rel="nofollow sponsored noopener noreferrer">${name}</a></div>` +
      (desc ? `<div class="au-retailer-body">${desc}</div>` : '') +
      `<a href="${href}" class="au-retailer-cta" target="_blank" rel="nofollow sponsored noopener noreferrer">Visit ${name} →</a>` +
      `</div>\n`

    result = result.slice(0, start) + replacement + result.slice(blockEnd)
  }

  return result
}

// ─── Spectra / UAGB ──────────────────────────────────────────────────────────

// Converts Spectra inline-notice → our au-notice. Must run before generic stripper.
// Uses findClosingDiv (depth-counting) — the naive regex stops at the first </div>
// (the inner uagb-notice-text div), leaving an unclosed div that swallows subsequent content.
function transformSpectraNotices(html: string): string {
  const outerRx = /<div[^>]*class="[^"]*wp-block-uagb-inline-notice[^"]*"[^>]*>/gi
  let result = html
  let safety = 0
  while (safety++ < 30) {
    const match = outerRx.exec(result)
    if (!match) break
    outerRx.lastIndex = 0

    const start = match.index
    const { innerEnd, blockEnd } = findClosingDiv(result, start + match[0].length)
    const inner = result.slice(start + match[0].length, innerEnd)

    const titleM = inner.match(/<p[^>]*class="[^"]*uagb-notice-title[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
                || inner.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)

    // Extract body using depth-counting so the inner div is fully captured
    let body = ''
    const bodyOpenM = inner.match(/<div[^>]*class="[^"]*uagb-notice-text[^"]*"[^>]*>/)
    if (bodyOpenM && bodyOpenM.index !== undefined) {
      const afterBodyOpen = bodyOpenM.index + bodyOpenM[0].length
      const { innerEnd: bEnd } = findClosingDiv(inner, afterBodyOpen)
      body = inner.slice(afterBodyOpen, bEnd).trim()
    }
    if (!body) {
      body = inner.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '').trim()
    }

    const title = titleM ? titleM[1].trim() : ''
    const replacement = body
      ? `\n<div class="au-notice">${title ? `<p class="au-notice-title">${title}</p>` : ''}<div class="au-notice-body">${body}</div></div>\n`
      : ''

    result = result.slice(0, start) + replacement + result.slice(blockEnd)
  }
  return result
}

// Helper: given html and position right after an opening <div>, find where its matching </div> closes.
// Returns innerEnd (start of closing </div>) and blockEnd (char after the closing >).
function findClosingDiv(html: string, afterOpen: number): { innerEnd: number; blockEnd: number } {
  let depth = 1
  let i = afterOpen
  while (i < html.length && depth > 0) {
    if (html[i] === '<') {
      if (html.slice(i, i + 5) === '</div') {
        depth--
        if (depth === 0) {
          const innerEnd = i
          const gtPos = html.indexOf('>', i)
          return { innerEnd, blockEnd: gtPos + 1 }
        }
      } else if (html.slice(i, i + 4) === '<div') {
        depth++
      }
    }
    i++
  }
  return { innerEnd: html.length, blockEnd: html.length }
}

// Converts Spectra FAQ accordion → clean au-faq list using depth-counting (regex lookaheads fail on nested divs).
function transformSpectraFAQ(html: string): string {
  const outerRx = /<div[^>]*class="[^"]*wp-block-uagb-faq\b[^"]*"[^>]*>/gi
  let result = html
  let safety = 0
  while (safety++ < 20) {
    const match = outerRx.exec(result)
    if (!match) break
    outerRx.lastIndex = 0

    const start = match.index
    const { innerEnd, blockEnd } = findClosingDiv(result, start + match[0].length)
    const inner = result.slice(start + match[0].length, innerEnd)

    // Strip embedded JSON-LD (we generate our own via extractFAQs)
    const clean = inner.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')

    const items: string[] = []
    const childRx = /<div[^>]*class="[^"]*wp-block-uagb-faq-child[^"]*"[^>]*>([\s\S]*?)(?=<div[^>]*class="[^"]*wp-block-uagb-faq-child|$)/gi
    let m
    while ((m = childRx.exec(clean)) !== null) {
      const chunk = m[1]
      // Spectra uses <h2>/<h3>/<h4 class="uagb-question"> or <span class="uagb-question">
      const qM = chunk.match(/<h[1-6][^>]*class="[^"]*uagb-question[^"]*"[^>]*>([\s\S]*?)<\/h[1-6]>/i)
              || chunk.match(/<span[^>]*class="[^"]*uagb-question[^"]*"[^>]*>([\s\S]*?)<\/span>/i)
      const aM = chunk.match(/<div[^>]*class="[^"]*uagb-faq-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
      // Strip anchor spans, inline tags, then remove leading "Q." prefix
      const q  = qM ? qM[1]
        .replace(/<span[^>]*class="[^"]*uag-toc[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/^\s*Q\.\s*/i, '')
        .trim() : ''
      const a  = aM ? aM[1].trim() : ''
      if (q && a) items.push(`<div class="au-faq-item"><h3 class="au-faq-q">${q}</h3><div class="au-faq-a">${a}</div></div>`)
    }

    const replacement = items.length ? `\n<div class="au-faq">\n${items.join('\n')}\n</div>\n` : ''
    result = result.slice(0, start) + replacement + result.slice(blockEnd)
  }
  return result
}

// Converts manually-coded FAQ blocks (bn-faq-wrapper / faq-item / faq-answer) → au-faq.
// These posts have inline <style> + accordion <script> which get stripped separately.
function transformCustomFAQ(html: string): string {
  const outerRx = /<div[^>]*class="[^"]*(?:bn-faq-wrapper|faq-container)\b[^"]*"[^>]*>/gi
  let result = html
  let safety = 0
  while (safety++ < 20) {
    const match = outerRx.exec(result)
    if (!match) break
    outerRx.lastIndex = 0

    const start = match.index
    const { innerEnd, blockEnd } = findClosingDiv(result, start + match[0].length)
    const inner = result.slice(start + match[0].length, innerEnd)

    const items: string[] = []
    const itemRx = /<div[^>]*class="[^"]*faq-item[^"]*"[^>]*>([\s\S]*?)(?=<div[^>]*class="[^"]*faq-item|$)/gi
    let m
    while ((m = itemRx.exec(inner)) !== null) {
      const chunk = m[1]
      // Question is <h3 class="faq-question"> or <button class="faq-question"> — strip the +/icon span
      const qM = chunk.match(/<(?:h[1-6]|button)[^>]*class="[^"]*faq-question[^"]*"[^>]*>([\s\S]*?)<\/(?:h[1-6]|button)>/i)
      const aM = chunk.match(/<div[^>]*class="[^"]*faq-answer[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
      if (!qM) continue
      const q = qM[1]
        .replace(/<span[^>]*class="[^"]*icon[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '')
        .replace(/<[^>]+>/g, '').trim()
      const a = aM ? aM[1].trim() : ''
      if (q && a) items.push(`<div class="au-faq-item"><h3 class="au-faq-q">${q}</h3><div class="au-faq-a">${a}</div></div>`)
    }

    const replacement = items.length ? `\n<div class="au-faq">\n${items.join('\n')}\n</div>\n` : ''
    result = result.slice(0, start) + replacement + result.slice(blockEnd)
  }
  return result
}

// Strips <!DOCTYPE>, <html>, <head>…</head>, <body> wrappers.
// WordPress custom HTML blocks sometimes contain full pasted documents.
function stripDocumentWrapper(html: string): string {
  let r = html.replace(/<!DOCTYPE[^>]*>/gi, '')
  r = r.replace(/<html[^>]*>|<\/html>/gi, '')
  r = r.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
  r = r.replace(/<body[^>]*>|<\/body>/gi, '')
  return r
}

// Strips [Visual: …] / [Image: …] placeholder spans inserted by editors.
function stripFaqDiagrams(html: string): string {
  return html.replace(/<span[^>]*class="[^"]*faq-diagram[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '')
}

// Handles product-specific FAQ blocks:
//   product-faq-section > faq-wrapper > faq-card > button.faq-q + div.faq-a-container
// Outputs the same au-faq HTML as Spectra and custom FAQ transforms.
function transformProductFAQ(html: string): string {
  let result = html
  let safety = 0
  while (safety++ < 20) {
    const match = /<div[^>]*class="[^"]*product-faq-section[^"]*"[^>]*>/i.exec(result)
    if (!match) break

    const start = match.index
    const { innerEnd, blockEnd } = findClosingDiv(result, start + match[0].length)
    const inner = result.slice(start + match[0].length, innerEnd)

    const headerM = inner.match(/<h[1-6][^>]*class="[^"]*faq-header[^"]*"[^>]*>([\s\S]*?)<\/h[1-6]>/i)
    const headerTitle = headerM ? headerM[1].replace(/<[^>]+>/g, '').trim() : ''

    const items: string[] = []
    let searchFrom = 0
    let cardSafety = 0
    while (cardSafety++ < 50) {
      const cardM = /<div[^>]*class="[^"]*faq-card[^"]*"[^>]*>/i.exec(inner.slice(searchFrom))
      if (!cardM) break

      const cardStart = searchFrom + cardM.index
      const afterCardOpen = cardStart + cardM[0].length
      const { innerEnd: cEnd, blockEnd: cBlock } = findClosingDiv(inner, afterCardOpen)
      const cardInner = inner.slice(afterCardOpen, cEnd)

      const qM = cardInner.match(/<button[^>]*>([\s\S]*?)<\/button>/i)
      const q = qM
        ? qM[1].replace(/<span[^>]*>[\s\S]*?<\/span>/gi, '').replace(/<[^>]+>/g, '').trim()
        : ''

      let a = ''
      const aOpenM = cardInner.match(/<div[^>]*class="[^"]*faq-a-container[^"]*"[^>]*>/)
      if (aOpenM && aOpenM.index !== undefined) {
        const aAfter = aOpenM.index + aOpenM[0].length
        const { innerEnd: aEnd } = findClosingDiv(cardInner, aAfter)
        a = cardInner.slice(aAfter, aEnd)
          .replace(/<span[^>]*class="[^"]*faq-diagram[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '')
          .trim()
      }

      if (q && a) items.push(`<div class="au-faq-item"><h3 class="au-faq-q">${q}</h3><div class="au-faq-a">${a}</div></div>`)
      searchFrom = cBlock
    }

    const header = headerTitle ? `<h2 class="au-faq-section-title">${headerTitle}</h2>` : ''
    const replacement = items.length ? `\n${header}<div class="au-faq">\n${items.join('\n')}\n</div>\n` : ''
    result = result.slice(0, start) + replacement + result.slice(blockEnd)
  }
  return result
}

// Converts aurelia-promo-vault-notice / aurelia-rare-carat-promo → au-deal-promo.
// The inline <style> block is stripped later by removeInlineStyleBlocks.
function transformAureliaPromoNotices(html: string): string {
  const outerRx = /<div[^>]*class="[^"]*(?:aurelia-promo-vault-notice|aurelia-rare-carat-promo)[^"]*"[^>]*>/gi
  let result = html
  let safety = 0
  while (safety++ < 20) {
    const match = outerRx.exec(result)
    if (!match) break
    outerRx.lastIndex = 0

    const start = match.index
    const { innerEnd, blockEnd } = findClosingDiv(result, start + match[0].length)
    let inner = result.slice(start + match[0].length, innerEnd)

    // Remap generic class names to au-deal-promo-* (scoped to this div's inner content only)
    inner = inner
      .replace(/class="headline"/gi, 'class="au-deal-promo-hl"')
      .replace(/class="offer-text"/gi, 'class="au-deal-promo-offer"')
      .replace(/class="shop-link"/gi, 'class="au-deal-promo-cta"')
      .replace(/class="small-print"/gi, 'class="au-deal-promo-note"')
      .replace(/class="vault-link"/gi, 'class="au-deal-promo-note-link"')

    result = result.slice(0, start) + `\n<div class="au-deal-promo">${inner}</div>\n` + result.slice(blockEnd)
  }
  return result
}

// Remaps dlrt-ritani-* and ja-deal-* class names → bn-deal-* (already styled in globals.css).
// Simple string replacement is safe because these prefixed names are unique to these blocks.
function transformRitaniDealNotice(html: string): string {
  return html
    // Ritani (dlrt-ritani-*)
    .replace(/\bdlrt-ritani-container\b/g, 'bn-deal-wrapper')
    .replace(/\bdlrt-ritani-deal-notice\b/g, 'bn-deal-notice')
    .replace(/\bdlrt-ritani-deal-alert\b/g, 'bn-deal-alert')
    .replace(/\bdlrt-ritani-deal-callout\b/g, 'bn-deal-callout')
    .replace(/\bdlrt-ritani-deal-section\b/g, 'bn-deal-vault')
    .replace(/\bdlrt-ritani-deal-title\b/g, 'bn-vault-callout')
    .replace(/\bdlrt-ritani-custom-link\b/g, 'bn-custom-link')
    .replace(/\bdlrt-ritani-code-discount-note\b/g, 'bn-bonus-callout')
    .replace(/\bdlrt-ritani-code\b/g, 'au-promo-code')
    .replace(/\bdlrt-ritani-hr\b/g, 'bn-deal-hr')
    .replace(/\bdlrt-ritani-pro-tip-callout\b/g, 'bn-bonus-callout')
    .replace(/\bdlrt-ritani-pro-tip\b/g, 'bn-bonus-deal')
    .replace(/\bdlrt-ritani-link-separator\b/g, 'text-text-subtle mx-1')
    // James Allen (ja-deal-* / ja-*)
    .replace(/\bja-deal-wrapper\b/g, 'bn-deal-wrapper')
    .replace(/\bja-deal-notice\b/g, 'bn-deal-notice')
    .replace(/\bja-primary-alert\b/g, 'bn-deal-alert')
    .replace(/\bja-deal-callout\b/g, 'bn-deal-callout')
    .replace(/\bja-custom-link\b/g, 'bn-custom-link')
    .replace(/\bja-secondary-deal\b/g, 'bn-deal-vault')
    .replace(/\bja-vault-deal\b/g, 'bn-deal-vault')
    .replace(/\bja-secondary-text\b/g, 'bn-vault-text')
    .replace(/\bja-secondary-callout\b/g, 'bn-bonus-callout')
    .replace(/\bja-vault-callout\b/g, 'bn-bonus-callout')
    .replace(/\bja-secondary-link\b/g, 'bn-secondary-link')
    .replace(/\bja-vault-link\b/g, 'bn-custom-link')
}

// Converts retailer review boxes (class="review-box" itemscope) → au-review-box.
// Pattern used for Blue Nile, James Allen, Rare Carat, Ritani, Taylor & Hart reviews.
// Inline <style> is stripped later by removeInlineStyleBlocks.
function transformReviewBoxes(html: string): string {
  let result = html
  let safety = 0
  while (safety++ < 20) {
    // Require itemscope to avoid matching other .review-box divs
    const match = /<div\b[^>]*class="[^"]*\breview-box\b[^"]*"[^>]*itemscope[^>]*>/i.exec(result)
    if (!match) break

    const start = match.index
    const { innerEnd, blockEnd } = findClosingDiv(result, start + match[0].length)
    const inner = result.slice(start + match[0].length, innerEnd)

    // ── Logo + link (review-header has no nested divs) ─────────────
    const headerM = inner.match(/<div[^>]*class="[^"]*review-header[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    const headerInner = headerM ? headerM[1] : ''
    const aTagM = headerInner.match(/<a\b([^>]*)>([\s\S]*?)<\/a>/i)
    const logoHref = aTagM ? (aTagM[1].match(/href="([^"]+)"/i)?.[1] ?? '#') : '#'
    const imgM = (aTagM ? aTagM[0] : headerInner).match(/<img\b([^>]*)>/i)
    const logoSrc = imgM ? (imgM[1].match(/src="([^"]+)"/i)?.[1] ?? '') : ''
    const logoAlt = imgM ? (imgM[1].match(/alt="([^"]+)"/i)?.[1] ?? '') : ''

    // ── Rating items (iterate with findClosingDiv) ──────────────────
    const ratOpenM = inner.match(/<div[^>]*class="[^"]*ratings-section[^"]*"[^>]*>/)
    const scoreItems: string[] = []
    if (ratOpenM && ratOpenM.index !== undefined) {
      const afterRat = ratOpenM.index + ratOpenM[0].length
      const { innerEnd: ratEnd } = findClosingDiv(inner, afterRat)
      const ratInner = inner.slice(afterRat, ratEnd)

      let ratFrom = 0
      let ratSafety = 0
      while (ratSafety++ < 20) {
        const rimM = /<div[^>]*class="[^"]*rating-item[^"]*"[^>]*>/i.exec(ratInner.slice(ratFrom))
        if (!rimM) break
        const rimStart = ratFrom + rimM.index
        const { innerEnd: rimEnd, blockEnd: rimBlock } = findClosingDiv(ratInner, rimStart + rimM[0].length)
        const rimContent = ratInner.slice(rimStart + rimM[0].length, rimEnd)

        const labelText = rimContent
          .replace(/<span[^>]*class="[^"]*stars[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '')
          .replace(/<[^>]+>/g, '').trim()
        const starsM = rimContent.match(/<span[^>]*class="[^"]*stars[^"]*"[^>]*>([\s\S]*?)<\/span>/i)
        const stars = starsM ? starsM[1].replace(/<[^>]+>/g, '').trim() : ''

        if (labelText && stars) {
          scoreItems.push(
            `<div class="au-review-score"><span class="au-review-score-label">${labelText}</span><span class="au-review-stars">${stars}</span></div>`
          )
        }
        ratFrom = rimBlock
      }
    }

    // ── Review body (no nested divs) ───────────────────────────────
    const bodyM = inner.match(/<div[^>]*class="[^"]*review-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    const bodyHtml = bodyM ? bodyM[1].trim() : ''

    // ── Pros / Cons ────────────────────────────────────────────────
    const pcOpenM = inner.match(/<div[^>]*class="[^"]*pros-cons[^"]*"[^>]*>/)
    let prosItems: string[] = []
    let consItems: string[] = []
    if (pcOpenM && pcOpenM.index !== undefined) {
      const afterPC = pcOpenM.index + pcOpenM[0].length
      const { innerEnd: pcEnd } = findClosingDiv(inner, afterPC)
      const pcInner = inner.slice(afterPC, pcEnd)

      const prosM = pcInner.match(/<div[^>]*class="[^"]*\bpros\b[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
      if (prosM) {
        prosItems = [...prosM[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
          .map(m => m[1].replace(/<span[^>]*>[\s\S]*?<\/span>/gi, '').replace(/<[^>]+>/g, '').trim())
          .filter(Boolean)
      }
      const consM = pcInner.match(/<div[^>]*class="[^"]*\bcons\b[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
      if (consM) {
        consItems = [...consM[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
          .map(m => m[1].replace(/<span[^>]*>[\s\S]*?<\/span>/gi, '').replace(/<[^>]+>/g, '').trim())
          .filter(Boolean)
      }
    }

    // ── Visit button ───────────────────────────────────────────────
    const btnM = inner.match(/<a\b([^>]*class="[^"]*visit-button[^"]*"[^>]*)>([\s\S]*?)<\/a>/i)
    const btnHref  = btnM ? (btnM[1].match(/href="([^"]+)"/i)?.[1] ?? logoHref) : logoHref
    const btnLabel = btnM ? btnM[2].replace(/<[^>]+>/g, '').trim() : 'Visit'

    // ── Build output ───────────────────────────────────────────────
    const logoHtml = logoSrc
      ? `<a href="${logoHref}" target="_blank" rel="nofollow sponsored noopener noreferrer" class="au-review-logo-link"><img src="${logoSrc}" alt="${logoAlt}" class="au-review-logo" loading="lazy"></a>`
      : ''
    const scoresHtml = scoreItems.length ? `<div class="au-review-scores">${scoreItems.join('')}</div>` : ''
    const pcHtml = (prosItems.length || consItems.length)
      ? `\n  <div class="au-review-pros-cons">\n    <div class="au-review-pros"><strong>Pros</strong><ul>${prosItems.map(t => `<li>${t}</li>`).join('')}</ul></div>\n    <div class="au-review-cons"><strong>Cons</strong><ul>${consItems.map(t => `<li>${t}</li>`).join('')}</ul></div>\n  </div>`
      : ''

    const replacement = `\n<div class="au-review-box">\n  <div class="au-review-header">${logoHtml}${scoresHtml}</div>${bodyHtml ? `\n  <div class="au-review-body">${bodyHtml}</div>` : ''}${pcHtml}\n  <a href="${btnHref}" class="au-review-cta" target="_blank" rel="nofollow sponsored noopener noreferrer">${btnLabel} →</a>\n</div>\n`
    result = result.slice(0, start) + replacement + result.slice(blockEnd)
  }
  return result
}

// Strip all <script> tags from post body content — accordion JS, inline analytics, etc.
// (LD+JSON schema is emitted by Next.js pages, not rendered inside dangerouslySetInnerHTML)
function stripInlineScripts(html: string): string {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
}

// Convert Unicode decorative characters to styled HTML elements.
// ─────────────────── (box-drawing) → <hr class="au-divider">
// ❯ / › / » used as inline bullets → styled span (preserve in flow)
function cleanDecorativeChars(html: string): string {
  // Box-drawing horizontal rule lines inside <p> tags → replace the whole <p> with <hr>
  let r = html.replace(
    /<p[^>]*>\s*[─━═─-╿]{4,}\s*<\/p>/gi,
    '<hr class="au-divider">',
  )
  // ❯ used as a standalone paragraph bullet (e.g. <p>❯ some text</p>) → styled list item
  r = r.replace(
    /<p[^>]*>\s*([❯›»▸▶])\s+([\s\S]*?)<\/p>/gi,
    '<p class="au-bullet">$2</p>',
  )
  return r
}

// Removes a deeply-nested div block by counting open/close div tags.
// Regex can't handle arbitrary nesting depth — this does it correctly.
function removeDivBlock(html: string, startPattern: RegExp): string {
  let result = html
  let safety = 0
  while (safety++ < 20) {
    const match = startPattern.exec(result)
    if (!match) break
    startPattern.lastIndex = 0
    const start = match.index
    let depth = 1
    let i = start + match[0].length
    while (i < result.length && depth > 0) {
      if (result[i] === '<') {
        if (result.slice(i, i + 5) === '</div') { depth--; if (depth === 0) { i += result.indexOf('>', i) - i + 1; break } }
        else if (result.slice(i, i + 4) === '<div') depth++
      }
      i++
    }
    result = result.slice(0, start) + result.slice(i)
  }
  return result
}

// Strips ALL remaining UAGB/Spectra wrappers that weren't converted above.
function removeAllSpectraBlocks(html: string): string {
  // Remove TOC blocks (deeply nested — needs depth counting)
  let r = removeDivBlock(html, /<div[^>]*class="[^"]*(?:uagb-toc|wp-block-uagb-table-of-contents)[^"]*"[^>]*>/gi)
  // Remove other uagb block types (counters, icon lists, etc.) — not inline-notice or faq (already converted)
  r = removeDivBlock(r, /<div[^>]*class="[^"]*wp-block-uagb-(?!inline-notice|faq)[^"]*"[^>]*>/gi)
  // TOC shortcodes
  r = r.replace(/\[(?:toc|table_of_contents)[^\]]*\]/gi, '')
  return r
}

// ─── Style cleanup ───────────────────────────────────────────────────────────

// Strip ALL inline <style> blocks — bn-deal-* styles now live in globals.css
function removeInlineStyleBlocks(html: string): string {
  return html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
}

function cleanInlineStyles(html: string): string {
  return html.replace(/\sstyle="([^"]*)"/gi, (_, styleValue: string) => {
    const kept = styleValue.split(';').map(s => s.trim()).filter(Boolean).filter(decl => {
      const [prop] = decl.split(':').map(s => s.trim())
      return prop && !STYLE_PROPS_TO_STRIP.has(prop.toLowerCase())
    })
    return kept.length ? ` style="${kept.join('; ')}"` : ''
  })
}

function mapColorsTailwind(html: string): string {
  return html.replace(/\sstyle="color:\s*([^";]+)[^"]*"/gi, (_, color: string) => {
    const tw = INLINE_COLOR_MAP[color.trim().toLowerCase()]
    return tw ? ` class="${tw}"` : ''
  })
}

// ─── Structural junk ─────────────────────────────────────────────────────────

function stripHiddenInputs(html: string): string {
  return html.replace(/<input[^>]*type="hidden"[^>]*\/?>/gi, '')
}

// Used externally by category page to strip Angular/framework noise
export function cleanCategoryDescription(html: string): string {
  let r = html
  r = r.replace(/\s*class="ng-star-inserted"/gi, '')
  r = r.replace(/ class=""/gi, '')
  return r
}

function removeWPBlockWrappers(html: string): string {
  let r = html.replace(/<!-- \/?wp:[a-z-]+ (\{.*?\} )?-->/g, '')
  r = r.replace(/<p[^>]*>\s*(&nbsp;)?\s*<\/p>/gi, '')
  r = r.replace(/<div[^>]*>\s*<\/div>/gi, '')
  return r
}

// ─── Tables ──────────────────────────────────────────────────────────────────

function makeTablesResponsive(html: string): string {
  let r = html.replace(/<table(\s[^>]*)?>/gi, '<div class="wp-table-wrapper"><table$1 class="wp-table">')
  r = r.replace(/<\/table>/gi, '</table></div>')
  r = r.replace(/<thead>/gi, '<thead class="wp-thead">')
  r = r.replace(/<tbody>/gi, '<tbody class="wp-tbody">')
  return r
}

// ─── Affiliate links ─────────────────────────────────────────────────────────

function cleanAffiliateLinks(html: string): string {
  return html.replace(
    /<a\s([^>]*href="https?:\/\/(?:www\.)?(jamesallen|bluenile|charlesandcolvard|amazon|amzn|ritani|vrai|rarecarat|sjv\.io)[^"]*"[^>]*)>/gi,
    (_, attrs: string) => {
      if (attrs.includes('rel=')) {
        return `<a ${attrs.replace(/rel="([^"]*)"/i, 'rel="nofollow sponsored noopener"')} target="_blank">`
      }
      return `<a ${attrs} rel="nofollow sponsored noopener" target="_blank">`
    },
  )
}

// ─── Images + Pinterest ───────────────────────────────────────────────────────

function optimizeImages(html: string): string {
  return html.replace(/<img\s([^>]*)>/gi, (_, attrs: string) => {
    let out = attrs
    if (!out.includes('loading=')) out += ' loading="lazy"'
    if (!out.includes('decoding=')) out += ' decoding="async"'
    return `<img ${out.trim()}>`
  })
}

function addPinterestButtons(html: string): string {
  // Wrap <img> inside <figure class="wp-block-image"> with pin overlay
  return html.replace(
    /(<figure[^>]*class="[^"]*wp-block-image[^"]*"[^>]*>)\s*(<img\s[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>)/gi,
    (match, figOpen, img, src, alt) => {
      const pinUrl = `https://pinterest.com/pin/create/button/?media=${encodeURIComponent(src)}&description=${encodeURIComponent(alt ?? '')}`
      return `${figOpen}<span class="wp-pin-wrap">${img}<a href="${pinUrl}" class="wp-pin-btn" target="_blank" rel="noopener" aria-label="Save to Pinterest">${PIN_ICON}</a></span>`
    },
  )
}

// ─── Review schema (star ratings) ───────────────────────────────────────────

export interface ReviewData {
  ratingValue: number
  bestRating: number
}

// Detects explicit star/score ratings in WP review post content.
// Looks for patterns like "4.5/5", "4.5 out of 5", data-rating, WP Review Plugin divs.
export function extractReviewRating(html: string): ReviewData | null {
  // WP Review Plugin: <span class="wp-review-total">4.5</span> or data-score="4.5"
  let m = html.match(/data-(?:score|rating)="([0-9.]+)"/)
  if (m) return { ratingValue: parseFloat(m[1]), bestRating: 5 }

  m = html.match(/<[^>]*class="[^"]*(?:wp-review-total|review-total|review-score|overall-score)[^"]*"[^>]*>\s*([0-9.]+)/i)
  if (m) return { ratingValue: parseFloat(m[1]), bestRating: 5 }

  // Explicit "X out of 5" / "X/5" — must be 1–5 range to avoid false positives
  m = html.match(/\b([1-5](?:\.[0-9])?)\s*(?:\/\s*5|out\s+of\s+5)\b/i)
  if (m) {
    const v = parseFloat(m[1])
    if (v >= 1 && v <= 5) return { ratingValue: v, bestRating: 5 }
  }

  // "X out of 10" pattern
  m = html.match(/\b([1-9](?:\.[0-9])?|10)\s*(?:\/\s*10|out\s+of\s+10)\b/i)
  if (m) {
    const v = parseFloat(m[1])
    if (v >= 1 && v <= 10) return { ratingValue: v, bestRating: 10 }
  }

  return null
}

// ─── TOC + FAQ extraction ─────────────────────────────────────────────────────

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export interface FaqEntry {
  question: string
  answer: string
}

export function extractFAQs(html: string): FaqEntry[] {
  const faqs: FaqEntry[] = []
  let m

  // Spectra FAQ (before transform — used in generateMetadata which runs before cleanWordPressContent)
  const spectraRx = /<span[^>]*class="[^"]*uagb-question[^"]*"[^>]*>([\s\S]*?)<\/span>[\s\S]*?<div[^>]*class="[^"]*uagb-faq-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
  while ((m = spectraRx.exec(html)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, '').trim()
    const a = m[2].replace(/<[^>]+>/g, '').trim()
    if (q && a) faqs.push({ question: q, answer: a })
  }

  // Q. / Ans. pattern
  if (faqs.length === 0) {
    const qaRx = /<h[23][^>]*>\s*(?:Q\.|Q:|Q)\s*(.*?)\s*<\/h[23]>\s*<p[^>]*>\s*(?:<strong>)?(?:Ans\.|Ans:|A\.|A:)\s*(?:<\/strong>)?\s*([\s\S]*?)<\/p>/gi
    while ((m = qaRx.exec(html)) !== null) {
      const q = m[1].replace(/<[^>]+>/g, '').trim()
      const a = m[2].replace(/<[^>]+>/g, '').trim()
      if (q && a) faqs.push({ question: q, answer: a })
    }
  }

  // Generic FAQ section h2 + h3+p pairs
  if (faqs.length === 0) {
    const secM = html.match(/<h2[^>]*>[^<]*(?:faq|frequently asked)[^<]*<\/h2>([\s\S]*?)(?=<h2|$)/i)
    if (secM) {
      const pairRx = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi
      while ((m = pairRx.exec(secM[1])) !== null) {
        const q = m[1].replace(/<[^>]+>/g, '').trim()
        const a = m[2].replace(/<[^>]+>/g, '').trim()
        if (q && a) faqs.push({ question: q, answer: a })
      }
    }
  }

  return faqs.slice(0, 10)
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/gi, "'")
    .replace(/&#8216;|&#x2018;/gi, '‘')
    .replace(/&#8217;|&#x2019;/gi, '’')
    .replace(/&#8220;|&#x201C;/gi, '“')
    .replace(/&#8221;|&#x201D;/gi, '”')
    .replace(/&#8211;|&#x2013;/gi, '–')
    .replace(/&#8212;|&#x2014;/gi, '—')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
}

export function extractTableOfContents(html: string): TocEntry[] {
  const entries: TocEntry[] = []
  let m
  const rx = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  while ((m = rx.exec(html)) !== null) {
    const level = parseInt(m[1]) as 2 | 3
    if (level !== 2) continue // TOC shows H2 only
    const rawText = decodeHtmlEntities(m[2].replace(/<[^>]+>/g, '').trim())
    const id = rawText.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80)
    entries.push({ id, text: rawText, level })
  }
  return entries
}

function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (match, level, attrs, content) => {
    if (attrs.includes('id=')) return match
    const plain = decodeHtmlEntities(content.replace(/<[^>]+>/g, '').trim())
    const id = plain.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80)
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`
  })
}

// ─── Diamond IQ quiz embed ────────────────────────────────────────────────────
// The quiz-section custom HTML block stays as HTML — <style> and <script> are
// stripped by the pipeline steps below, and CSS lives in globals.css (.quiz-section).
// QUIZ_SENTINEL kept for backward compatibility with any existing PostBody imports.
export const QUIZ_SENTINEL = '<!--AU_DIAMOND_QUIZ-->'

function embedQuizSentinel(html: string): string {
  // No-op: quiz renders as styled HTML, not a React component.
  // The <style> will be stripped by removeInlineStyleBlocks, <script> by stripInlineScripts.
  return html
}

// ─── Master pipeline ──────────────────────────────────────────────────────────

export function cleanWordPressContent(html: string): string {
  let r = html

  // 0. Strip any full HTML document wrappers (custom HTML blocks sometimes paste entire pages)
  r = stripDocumentWrapper(r)

  // 1. Lasso affiliate boxes → au-retailer cards (before style/script stripping)
  r = transformLassoBlocks(r)

  // 2. Quiz embed sentinel (no-op — quiz HTML renders as-is, CSS is in globals.css)
  r = embedQuizSentinel(r)

  // 3. Deal notice transforms (before style stripping so findClosingDiv isn't confused)
  r = transformAureliaPromoNotices(r)
  r = transformRitaniDealNotice(r)
  r = transformReviewBoxes(r)

  // 4. FAQ transforms (must run before generic Spectra stripper)
  r = transformProductFAQ(r)
  r = transformSpectraNotices(r)
  r = transformSpectraFAQ(r)
  r = transformCustomFAQ(r)
  r = stripFaqDiagrams(r)
  r = removeAllSpectraBlocks(r)

  // 5. Style + script noise
  r = removeInlineStyleBlocks(r)
  r = stripInlineScripts(r)
  r = cleanInlineStyles(r)
  r = mapColorsTailwind(r)

  // 6. Structural junk
  r = stripHiddenInputs(r)
  r = removeWPBlockWrappers(r)

  // 7. Tables
  r = makeTablesResponsive(r)

  // 8. Links & images
  r = cleanAffiliateLinks(r)
  r = optimizeImages(r)
  r = addPinterestButtons(r)

  // 9. Decorative characters → styled HTML
  r = cleanDecorativeChars(r)

  // 10. Heading anchors last (so IDs reflect final text)
  r = addHeadingIds(r)

  return r
}
