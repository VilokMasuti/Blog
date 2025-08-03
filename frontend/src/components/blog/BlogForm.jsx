
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "../ui/Button"
import Input from "../ui/Input"
import Textarea from "../ui/Textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"

const BlogForm = ({ initialData, onSubmit, isLoading, title }) => {
  const [tags, setTags] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      status: "published",
      ...initialData,
    },
  })

  useEffect(() => {
    if (initialData?.tags) {
      setTags(initialData.tags.join(", "))
    }
  }, [initialData])

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }
    onSubmit(formattedData)
  }

  const contentLength = watch("content")?.length || 0
  const titleLength = watch("title")?.length || 0

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              id="title"
              placeholder="Enter your blog title..."
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
              })}
              className={errors.title ? "border-destructive" : ""}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              {errors.title && <span className="text-destructive">{errors.title.message}</span>}
              <span className="ml-auto">{titleLength}/100</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              rows={15}
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters",
                },
              })}
              className={errors.content ? "border-destructive" : ""}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              {errors.content && <span className="text-destructive">{errors.content.message}</span>}
              <span className="ml-auto">{contentLength} characters</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags
            </label>
            <Input
              id="tags"
              placeholder="react, javascript, web development"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Separate tags with commas</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={isLoading} className="flex-1 sm:flex-none">
              {initialData ? "Update Blog" : "Create Blog"}
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default BlogForm
