import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      'author',
      'name email'
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    const blog = new Blog({
      title,
      content,
      author: req.user._id,
      tags: tags || [],
      status: status || 'published',
    });

    await blog.save();
    await blog.populate('author', 'name email');

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content, tags, status } = req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags !== undefined ? tags : blog.tags;
    blog.status = status || blog.status;

    await blog.save();
    await blog.populate('author', 'name email');

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('getMyBlogs error:', error.message);
    res.status(500).json({ message: 'Failed to fetch user blogs' });
  }
};
