'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearCurrentBlog,
  getBlog,
  updateBlog,
} from '../store/slice/blogSlice.js';

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBlog, isLoading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [tags, setTags] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    dispatch(getBlog(id));
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentBlog) {
      setValue('title', currentBlog.title);
      setValue('content', currentBlog.content);
      setValue('status', currentBlog.status);
      setTags(
        currentBlog.tags && currentBlog.tags.length > 0
          ? currentBlog.tags.join(', ')
          : ''
      );
    }
  }, [currentBlog, setValue]);

  const onSubmit = async (data) => {
    const blogData = {
      title: data.title,
      content: data.content,
      status: data.status,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    const result = await dispatch(updateBlog({ id, blogData }));
    if (result.type === 'blog/updateBlog/fulfilled') {
      navigate(`/blog/${id}`);
    }
  };

  const titleLength = watch('title')?.length || 0;
  const contentLength = watch('content')?.length || 0;

  if (isLoading && !currentBlog) {
    return (
      <div className="loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go back to home
        </button>
      </div>
    );
  }

  if (currentBlog && currentBlog.author._id !== user?.id) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-red-600 mb-4">
          You are not authorized to edit this blog post.
        </p>
        <button
          onClick={() => navigate(`/blog/${id}`)}
          className="btn btn-primary"
        >
          View blog post
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              {...register('title', {
                required: 'Title is required',
                maxLength: {
                  value: 100,
                  message: 'Title cannot exceed 100 characters',
                },
              })}
              className="form-input"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              {errors.title && (
                <span className="text-red-600">{errors.title.message}</span>
              )}
              <span className="ml-auto">{titleLength}/100</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              {...register('content', {
                required: 'Content is required',
                minLength: {
                  value: 10,
                  message: 'Content must be at least 10 characters',
                },
              })}
              className="form-textarea"
              rows="15"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              {errors.content && (
                <span className="text-red-600">{errors.content.message}</span>
              )}
              <span className="ml-auto">{contentLength} characters</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="form-input"
              placeholder="react, javascript, web development"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate tags with commas (optional)
            </p>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select id="status" {...register('status')} className="form-input">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
