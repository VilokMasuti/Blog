'use client';
import { BookOpen, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col max-w-xl mx-auto gap-10 pt-24 pb-12 min-h-[70vh]">
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
        <span className="text-blue-600 font-serif">BlogHub</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Create, share, and manage your stories in one beautiful space.
      </p>
    </div>
    <div className="flex flex-col gap-6 items-center mt-10 sm:flex-row sm:justify-center">
      <Link
        to="/profile"
        className="flex gap-2 items-center px-8 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg hover:bg-blue-50 transition text-lg font-semibold text-blue-700"
      >
        <BookOpen className="w-6 h-6" /> See Your Blogs
      </Link>
      <Link
        to="/create"
        className="flex gap-2 items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 transition text-lg font-semibold"
      >
        <Plus className="w-6 h-6" /> Create New Blog
      </Link>
    </div>
  </div>
);

export default Home;
