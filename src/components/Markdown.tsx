import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  content: string;
  className?: string;
}

export default function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <div className={`prose prose-neutral max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
          p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
          li: ({ ...props }) => <li className="ml-4" {...props} />,
          a: ({ ...props }) => (
            <a
              className="text-primary-600 hover:text-primary-700 underline focus-ring"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4" {...props} />
          ),
          code: ({ ...props }) => (
            <code className="bg-neutral-100 px-2 py-1 rounded text-sm font-mono" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
