import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Plus, Search, Filter, TrendingUp, Users, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Community() {
  const { communityPosts, addCommunityPost, voteCommunityPost, addCommunityReply, addXP } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newReply, setNewReply] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: [] as string[]
  });

  const categories = [
    { id: 'all', name: 'All Posts', count: communityPosts.length },
    { id: 'General', name: 'General', count: communityPosts.filter(p => p.category === 'General').length },
    { id: 'Success Stories', name: 'Success Stories', count: communityPosts.filter(p => p.category === 'Success Stories').length },
    { id: 'Interview Experience', name: 'Interview Experience', count: communityPosts.filter(p => p.category === 'Interview Experience').length },
    { id: 'Study Tips', name: 'Study Tips', count: communityPosts.filter(p => p.category === 'Study Tips').length },
    { id: 'Career Advice', name: 'Career Advice', count: communityPosts.filter(p => p.category === 'Career Advice').length }
  ];

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    addCommunityPost({
      ...newPost,
      author: 'You',
      authorId: 'current-user',
      tags: newPost.tags.filter(tag => tag.trim())
    });

    setNewPost({
      title: '',
      content: '',
      category: 'General',
      tags: []
    });
    setShowNewPost(false);
    addXP(15);
  };

  const handleAddReply = (postId: string) => {
    if (!newReply.trim()) return;

    addCommunityReply(postId, {
      content: newReply,
      author: 'You',
      authorId: 'current-user'
    });

    setNewReply('');
    setReplyingTo(null);
  };

  const filteredPosts = communityPosts
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'replies':
          return b.replies.length - a.replies.length;
        case 'latest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Community Forum 👥</h1>
        <p className="text-green-100 text-lg">
          Connect with fellow FAANG aspirants, share experiences, and learn together
        </p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>{communityPosts.length} Posts</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>{communityPosts.reduce((sum, post) => sum + post.replies.length, 0)} Replies</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Top Contributors */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Contributors</h2>
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', posts: 23, reputation: 1250 },
                { name: 'Mike Johnson', posts: 18, reputation: 980 },
                { name: 'Alex Kumar', posts: 15, reputation: 750 }
              ].map((contributor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{contributor.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{contributor.name}</p>
                    <p className="text-xs text-gray-500">{contributor.posts} posts • {contributor.reputation} rep</p>
                  </div>
                  {index === 0 && <Award className="w-4 h-4 text-yellow-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="latest">Latest</option>
                  <option value="trending">Trending</option>
                  <option value="replies">Most Replies</option>
                </select>
              </div>
              
              <button
                onClick={() => setShowNewPost(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Post</span>
              </button>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Create New Post</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="General">General</option>
                    <option value="Success Stories">Success Stories</option>
                    <option value="Interview Experience">Interview Experience</option>
                    <option value="Study Tips">Study Tips</option>
                    <option value="Career Advice">Career Advice</option>
                  </select>
                  <textarea
                    placeholder="Share your thoughts..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma separated): interview, google, tips"
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCreatePost}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Post
                    </button>
                    <button
                      onClick={() => setShowNewPost(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{post.author[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                        <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                        {post.category}
                      </span>
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => voteCommunityPost(post.id, 'up')}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                        post.userVote === 'up'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{post.upvotes}</span>
                    </button>
                    
                    <button
                      onClick={() => voteCommunityPost(post.id, 'down')}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                        post.userVote === 'down'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm">{post.downvotes}</span>
                    </button>
                    
                    <button
                      onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                      className="flex items-center space-x-1 px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Reply className="w-4 h-4" />
                      <span className="text-sm">{post.replies.length} replies</span>
                    </button>
                  </div>
                </div>

                {/* Replies */}
                {post.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{reply.author[0]}</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white text-sm">{reply.author}</span>
                          <span className="text-xs text-gray-500">{getTimeAgo(reply.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === post.id && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddReply(post.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No posts found</p>
                <button
                  onClick={() => setShowNewPost(true)}
                  className="mt-2 text-green-600 hover:text-green-700 text-sm"
                >
                  Be the first to post!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}