import React, { useState } from 'react';
import { BookOpen, Video, ExternalLink, Bookmark, BookmarkCheck, Star, Filter, Search, Plus, Download } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Resources() {
  const { resources, toggleResourceBookmark, markResourceComplete, addResource, addXP } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddResource, setShowAddResource] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'article' as 'book' | 'course' | 'video' | 'article' | 'github',
    category: 'DSA',
    url: '',
    description: '',
    rating: 5
  });

  const categories = [
    { id: 'all', name: 'All Categories', count: resources.length },
    { id: 'DSA', name: 'Data Structures & Algorithms', count: resources.filter(r => r.category === 'DSA').length },
    { id: 'System Design', name: 'System Design', count: resources.filter(r => r.category === 'System Design').length },
    { id: 'Interview Prep', name: 'Interview Preparation', count: resources.filter(r => r.category === 'Interview Prep').length },
    { id: 'Resume', name: 'Resume & Career', count: resources.filter(r => r.category === 'Resume').length },
    { id: 'Coding', name: 'Programming Languages', count: resources.filter(r => r.category === 'Coding').length },
    { id: 'Projects', name: 'Project Ideas', count: resources.filter(r => r.category === 'Projects').length }
  ];

  const types = [
    { id: 'all', name: 'All Types', icon: '📚' },
    { id: 'book', name: 'Books', icon: '📖' },
    { id: 'course', name: 'Courses', icon: '🎓' },
    { id: 'video', name: 'Videos', icon: '🎥' },
    { id: 'article', name: 'Articles', icon: '📄' },
    { id: 'github', name: 'GitHub Repos', icon: '💻' }
  ];

  const curatedResources = [
    {
      title: 'Cracking the Coding Interview',
      type: 'book',
      category: 'DSA',
      url: 'https://example.com/ctci',
      description: 'The most comprehensive guide to technical interviews',
      rating: 5
    },
    {
      title: 'System Design Primer',
      type: 'github',
      category: 'System Design',
      url: 'https://github.com/donnemartin/system-design-primer',
      description: 'Learn how to design large-scale systems',
      rating: 5
    },
    {
      title: 'LeetCode Patterns',
      type: 'article',
      category: 'DSA',
      url: 'https://example.com/patterns',
      description: '14 patterns to ace any coding interview question',
      rating: 4
    },
    {
      title: 'Behavioral Interview Guide',
      type: 'video',
      category: 'Interview Prep',
      url: 'https://example.com/behavioral',
      description: 'Master the STAR method and common questions',
      rating: 4
    }
  ];

  const handleAddResource = () => {
    if (!newResource.title.trim() || !newResource.url.trim()) return;

    addResource({
      ...newResource,
      completed: false,
      bookmarked: false
    });

    setNewResource({
      title: '',
      type: 'article',
      category: 'DSA',
      url: '',
      description: '',
      rating: 5
    });
    setShowAddResource(false);
    addXP(10);
  };

  const handleAddCuratedResource = (resource: any) => {
    addResource({
      ...resource,
      completed: false,
      bookmarked: true
    });
    addXP(5);
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    const typeObj = types.find(t => t.id === type);
    return typeObj?.icon || '📄';
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Learning Resources 📚</h1>
        <p className="text-blue-100 text-lg">
          Curated collection of books, courses, articles, and tools for FAANG preparation
        </p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>{resources.length} Resources</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5" />
            <span>{resources.filter(r => r.bookmarked).length} Bookmarked</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookmarkCheck className="w-5 h-5" />
            <span>{resources.filter(r => r.completed).length} Completed</span>
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
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
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

          {/* Resource Types */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resource Types</h2>
            <div className="space-y-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedType === type.id
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-xl p-6">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4">📊 Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-700 dark:text-green-300">Completed</span>
                  <span className="text-green-900 dark:text-green-100 font-medium">
                    {resources.filter(r => r.completed).length}/{resources.length}
                  </span>
                </div>
                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${resources.length > 0 ? (resources.filter(r => r.completed).length / resources.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
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
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <button
                onClick={() => setShowAddResource(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Resource</span>
              </button>
            </div>

            {/* Add Resource Form */}
            {showAddResource && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Add New Resource</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Resource title..."
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={newResource.type}
                      onChange={(e) => setNewResource({ ...newResource, type: e.target.value as any })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="article">Article</option>
                      <option value="book">Book</option>
                      <option value="course">Course</option>
                      <option value="video">Video</option>
                      <option value="github">GitHub Repo</option>
                    </select>
                    <select
                      value={newResource.category}
                      onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="DSA">DSA</option>
                      <option value="System Design">System Design</option>
                      <option value="Interview Prep">Interview Prep</option>
                      <option value="Resume">Resume</option>
                      <option value="Coding">Coding</option>
                      <option value="Projects">Projects</option>
                    </select>
                  </div>
                  <input
                    type="url"
                    placeholder="Resource URL..."
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Description..."
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700 dark:text-gray-300">Rating:</label>
                    <select
                      value={newResource.rating}
                      onChange={(e) => setNewResource({ ...newResource, rating: parseInt(e.target.value) })}
                      className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} star{rating > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddResource}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Resource
                    </button>
                    <button
                      onClick={() => setShowAddResource(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Curated Resources */}
          {selectedCategory === 'all' && !searchTerm && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🌟 Curated Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curatedResources.map((resource, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                          <p className="text-sm text-gray-500">{resource.category}</p>
                        </div>
                      </div>
                      <div className="flex">{getRatingStars(resource.rating)}</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Resource</span>
                      </a>
                      <button
                        onClick={() => handleAddCuratedResource(resource)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Add to Library
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                      <p className="text-sm text-gray-500">{resource.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{getRatingStars(resource.rating)}</div>
                    <button
                      onClick={() => toggleResourceBookmark(resource.id)}
                      className={`p-1 rounded transition-colors ${
                        resource.bookmarked
                          ? 'text-yellow-600 hover:text-yellow-700'
                          : 'text-gray-400 hover:text-yellow-600'
                      }`}
                    >
                      {resource.bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open</span>
                    </a>
                  </div>

                  <button
                    onClick={() => markResourceComplete(resource.id)}
                    disabled={resource.completed}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      resource.completed
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {resource.completed ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No resources found</p>
              <button
                onClick={() => setShowAddResource(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                Add your first resource
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}