import React, { useState } from 'react';
import { Code, Trophy, Target, TrendingUp, Clock, CheckCircle, ExternalLink, Play, Plus, X, Edit } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function CodePractice() {
  const { problems, addProblem, updateProblem, deleteProblem, skills, addXP } = useApp();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showAddProblem, setShowAddProblem] = useState(false);
  const [editingProblem, setEditingProblem] = useState<string | null>(null);
  const [newProblem, setNewProblem] = useState({
    title: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    platform: 'LeetCode',
    status: 'not-started' as 'solved' | 'attempted' | 'not-started',
    attempts: 1,
    timeSpent: 0,
    tags: [] as string[],
    solution: '',
    notes: ''
  });

  const platforms = [
    { id: 'all', name: 'All Platforms', problems: problems.length, icon: '🌐' },
    { id: 'leetcode', name: 'LeetCode', problems: problems.filter(p => p.platform === 'LeetCode').length, icon: '🟢' },
    { id: 'codeforces', name: 'Codeforces', problems: problems.filter(p => p.platform === 'Codeforces').length, icon: '🔵' },
    { id: 'hackerrank', name: 'HackerRank', problems: problems.filter(p => p.platform === 'HackerRank').length, icon: '🟢' },
    { id: 'codechef', name: 'CodeChef', problems: problems.filter(p => p.platform === 'CodeChef').length, icon: '🟤' }
  ];

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = problems.filter(problem => {
    const platformMatch = selectedPlatform === 'all' || 
                         problem.platform.toLowerCase() === selectedPlatform;
    const difficultyMatch = selectedDifficulty === 'all' || 
                           problem.difficulty === selectedDifficulty;
    return platformMatch && difficultyMatch;
  });

  const recommendations = [
    {
      title: 'Validate Binary Search Tree',
      difficulty: 'Medium',
      reason: 'Strengthen your tree traversal skills',
      tags: ['Tree', 'DFS', 'BST'],
      estimatedTime: '20 min',
      platform: 'LeetCode'
    },
    {
      title: 'Course Schedule',
      difficulty: 'Medium',
      reason: 'Practice topological sorting',
      tags: ['Graph', 'DFS', 'Topological Sort'],
      estimatedTime: '30 min',
      platform: 'LeetCode'
    },
    {
      title: 'House Robber II',
      difficulty: 'Medium',
      reason: 'Build on your DP foundation',
      tags: ['Dynamic Programming', 'Array'],
      estimatedTime: '25 min',
      platform: 'LeetCode'
    }
  ];

  const topicStrengths = [
    { topic: 'Arrays', solved: problems.filter(p => p.tags.includes('Array') && p.status === 'solved').length, total: problems.filter(p => p.tags.includes('Array')).length || 1, strength: 85 },
    { topic: 'Strings', solved: problems.filter(p => p.tags.includes('String') && p.status === 'solved').length, total: problems.filter(p => p.tags.includes('String')).length || 1, strength: 80 },
    { topic: 'Trees', solved: problems.filter(p => p.tags.includes('Tree') && p.status === 'solved').length, total: problems.filter(p => p.tags.includes('Tree')).length || 1, strength: 70 },
    { topic: 'Graphs', solved: problems.filter(p => p.tags.includes('Graph') && p.status === 'solved').length, total: problems.filter(p => p.tags.includes('Graph')).length || 1, strength: 45 },
    { topic: 'DP', solved: problems.filter(p => p.tags.includes('Dynamic Programming') && p.status === 'solved').length, total: problems.filter(p => p.tags.includes('Dynamic Programming')).length || 1, strength: 40 },
    { topic: 'Backtracking', solved: problems.filter(p => p.tags.includes('Backtracking') && p.status === 'solved').length, total: problems.filter(p => p.tags.includes('Backtracking')).length || 1, strength: 35 }
  ];

  const handleAddProblem = () => {
    if (newProblem.title.trim()) {
      addProblem({
        ...newProblem,
        date: new Date().toISOString().split('T')[0]
      });
      resetForm();
    }
  };

  const handleUpdateProblem = (problemId: string, field: string, value: any) => {
    updateProblem(problemId, { [field]: value });
    if (field === 'status' && value === 'solved') {
      addXP(10); // Bonus XP for solving
    }
  };

  const handleAddRecommendation = (rec: any) => {
    addProblem({
      title: rec.title,
      difficulty: rec.difficulty as 'Easy' | 'Medium' | 'Hard',
      platform: rec.platform,
      status: 'not-started',
      attempts: 0,
      timeSpent: 0,
      tags: rec.tags,
      date: new Date().toISOString().split('T')[0]
    });
    addXP(5); // Small XP for adding problem
  };

  const resetForm = () => {
    setNewProblem({
      title: '',
      difficulty: 'Medium',
      platform: 'LeetCode',
      status: 'not-started',
      attempts: 1,
      timeSpent: 0,
      tags: [],
      solution: '',
      notes: ''
    });
    setShowAddProblem(false);
    setEditingProblem(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'attempted': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Target className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'attempted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Code Practice Hub 💻</h1>
        <p className="text-green-100 text-lg">
          Track your progress across multiple platforms and get personalized recommendations
        </p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{problems.filter(p => p.status === 'solved').length} Problems Solved</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{Math.floor(problems.reduce((sum, p) => sum + p.timeSpent, 0) / 60)}h Total Time</span>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setSelectedPlatform(platform.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedPlatform === platform.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{platform.icon}</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{platform.name}</h3>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {platform.problems}
            </p>
            <p className="text-xs text-gray-500">problems</p>
          </button>
        ))}
      </div>

      {/* Filters and Add Problem */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Difficulties' : diff}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              {filteredProblems.length} problems
            </span>
          </div>
          
          <button
            onClick={() => setShowAddProblem(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Problem</span>
          </button>
        </div>

        {/* Add/Edit Problem Form */}
        {(showAddProblem || editingProblem) && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
              {editingProblem ? 'Edit Problem' : 'Add New Problem'}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Problem title..."
                value={newProblem.title}
                onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={newProblem.difficulty}
                  onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <select
                  value={newProblem.platform}
                  onChange={(e) => setNewProblem({ ...newProblem, platform: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="LeetCode">LeetCode</option>
                  <option value="Codeforces">Codeforces</option>
                  <option value="HackerRank">HackerRank</option>
                  <option value="CodeChef">CodeChef</option>
                </select>
                <select
                  value={newProblem.status}
                  onChange={(e) => setNewProblem({ ...newProblem, status: e.target.value as 'solved' | 'attempted' | 'not-started' })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="not-started">Not Started</option>
                  <option value="attempted">Attempted</option>
                  <option value="solved">Solved</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Attempts"
                  value={newProblem.attempts}
                  onChange={(e) => setNewProblem({ ...newProblem, attempts: parseInt(e.target.value) || 1 })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Time spent (minutes)"
                  value={newProblem.timeSpent}
                  onChange={(e) => setNewProblem({ ...newProblem, timeSpent: parseInt(e.target.value) || 0 })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <input
                type="text"
                placeholder="Tags (comma separated): Array, Hash Table, Two Pointers"
                onChange={(e) => setNewProblem({ ...newProblem, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <textarea
                placeholder="Solution notes (optional)..."
                value={newProblem.solution}
                onChange={(e) => setNewProblem({ ...newProblem, solution: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-20"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddProblem}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingProblem ? 'Update Problem' : 'Add Problem'}
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(problem.status)}
                  <h3 className="font-medium text-gray-900 dark:text-white">{problem.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingProblem(problem.id);
                      setNewProblem({
                        title: problem.title,
                        difficulty: problem.difficulty,
                        platform: problem.platform,
                        status: problem.status,
                        attempts: problem.attempts,
                        timeSpent: problem.timeSpent,
                        tags: problem.tags,
                        solution: problem.solution || '',
                        notes: problem.notes || ''
                      });
                      setShowAddProblem(true);
                    }}
                    className="p-1 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <select
                    value={problem.status}
                    onChange={(e) => handleUpdateProblem(problem.id, 'status', e.target.value)}
                    className={`text-xs px-2 py-1 border-0 rounded-full ${getStatusColor(problem.status)}`}
                  >
                    <option value="not-started">Not Started</option>
                    <option value="attempted">Attempted</option>
                    <option value="solved">Solved</option>
                  </select>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  <button
                    onClick={() => deleteProblem(problem.id)}
                    className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{problem.platform}</span>
                  <span>Attempts: {problem.attempts}</span>
                  <span>Time: {problem.timeSpent}m</span>
                </div>
                <span>{problem.date}</span>
              </div>
              {problem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {problem.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {problem.solution && (
                <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded text-sm">
                  <strong>Solution:</strong> {problem.solution}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredProblems.length === 0 && (
          <div className="text-center py-8">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No problems found</p>
            <button
              onClick={() => setShowAddProblem(true)}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              Add your first problem
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Topic Analysis</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {topicStrengths.map((topic, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{topic.topic}</span>
                  <span className="text-xs text-gray-500">{topic.solved}/{topic.total}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      topic.strength >= 70 ? 'bg-green-500' :
                      topic.strength >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${topic.strength}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{topic.strength}% mastery</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">🤖 Recommended Practice</h2>
            <Trophy className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{rec.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                    {rec.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{rec.reason}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {rec.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Est. {rec.estimatedTime}</span>
                  <button 
                    onClick={() => handleAddRecommendation(rec)}
                    className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>Add & Solve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">🏆 Weekly Challenge</h2>
        <div className="bg-white dark:bg-purple-800 rounded-lg p-4">
          <h3 className="font-medium text-purple-800 dark:text-purple-100 mb-2">
            Complete 5 Tree Problems
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-200 mb-3">
            Master tree traversal patterns this week. Focus on DFS and BFS approaches.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-full bg-purple-200 dark:bg-purple-700 rounded-full h-2 w-32">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm text-purple-600 dark:text-purple-200">3/5</span>
            </div>
            <span className="text-sm font-medium text-purple-800 dark:text-purple-200">+500 XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}