import api from './api';

const blogService = {
  getBlogs: (params) => api.get('/blogs', { params }),
  getBlog: (id) => api.get(`/blogs/${id}`),
  createBlog: (blogData) => api.post('/blogs', blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  getMyBlogs: (params) => api.get('/blogs/user/me', { params }),
};

export default blogService;
