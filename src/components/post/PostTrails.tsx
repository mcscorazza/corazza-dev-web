import { Link } from "react-router-dom";
import { Trail } from "../../@types";

interface TrailsProps {
  allTrails: Trail[];
  expandedTrail: string | null;
  onToggleTrail: (slug: string) => void;
  currentTrailSlug: string;
  currentLineSlug: string;
}

export const PostTrails = ({
  allTrails,
  expandedTrail,
  onToggleTrail,
  currentTrailSlug,
  currentLineSlug
}: TrailsProps) => {

  return (
    <div className='sticky top-28 p-6'>
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
        Explorar Mapa
      </h3>

      <div className="flex flex-col gap-3">
        {allTrails.map(trail => {
          const isCurrentTrail = trail.slug === currentTrailSlug;
          const isExpanded = expandedTrail === trail.slug;

          return (
            <div
              key={trail.slug}
              className={`rounded-2xl border-2 transition-all overflow-hidden 
                ${isCurrentTrail ? 'border-(--line-color) bg-(--line-color)/5 shadow-sm' : 'border-slate-800'}`}
            >
              <button
                onClick={() => onToggleTrail(trail.slug)}
                className={`w-full text-left p-4 flex flex-col transition-colors 
                  ${isExpanded ? 'bg-slate-900/40' : 'bg-slate-900/10 hover:bg-slate-800'}`}
              >
                <div className="flex flex-row items-center justify-between w-full">
                  <h4 className={`font-bold text-sm mt-1! 
                    ${isCurrentTrail ? 'text-(--line-color)' : 'text-slate-300'}`}>
                    {trail.title}
                  </h4>
                  <span className="text-[14px] text-slate-500">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 uppercase mt-1">
                  {trail.lines?.length || 0} Linhas • {trail.postsCount || 0} Estações
                </span>
              </button>

              {isExpanded && trail.lines && (
                <div className="bg-slate-900/20 p-2 flex flex-col gap-1 border-t border-slate-800">
                  {trail.lines.map((line) => {
                    const isCurrentLine = isCurrentTrail && line.slug === currentLineSlug;

                    return (
                      <Link
                        key={line.slug}
                        to={`/post/${trail.slug}/${line.slug}/${line.firstPostSlug}`}
                        className={`text-xs p-3 rounded-lg flex items-center justify-between group transition-all 
                          ${isCurrentLine
                            ? 'bg-[--line-color]/20 text-(--line-color) font-bold'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                      >
                        <span>{line.title}</span>
                        {!isCurrentLine && <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>}
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
  );
};