import { cleanWordPressContent } from '@/lib/content/parseContent'
import PostBodyInteractive from './PostBodyInteractive'

interface PostBodyProps {
  content: string
}

export default function PostBody({ content }: PostBodyProps) {
  const cleaned = cleanWordPressContent(content)
  return <PostBodyInteractive html={cleaned} />
}
