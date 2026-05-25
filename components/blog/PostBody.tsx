import { cleanWordPressContent } from '@/lib/content/parseContent'
import PostBodyInteractive from './PostBodyInteractive'

interface PostBodyProps {
  content: string
  pageUrl?: string
}

export default function PostBody({ content, pageUrl = '' }: PostBodyProps) {
  const cleaned = cleanWordPressContent(content, pageUrl)
  return <PostBodyInteractive html={cleaned} />
}
