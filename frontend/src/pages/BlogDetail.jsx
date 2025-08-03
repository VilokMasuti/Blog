import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import { ArrowLeft, Calendar, Edit, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  clearCurrentBlog,
  deleteBlog,
  getBlog,
} from '../store/slice/blogSlice.js';

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentBlog, isLoading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(getBlog(id));
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setDeleteLoading(true);
      const result = await dispatch(deleteBlog(id));
      if (result.type === 'blog/deleteBlog/fulfilled') {
        navigate('/');
      }
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading && !currentBlog) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !currentBlog) {
    return (
      <div className="max-w-xl mx-auto text-center p-6 bg-white rounded-2xl shadow-xl mt-12 border">
        <h2 className="text-2xl font-bold mb-2">Blog Not Found</h2>
        <p className="text-red-600 mb-4">
          {error || "The blog post you're looking for doesn't exist."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const isAuthor =
    user &&
    (user.id === currentBlog.author._id || user._id === currentBlog.author._id);

  return (
    <div className="w-full px-2 py-8 min-h-[90vh] bg-gradient-to-b from-white to-blue-50/20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <div className="relative max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-2xl py-10 px-6 sm:px-10 md:py-12 md:px-14 space-y-8 border border-blue-100">
        {/* Edit/Delete Floating, Desktop-Only */}
        {isAuthor && (
          <div className="absolute top-5 right-5 flex gap-2 z-20">
            <Link
              to={`/edit/${currentBlog._id}`}
              className="flex items-center gap-1 px-4 py-2 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 font-medium shadow transition"
              title="Edit blog"
            >
              <Edit className="w-5 h-5" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 font-medium hover:bg-red-100 shadow transition disabled:opacity-70"
              title="Delete blog"
            >
              <Trash2 className="w-5 h-5" />
              <span className="hidden sm:inline">
                {deleteLoading ? 'Deleting…' : 'Delete'}
              </span>
            </button>
          </div>
        )}

        {/* Blog Header & Meta */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 break-words text-gray-900 tracking-tight">
            {currentBlog.title}
          </h1>
          <div className="flex flex-wrap items-center text-gray-500 text-sm gap-5 mt-3">
            <span className="flex items-center gap-1 truncate max-w-xs">
              <User className="h-4 w-4" />
              <span className="max-w-[100px] md:max-w-[200px] truncate">
                {currentBlog.author.name}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(currentBlog.createdAt)}
            </span>
          </div>
          {currentBlog.updatedAt !== currentBlog.createdAt && (
            <p className="text-xs text-gray-400 mt-1">
              Updated: {formatDate(currentBlog.updatedAt)}
            </p>
          )}
        </div>

        {/* Tags, horizontally scrollable if needed */}
        {currentBlog.tags?.length > 0 && (
          <div className="flex gap-2 mt-1 overflow-x-auto max-w-full pb-2">
            {currentBlog.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap border border-blue-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Blog Content */}
        <article className="prose max-w-none text-gray-900 text-lg leading-relaxed font-normal md:font-medium">
          {/* Support markdown/output as needed; whitespace-pre-line for clean rendering */}
          <div className="whitespace-pre-line">{currentBlog.content}</div>
        </article>

        {/* Footer Meta */}
        <footer className="pt-6 border-t border-blue-100 text-sm flex flex-col md:flex-row md:justify-between gap-3 mt-10 text-gray-400">
          <div>
            Status:{' '}
            <span
              className={
                'font-semibold ' +
                (currentBlog.status === 'published'
                  ? 'text-green-600'
                  : 'text-yellow-600')
              }
            >
              {currentBlog.status}
            </span>
          </div>
          <span>
            Blog ID:{' '}
            <span className="font-mono text-xs text-blue-400">
              {currentBlog._id}
            </span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default BlogDetail;
