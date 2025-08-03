'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const BlogForm = ({ initialData, onSubmit, isLoading, title }) => {
  // For modern tag-entry UX: We render each tag as a pill/chip live as you type.
  const [tags, setTags] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      status: 'published',
      ...initialData,
    },
  });

  // Keep tags synced with initialData
  useEffect(() => {
    if (initialData?.tags) setTags(initialData.tags.join(', '));
    if (initialData) reset({ ...initialData });
    // eslint-disable-next-line
  }, [initialData]);

  // LIVE tags as array (for chip rendering)
  const tagList = tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      tags: tagList,
    };
    onSubmit(formattedData);
  };

  const contentLength = watch('content')?.length || 0;
  const titleLength = watch('title')?.length || 0;

  return (
    <Card className="max-w-2xl w-full mx-auto my-10 shadow-xl rounded-2xl bg-gradient-to-br from-white to-blue-50/30 border-0">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-7">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-[1rem] font-medium text-gray-700"
            >
              Title <span className="text-destructive font-bold">*</span>
            </label>
            <Input
              id="title"
              placeholder="A great title catches attention…"
              {...register('title', {
                required: 'Title is required',
                maxLength: { value: 100, message: 'Max 100 chars' },
              })}
              className={`transition-all ${
                errors.title ? 'border-destructive' : ''
              }`}
              autoFocus
              autoComplete="off"
              maxLength={100}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1 min-h-[20px]">
              <span className="text-destructive">{errors.title?.message}</span>
              <span className="ml-auto">{titleLength}/100</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block mb-1 text-[1rem] font-medium text-gray-700"
            >
              Content <span className="text-destructive font-bold">*</span>
            </label>
            <Textarea
              id="content"
              placeholder="Write your story…"
              rows={12}
              {...register('content', {
                required: 'Content is required',
                minLength: { value: 10, message: 'Min 10 chars' },
              })}
              className={`resize-none ${
                errors.content ? 'border-destructive' : ''
              }`}
              spellCheck
              maxLength={10000}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1 min-h-[20px]">
              <span className="text-destructive">
                {errors.content?.message}
              </span>
              <span className="ml-auto">{contentLength} characters</span>
            </div>
          </div>

          {/* Tags - modern chip UI */}
          <div>
            <label
              htmlFor="tags"
              className="block mb-1 text-[1rem] font-medium text-gray-700"
            >
              Tags
            </label>
            <Input
              id="tags"
              placeholder="react, javascript, productivity"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-1"
              autoComplete="off"
            />
            <div className="flex flex-wrap gap-1 pb-1 min-h-[30px]">
              {tagList.length > 0 &&
                tagList.map((tag, i) => (
                  <span
                    key={tag + i}
                    className="bg-blue-100 text-xs px-2 py-1 rounded-full text-blue-800 border border-blue-200"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Separate by comma · Tags help discovery
            </p>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block mb-1 text-[1rem] font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              <option value="published">Published</option>
              <option value="draft">Draft (private)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse items-stretch sm:flex-row sm:items-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="sm:flex-1 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              className="sm:flex-1"
              disabled={isLoading}
            >
              {initialData ? 'Update Blog' : 'Publish Blog'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
