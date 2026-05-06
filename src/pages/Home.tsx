import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Post, TrailSummary } from '../@types';

const apiUrl = import.meta.env.VITE_API_URL || 'https://api.corazza.dev/api';

export const Home = () => {
  const { data: trails, isLoading } = useQuery<TrailSummary[]>({
    queryKey: ['trails-summary'],
    queryFn: () => fetch(`${apiUrl}/trails`).then(res => res.json())
  });

  const { data: recentPosts } = useQuery<Post[]>({
    queryKey: ['recent-posts'],
    queryFn: () => fetch(`${apiUrl}/posts/recent/6`).then(res => res.json())
  });

  if (isLoading) return <div className="p-8 text-theme-text">Carregando mapa...</div>;
  if (!trails) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 xl:px-0 min-h-screen">

      <header className="mb-16 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-theme-text mb-4">
          Bem-vindo ao Blog
        </h1>

      </header>

      {/* SESSÃO 1: POSTS RECENTES */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-theme-text">Estações Recentes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts?.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
              day: '2-digit', month: 'short', year: 'numeric'
            });

            return (
              <Link
                key={post.slug}
                to={`/post/${post.line.trail.slug}/${post.line.slug}/${post.slug}`}
                style={{ '--card-color': post.line.color || '#3b82f6' } as React.CSSProperties}
                className="group flex flex-col bg-theme-bg border border-theme-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-(--card-color)"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🛤️
                    </div>
                  )}

                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20">
                    Estação #{post.order.toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-black uppercase tracking-wider mb-3 text-(--card-color)">
                    {post.line.trail.title} • {post.line.title}
                  </span>
                  <h3 className="text-xl font-bold text-theme-text mb-3 line-clamp-2 group-hover:text-(--card-color) transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-theme-muted line-clamp-3 mb-6 flex-1">
                    {post.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs font-medium text-theme-muted pt-4 border-t border-theme-border">
                    <span className="flex items-center gap-1.5">
                      📅 {formattedDate}
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 group-hover:text-(--card-color) transition-all">
                      Ler agora <span className="text-lg leading-none">→</span>
                    </span>
                  </div>
                </div>

                <div className="h-1 w-full bg-(--card-color) opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-theme-text mb-8">Trilhas de Estudo</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trails.map((trail) => {
            const firstLine = trail.lines[0];
            const startLink = (firstLine && firstLine.firstPostSlug)
              ? `/post/${trail.slug}/${firstLine.slug}/${firstLine.firstPostSlug}`
              : '#';

            return (
              <div key={trail.slug} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-theme-border flex flex-col sm:flex-row gap-8 items-start sm:items-center transition-all hover:border-slate-300 dark:hover:border-slate-600">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-theme-text mb-2">
                    {trail.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-theme-muted mb-6">
                    <span className="flex items-center gap-1">
                      {trail.linesCount} {trail.linesCount === 1 ? 'linha' : 'linhas'}
                    </span>
                    <span className="flex items-center gap-1">
                      {trail.postsCount} {trail.postsCount === 1 ? 'estação' : 'estações'}
                    </span>
                  </div>

                  {startLink !== '#' && (
                    <Link
                      to={startLink}
                      className="inline-flex items-center px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Começar Trilha
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};