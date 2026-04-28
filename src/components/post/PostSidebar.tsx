import { Link } from "react-router-dom";
import { Line, Post } from "../../@types";

interface SidebarProps {
  line: Line,
  posts: Post[],
  currentPostSlug: string,
}

export const PostSidebar = ({ line, posts, currentPostSlug }: SidebarProps) => {

  const currentIndex = posts.findIndex(x => x.slug === currentPostSlug);

  return (
    <div className='sticky top-10 p-8'>
      <h3 className="text-sm font-bold text-(--main-color)! uppercase tracking-widest mb-6">
        {line.title}
      </h3>
      <div className="relative border-l-8 border-(--main-color) ml-3 py-2">

        {posts.map((p, index) => {
          const isCurrent = p.slug === currentPostSlug;
          const isPast = index < currentIndex;

          return (
            <div key={p.slug} className="mb-4 ml-6 relative">
              <div
                className={`absolute -left-9 top-1 w-4 h-4 rounded-full border-2 bg-slate-200 transition-all duration-300
                  ${isCurrent ? 'scale-150 border-(--main-color)' : 'border-slate-500'}`}
              />

              <Link
                to={`/post/${line.trail.slug}/${line.slug}/${p.slug}`}
                className={`text-sm transition-colors flex items-center group
                  ${isCurrent ? 'font-bold text-(--main-color)' :
                    isPast ? 'text-slate-500 hover:text-slate-700' : 'text-slate-300 hover:text-slate-500'}`}
              >
                <span className="opacity-50 mr-2 text-xs shrink-0">
                  {p.order.toString().padStart(2, '0')}
                </span>
                <span className="truncate" title={p.title}>
                  {p.title}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>

  )

}