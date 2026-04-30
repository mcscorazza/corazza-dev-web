import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  const isDarkMode = useDarkMode();
  return (
    <article className="
      bg-theme-bg2 p-6 rounded-xl lg:text-base
      prose prose-slate lg:prose-lg max-w-none
      prose-p:text-theme-text prose-p:leading-relaxed text-justify
      
      prose-code:bg-transparent! prose-code:text-theme-muted
      prose-code:before:content-none prose-code:after:content-none

      prose-strong:text-theme-text prose-strong:font-black
      prose-img:block! prose-img:mx-auto! prose-img:shadow-none! prose-img:rounded-none!
      lg:prose-table:w-[60%] lg:prose-table:mx-auto
      prose-th:my-0!
      prose-th:p-2 prose-th:text-left prose-th:font-bold prose-th:text-theme-text
      prose-th:border-b-2 prose-th:border-theme-border

      prose-tr:border-b prose-tr:border-theme-border transition-colors
      prose-td:p-2 prose-td:text-theme-muted prose-td:align-middle

      prose-headings:font-bold
      prose-h2:text-(--line-color-400) prose-h2:mt-12 prose-h2:border-b prose-h2:border-theme-border prose-h2:pb-2
      prose-h3:text-(--line-color-300) dark:prose-h3:text-(--line-color-500) prose-h3:mt-10 prose-h3:mb-2 
      prose-h4:text-(--line-color-200) dark:prose-h4:text-(--line-color-600) prose-h4:mt-10 prose-h4:mb-2
      prose-h5:text-(--line-color-100) dark:prose-h5:text-(--line-color-700) prose-h5:mt-10 prose-h5:mb-2

      prose-a:text-(--line-color) prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:opacity-80

      prose-blockquote:border-l-(--line-color) prose-blockquote:bg-(--line-color)/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-theme-muted prose-blockquote:not-italic
      prose-li:text-theme-text prose-li:marker:text-(--line-color)

      prose-pre:bg-theme-code prose-pre:border prose-pre:border-none prose-pre:shadow-sm
    ">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            if (typeof children === 'object' && children !== null) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const isImage = (children as any).type === 'img' || (children as any).props?.node?.tagName === 'img';
              if (isImage) return <>{children}</>;
            }
            return <p className="mb-4 leading-relaxed">{children}</p>;
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          img: ({ node, ...props }) => {
            const [url, label] = props.src?.split('#') || [];

            const classMap: Record<string, string> = {
              small: 'max-w-[200px]',
              side: 'max-w-[40%] float-right ml-4 mb-4',
              full: 'w-full',
              center: 'max-w-[70%] mx-auto display-block'
            };

            const customClass = label ? classMap[label] : 'w-full';

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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={isDarkMode ? vscDarkPlus : oneLight}
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