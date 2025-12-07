import type React from "react"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0
    let listItems: string[] = []
    let listType: "ul" | "ol" | null = null
    let codeBlock: string[] = []
    let inCodeBlock = false
    let codeLanguage = ""

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType
        elements.push(
          <ListTag
            key={`list-${i}`}
            className={
              listType === "ul"
                ? "list-disc list-inside space-y-2 my-4 text-muted-foreground"
                : "list-decimal list-inside space-y-2 my-4 text-muted-foreground"
            }
          >
            {listItems.map((item, idx) => (
              <li key={idx}>{renderInline(item)}</li>
            ))}
          </ListTag>,
        )
        listItems = []
        listType = null
      }
    }

    const flushCodeBlock = () => {
      if (codeBlock.length > 0) {
        elements.push(
          <div key={`code-${i}`} className="my-6 rounded-lg overflow-hidden border border-border">
            {codeLanguage && (
              <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border">
                {codeLanguage}
              </div>
            )}
            <pre className="bg-muted/50 p-4 overflow-x-auto">
              <code className="text-sm font-mono">{codeBlock.join("\n")}</code>
            </pre>
          </div>,
        )
        codeBlock = []
        codeLanguage = ""
      }
    }

    const renderInline = (text: string): React.ReactNode => {
      // Handle inline code
      text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">$1</code>')

      // Handle bold
      text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')

      // Handle italic
      text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>")

      // Handle links
      text = text.replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-primary underline underline-offset-4 hover:text-primary/80" target="_blank" rel="noopener noreferrer">$1</a>',
      )

      return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    while (i < lines.length) {
      const line = lines[i]

      // Code block
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          flushCodeBlock()
          inCodeBlock = false
        } else {
          flushList()
          inCodeBlock = true
          codeLanguage = line.slice(3).trim()
        }
        i++
        continue
      }

      if (inCodeBlock) {
        codeBlock.push(line)
        i++
        continue
      }

      // Headers
      if (line.startsWith("### ")) {
        flushList()
        elements.push(
          <h3 key={`h3-${i}`} className="font-serif text-xl font-bold mt-8 mb-4 text-foreground">
            {renderInline(line.slice(4))}
          </h3>,
        )
        i++
        continue
      }

      if (line.startsWith("## ")) {
        flushList()
        elements.push(
          <h2
            key={`h2-${i}`}
            className="font-serif text-2xl font-bold mt-10 mb-4 text-foreground border-b border-border pb-2"
          >
            {renderInline(line.slice(3))}
          </h2>,
        )
        i++
        continue
      }

      if (line.startsWith("# ")) {
        flushList()
        elements.push(
          <h1 key={`h1-${i}`} className="font-serif text-3xl font-bold mt-8 mb-6 text-foreground">
            {renderInline(line.slice(2))}
          </h1>,
        )
        i++
        continue
      }

      // Horizontal rule
      if (line.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
        flushList()
        elements.push(<hr key={`hr-${i}`} className="my-8 border-border" />)
        i++
        continue
      }

      // Blockquote
      if (line.startsWith("> ")) {
        flushList()
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="border-l-4 border-primary/50 pl-4 my-6 italic text-muted-foreground"
          >
            {renderInline(line.slice(2))}
          </blockquote>,
        )
        i++
        continue
      }

      // Unordered list
      if (line.match(/^[-*+]\s/)) {
        if (listType !== "ul") {
          flushList()
          listType = "ul"
        }
        listItems.push(line.slice(2))
        i++
        continue
      }

      // Ordered list
      if (line.match(/^\d+\.\s/)) {
        if (listType !== "ol") {
          flushList()
          listType = "ol"
        }
        listItems.push(line.replace(/^\d+\.\s/, ""))
        i++
        continue
      }

      // Empty line
      if (line.trim() === "") {
        flushList()
        i++
        continue
      }

      // Paragraph
      flushList()
      elements.push(
        <p key={`p-${i}`} className="my-4 text-muted-foreground leading-relaxed">
          {renderInline(line)}
        </p>,
      )
      i++
    }

    flushList()
    flushCodeBlock()

    return elements
  }

  if (!content) return null

  return <div className={`prose-custom ${className}`}>{renderMarkdown(content)}</div>
}
