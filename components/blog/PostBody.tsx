import { cleanWordPressContent } from '@/lib/content/parseContent'

interface PostBodyProps {
  content: string
}

export default function PostBody({ content }: PostBodyProps) {
  const cleaned = cleanWordPressContent(content)
  return (
    <div className="wp-content" dangerouslySetInnerHTML={{ __html: cleaned }} />
  )
}
