'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../store/slice/blogSlice.js';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.blog);
  const [tags, setTags] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const blogData = {
      title: data.title,
      content: data.content,
      status: data.status || 'published',
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    const result = await dispatch(createBlog(blogData));
    if (result.type === 'blog/createBlog/fulfilled') {
      navigate(`/blog/${result.payload._id}`);
    }
  };

  const titleLength = watch('title')?.length || 0;
  const contentLength = watch('content')?.length || 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>

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
              placeholder="Enter your blog title..."
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
              placeholder="Write your blog content here..."
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
              {isLoading ? 'Creating...' : 'Create Blog'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
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

export default CreateBlog;
