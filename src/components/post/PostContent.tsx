import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  return (
    <article className="prose prose-slate lg:prose-lg max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            if (typeof children === 'object' && children !== null) {
              const isImage = (children as any).type === 'img' || (children as any).props?.node?.tagName === 'img';
              if (isImage) return <>{children}</>;
            }
            return <p className="mb-4 leading-relaxed">{children}</p>;
          },
          img: ({ node, ...props }) => {
            const [url, label] = props.src?.split('#') || [];

            const classMap: Record<string, string> = {
              small: 'max-w-[200px] shadow-md',
              side: 'max-w-[40%] float-right ml-4 mb-4',
              full: 'w-full shadow-2xl',
              center: 'max-w-[70%] mx-auto display-block'
            };

            const customClass = label ? classMap[label] : 'w-full rounded-xl';

            return (
              <figure className="text-center my-10">
                <img src={url} className={customClass} />
                {props.alt && (
                  <figcaption className="text-sm text-gray-200 mt-2 italic">
                    {props.alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                customStyle={{
                  backgroundColor: 'transparent',
                  padding: 0,
                  margin: 0,
                  fontSize: '0.95rem',
                }}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).trim().replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};