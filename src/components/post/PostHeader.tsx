import { Post } from '../../@types';
import { formatCustomDate } from '../../../utils/formatDate.js'

interface PostHeaderProps {
  post: Post;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  const stationNumber = post.order.toString().padStart(2, '0');

  return (
    <header className="mb-12">

      <h1 className='text-4xl! text-(--line-color-700)! dark:text-(--line-color-200)! drop-shadow-sm font-extrabold mb-4'>Estação #{stationNumber}</h1>

      <div className='relative rounded-sm lg:rounded-xl overflow-hidden'>
        {post.coverImage && (
          <img src={post.coverImage} alt={`Capa de ${post.title}`}
            className="w-full object-cover min-h-20"
          />
        )}
        <h2 className='absolute inset-0 bg-black/30 text-(--line-color-50)! flex items-end justify-start drop-shadow-xl m-0! p-6 text-xl! lg:text-4xl! font-bold'>{post.title}</h2>
      </div>
      <div className="flex justify-center items-center gap-2 m-2">
        <small className='text-center tracking-wider text-sm text-(--line-color-600) dark:text-(--line-color-200) my-2'>{post.author} | {formatCustomDate(post.date)}</small>
        {post.tags && post.tags.split(',').map((tag, idx) => (
          <span key={idx} className="text-(--line-color-300) text-sm font-medium border border-(--line-color-500) rounded-full py-1 px-3">
            #{tag.trim()}
          </span>
        ))}
      </div>



      {post.summary && (
        <p className="text-sm text-theme-text italic leading-relaxed border-l-4 border-(--line-color-500) p-4">
          {post.summary}
        </p>
      )}
    </header>
  );
};