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
    <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1000px_1fr]"
      style={{ '--main-color': palette[500], '--text-color' : palette[100], '--bg-color': palette[700] } as React.CSSProperties}
    >

      <aside className="hidden lg:block shrink-0">
        <PostSidebar line={currentPost.line} posts={linePosts || []} currentPostSlug={currentPost.slug} />
      </aside>

      <main className="prose prose-sky p-1 lg:prose-xl max-w-300 lg:p-6">
        <PostHeader post={currentPost} />
        <div className="w-full h-px bg-slate-100 my-10" />
        <PostContent content={currentPost.content} />
      </main>

      <aside className="hidden lg:block shrink-0 center">
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