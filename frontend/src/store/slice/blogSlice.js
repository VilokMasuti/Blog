import blogService from '@/services/blogService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getBlogs = createAsyncThunk(
  'blog/getBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogService.getBlogs();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch blogs'
      );
    }
  }
);

// Get single blog
export const getBlog = createAsyncThunk(
  'blog/getBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await blogService.getBlog(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch blog'
      );
    }
  }
);

// Create blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await blogService.createBlog(blogData);
      toast.success('Blog created successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create blog';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const response = await blogService.updateBlog(id, blogData);
      toast.success('Blog updated successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update blog';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await blogService.deleteBlog(id);
      toast.success('Blog deleted successfully!');
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete blog';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Blogs
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
        state.error = null;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Blog
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBlog = action.payload;
        state.error = null;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs.unshift(action.payload);
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBlog = action.payload;
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;
