import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300'
        />
      </Link>

      {/* Content */}
      <div className='p-3 flex flex-col gap-2 h-[140px] relative'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>

        {/* Hover Slide-Up Button */}
        <Link
          to={`/post/${post.slug}`}
          className='absolute bottom-[-100px] left-0 right-0 group-hover:bottom-2 transition-all duration-500 ease-in-out border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};
