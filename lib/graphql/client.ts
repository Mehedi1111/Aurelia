import { GraphQLClient } from 'graphql-request'
import { unstable_cache } from 'next/cache'

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||
  'https://cms.moissanitebyaurelia.com/graphql'

const wpClient = new GraphQLClient(endpoint, {
  headers: { 'Content-Type': 'application/json' },
})

async function _fetchWP<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  try {
    return await wpClient.request<T>(query, variables)
  } catch (error) {
    console.warn('WPGraphQL unavailable:', (error as Error).message?.slice(0, 120))
    return null
  }
}

/**
 * Cached GraphQL fetcher.
 * - In production: responses cached for the duration of the revalidate period
 * - In dev: always fresh (for easier debugging)
 * - Key is hash of query + variables so each unique query gets its own cache slot
 */
export async function fetchWP<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  const key = JSON.stringify({ query: query.replace(/\s+/g, ' ').trim(), variables })

  const cached = unstable_cache(
    () => _fetchWP<T>(query, variables),
    [key],
    { revalidate: 3600, tags: ['wordpress'] },
  )

  return cached()
}

/** Call this from an API route or webhook to bust all WP content cache */
export { unstable_cache }
