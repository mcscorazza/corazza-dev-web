import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PostHeader } from '../components/post/PostHeader';
import { PostContent } from '../components/post/PostContent';
import { PostSidebar } from '../components/post/PostSidebar';
import axios from 'axios';
import { PostTrails } from '../components/post/PostTrails';
import { generatePalette } from '../../utils/generatePalette.js';
import { useState } from 'react';

export const PostPage = () => {

  const { trailSlug, lineSlug, postSlug } = useParams();
  const [expandedTrail, setExpandedTrail] = useState<string | null>(trailSlug || null);
  const [prevTrailSlug, setPrevTrailSlug] = useState<string | null>(trailSlug || null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.corazza.dev/api';

  const { data: currentPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ['post', trailSlug, lineSlug, postSlug],
    queryFn: () => axios.get(`${apiUrl}/posts/${trailSlug}/${lineSlug}/${postSlug}`).then(res => res.data)
  });

  const { data: allTrails } = useQuery({
    queryKey: ['trails'],
    queryFn: () => axios.get(`${apiUrl}/trails`).then(res => res.data)
  });

  const { data: linePosts } = useQuery({
    queryKey: ['line', currentPost?.line?.trail?.slug, currentPost?.line?.slug],
    queryFn: () => axios.get(`${apiUrl}/lines/${currentPost!.line.trail.slug}/${currentPost!.line.slug}`).then(res => res.data),
    enabled: !!currentPost?.line?.slug
  });

  if (trailSlug !== prevTrailSlug) {
    setPrevTrailSlug(trailSlug || null);
    setExpandedTrail(trailSlug || null);
  };

  if (!currentPost) return <div className="p-10 text-center">Carregando post...</div>;

  if (isLoadingPost) return <div className="p-10 text-center">Carregando estação...</div>;
  if (!currentPost) return <div className="p-10 text-center">Estação não encontrada.</div>;

  const lineColor = currentPost.line.color || "#64748b";
  const palette = generatePalette(lineColor);


  return (
    <div className="w-full mx-auto grid grid-cols-1 xl:grid-cols-[minmax(280px,1fr)_minmax(0,1000px)_minmax(280px,1fr)]"
      style={{
        '--line-color-50': palette[50],
        '--line-color-100': palette[100],
        '--line-color-200': palette[200],
        '--line-color-300': palette[300],
        '--line-color-400': palette[400],
        '--line-color-500': palette[500],
        '--line-color-600': palette[600],
        '--line-color-700': palette[700],
        '--line-color-800': palette[800],
        '--line-color-900': palette[900],
        '--line-color-950': palette[950],
      } as React.CSSProperties}
    >

      <aside className="hidden xl:block min-w-0">
        <PostSidebar line={currentPost.line} posts={linePosts || []} currentPostSlug={currentPost.slug} />
      </aside>

      <main className="prose prose-sky p-2 xl:prose-xl mx-auto lg:p-4 min-w-0 max-w-full xl:max-w-250">
        <PostHeader post={currentPost} />
        <PostContent content={currentPost.content} />
      </main>

      <aside className="hidden xl:block min-w-0">
        <PostTrails
          allTrails={allTrails || []}
          expandedTrail={expandedTrail}
          onToggleTrail={(slug) => setExpandedTrail(expandedTrail === slug ? null : slug)}
          currentTrailSlug={currentPost.line.trail.slug}
          currentLineSlug={currentPost.line.slug}
        />
      </aside>

    </div>
  );
};