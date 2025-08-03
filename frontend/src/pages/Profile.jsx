'use client';

import { Calendar, Edit, PenTool, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile?.user.name}</h1>
              <p className="text-gray-600">{profile?.user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {formatDate(profile?.user.createdAt)}
              </p>
            </div>
          </div>
          <Link to="/create" className="btn btn-primary">
            <PenTool className="mr-2 h-4 w-4" />
            Write New Blog
          </Link>
        </div>
      </div>

      {/* Blog List */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Your Blog Posts</h2>

        {profile?.blogs.length === 0 ? (
          <div className="text-center py-12">
            <PenTool className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
            <p className="text-gray-600 mb-4">
              Start sharing your thoughts with the world!
            </p>
            <Link to="/create" className="btn btn-primary">
              Write Your First Blog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {profile?.blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-lg font-semibold hover:text-blue-600 transition-colors"
                  >
                    {blog.title}
                  </Link>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${blog._id}`}
                    className="btn btn-outline btn-sm"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
