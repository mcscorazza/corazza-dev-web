import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Post, TrailSummary } from '../@types';
import { formatCustomDate } from '../../utils/formatDate.js'


export function PostPage() {

  const { trailSlug, lineSlug, postSlug } = useParams();
  const [expandedTrail, setExpandedTrail] = useState<string | null>(null);

  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [linePosts, setLinePosts] = useState<Post[]>([]);
  const [allTrails, setAllTrails] = useState<TrailSummary[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.corazza.dev/api';

  useEffect(() => {
    axios.get(`${apiUrl}/posts/${trailSlug}/${lineSlug}/${postSlug}`)
      .then(res => setCurrentPost(res.data));
  }, [trailSlug, lineSlug, postSlug]);

  useEffect(() => {
    axios.get(`${apiUrl}/trails`)
      .then(res => setAllTrails(res.data))
      .catch(err => console.error("Erro nas trilhas:", err));
  }, [apiUrl]);

  useEffect(() => {
    if (currentPost?.line?.slug && currentPost?.line?.trail?.slug) {
      const tSlug = currentPost.line.trail.slug;
      const lSlug = currentPost.line.slug;

      axios.get(`${apiUrl}/lines/${tSlug}/${lSlug}`)
        .then(res => setLinePosts(res.data))
        .catch(err => console.error("Erro ao carregar timeline:", err));
    }
  }, [currentPost, apiUrl]);

  useEffect(() => {
    if (currentPost) {
      setExpandedTrail(currentPost.line.trail.slug);
    }
  }, [currentPost]);

  if (!currentPost) return <div className="p-10 text-center">Carregando post...</div>;

  return (
    <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1000px_1fr]">
      <aside className="hidden lg:block bg-slate-900/30">
        <div className='sticky top-10 p-8'>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest mb-6">
            {currentPost.line.title}
          </h3>

          <div className="relative border-l-8 border-cyan-500 ml-3 py-2">
            {linePosts.map((p) => {
              const isCurrent = p.slug === currentPost.slug;
              const isPast = linePosts.findIndex(x => x.slug === p.slug) <
                linePosts.findIndex(x => x.slug === currentPost.slug);

              return (
                <div key={p.slug} className="mb-4 ml-6 relative">
                  <div className={`absolute -left-9 top-1 w-4 h-4 rounded-full border-2 bg-slate-100 
                ${isCurrent ? 'border-cyan-600 scale-150' : 'border-slate-700'}`}
                  />

                  <Link
                    to={`/post/${trailSlug}/${lineSlug}/${p.slug}`}
                    className={`text-sm transition-colors block
                  ${isCurrent ? 'font-bold text-cyan-200' :
                        isPast ? 'text-slate-500 hover:text-cyan-500' : 'text-slate-300 hover:text-slate-600'}`}
                  >
                    {p.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <article className="prose prose-sky lg:prose-xl max-w-300 p-6">
        <h1 className='text-4xl! text-cyan-50! drop-shadow-sm font-extrabold'>Estação #{currentPost.order.toString().padStart(2, '0')}</h1>
        <div className='relative rounded-xl overflow-hidden'>
          <img className='w-full object-cover' src={currentPost.coverImage} />
          <h2 className='absolute inset-0 bg-black/70 text-cyan-200! flex items-end justify-start drop-shadow-xl m-0! p-6 text-4xl! font-bold'>{currentPost.title}</h2>
        </div>
        <small className='text-center block tracking-wider text-sm text-cyan-200'>{currentPost.author} | {formatCustomDate(currentPost.date)} | {currentPost.tags}</small>
        <blockquote className='text-slate-300 text-base text-justify leading-relaxed'>{currentPost.summary}</blockquote>

        <div className="prose prose-sm md:prose-base max-w-none font-sans p-6 rounded-xl bg-[#37474f]">
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
            {currentPost.content}
          </ReactMarkdown>
        </div>
      </article>

      <aside className="hidden lg:block bg-slate-900/30">
        <div className='sticky top-10 p-8'>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-6">
            Explorar Conteúdo
          </h3>

          <div className="flex flex-col gap-3">
            {allTrails.map(trail => {
              const isCurrentTrail = trail.slug === currentPost?.line?.trail?.slug;
              const isExpanded = expandedTrail === trail.slug;

              return (
                <div
                  key={trail.id}
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${isCurrentTrail ? 'border-cyan-400 bg-cyan-950 shadow-sm' : 'border-slate-800'
                    }`}
                >
                  <button
                    onClick={() => setExpandedTrail(isExpanded ? null : trail.slug)}
                    className={`w-full text-left p-4 flex flex-col transition-colors ${isExpanded ? 'bg-slate-950/30' : 'bg-slate-900/50 hover:bg-slate-700'
                      }`}
                  >
                    <div className="flex flex-row items-center justify-between w-full">
                      <h4 className={`font-bold text-sm !mt-1 hover:text-cyan-600 ${isCurrentTrail ? 'text-cyan-800' : 'text-slate-400'}`}>
                        <Link to={`/trail/${trail.slug}`}>{trail.title}</Link>
                      </h4>
                      <span className="text-[14px] text-slate-300 ">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-600 uppercase">
                      {trail.lines.length} Linhas • {trail.postsCount} Estações
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="bg-slate-900/50 p-2 flex flex-col gap-1 border-t border-slate-900">
                      {trail.lines.map((line: any) => {
                        const isCurrentLine = trail.slug === currentPost?.line?.trail?.slug && line.slug === currentPost?.line?.slug;

                        return (
                          <Link
                            key={line.slug}
                            to={`/post/${trail.slug}/${line.slug}/${line.firstPostSlug}`}
                            className={`text-xs p-3 rounded-lg flex items-center justify-between group transition-all ${isCurrentLine
                              ? 'bg-cyan-800 text-slate-300 font-bold'
                              : 'text-slate-600 hover:bg-cyan-700 hover:text-cyan-200'
                              }`}
                          >
                            <span>{line.title}</span>
                            {!isCurrentLine && <span className="opacity-0 group-hover:opacity-100">→</span>}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}