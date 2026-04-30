import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export function TrailPage() {
  const { slug } = useParams();
  const [trailData, setTrailData] = useState<any>(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.corazza.dev/api';

  useEffect(() => {
    axios.get(`${apiUrl}/trails/${slug}`)
      .then(res => setTrailData(res.data))
      .catch(err => console.error("Erro ao carregar trilha", err));
  }, [slug]);

  if (!trailData) return <div className="p-20 text-center">Carregando trilha...</div>;

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <header className="mb-12">
        <Link to="/" className="text-blue-600 hover:underline">← Voltar para o início</Link>
        <h1 className="text-5xl font-black text-theme-text mt-4 uppercase">
          {trailData.title}
        </h1>
        <p className="text-slate-500 mt-2">Explore as linhas de aprendizado desta trilha.</p>
      </header>

      <div className="grid gap-8">
        {trailData.lines?.map((line: any) => (
          <section key={line.id} className="bg-theme-bg border border-theme-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-theme-text mb-6">{line.title}</h2>
            <div className="grid gap-3">
              {line.posts?.map((post: any) => (
                <Link
                  key={post.id}
                  to={`/post/${slug}/${line.slug}/${post.slug}`}
                  className="flex items-center justify-between p-4 bg-theme-bg rounded-lg hover:bg-theme-bg2 transition-colors"
                >
                  <span className="font-medium text-theme-text">{post.title}</span>
                  <span className="text-xs text-theme-text2 font-bold uppercase tracking-widest">
                    Estação {post.order}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}