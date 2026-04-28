import { Post } from '../../@types';
import { formatCustomDate } from '../../../utils/formatDate.js'

interface PostHeaderProps {
  post: Post;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  const stationNumber = post.order.toString().padStart(2, '0');

  return (
    <header className="mb-12">

      <h1 className='text-4xl! text-cyan-50! drop-shadow-sm font-extrabold mb-4'>Estação #{stationNumber}</h1>

      <div className='relative rounded-sm lg:rounded-xl overflow-hidden'>
        {post.coverImage && (
          <img src={post.coverImage} alt={`Capa de ${post.title}`}
            className="w-full object-cover min-h-20"
          />
        )}
        <h2 className='absolute inset-0 bg-black/50 text-slate-50! flex items-end justify-start drop-shadow-xl m-0! p-6 text-xl! lg:text-4xl! font-bold'>{post.title}</h2>
      </div>

      <small className='text-center block tracking-wider text-sm text-cyan-200 my-2'>{post.author} | {formatCustomDate(post.date)} | {post.tags}</small>

      <div className="flex justify-center items-center gap-4 mb-4">
        {post.tags && post.tags.split(',').map((tag, idx) => (
          <span key={idx} className="text-slate-100 text-sm font-medium bg-(--line-color)/10 rounded-full py-1 px-4">
            #{tag.trim()}
          </span>
        ))}
      </div>


      {post.summary && (
        <p className="text-sm text-slate-400 leading-relaxed border-l-4 border-(--line-color) pl-4">
          {post.summary}
        </p>
      )}
    </header>
  );
};