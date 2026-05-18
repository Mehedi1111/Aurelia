import { fetchWP } from '../client'
import type { WPMenuItem } from '@/types/wordpress'

export async function getNavigationMenu(location = 'PRIMARY'): Promise<WPMenuItem[]> {
  const query = `
    query NavigationMenu($location: MenuLocationEnum!) {
      menuItems(where: { location: $location }, first: 100) {
        nodes {
          id
          label
          uri
          parentId
          childItems {
            nodes { id label uri parentId }
          }
        }
      }
    }
  `
  const data = await fetchWP<{ menuItems: { nodes: WPMenuItem[] } }>(query, { location })
  return data?.menuItems.nodes ?? []
}

export function buildMenuTree(items: WPMenuItem[]): WPMenuItem[] {
  const roots = items.filter(item => !item.parentId)
  return roots
}
