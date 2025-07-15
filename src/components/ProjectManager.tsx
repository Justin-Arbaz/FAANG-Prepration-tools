import React, { useState } from 'react';
import { FolderOpen, Github, ExternalLink, Star, GitBranch, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function ProjectManager() {
  const { projects, addProject, updateProject } = useApp();
  const [selectedTab, setSelectedTab] = useState('active');
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'planning' as 'planning' | 'in-progress' | 'completed',
    progress: 0,
    techStack: [] as string[],
    githubUrl: '',
    liveUrl: '',
    readmeScore: 50,
    testCoverage: 0,
    faangReadiness: 35
  });

  const handleAddProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      addProject({
        ...newProject,
        lastCommit: 'Just created'
      });
      setNewProject({
        name: '',
        description: '',
        status: 'planning',
        progress: 0,
        techStack: [],
        githubUrl: '',
        liveUrl: '',
        readmeScore: 50,
        testCoverage: 0,
        faangReadiness: 35
      });
      setShowAddProject(false);
    }
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    updateProject(id, { [field]: value });
  };

  const checklist = [
    { item: 'Clear README with setup instructions', weight: 20 },
    { item: 'Unit tests with good coverage (>80%)', weight: 25 },
    { item: 'CI/CD pipeline setup', weight: 15 },
    { item: 'Live deployment link', weight: 15 },
    { item: 'Clean, documented code', weight: 10 },
    { item: 'Error handling and validation', weight: 10 },
    { item: 'Responsive design', weight: 5 }
  ];

  const projectIdeas = [
    {
      title: 'Real-time Chat Application',
      difficulty: 'Medium',
      skills: ['WebSockets', 'Authentication', 'Database Design'],
      faangFrequency: 'High'
    },
    {
      title: 'Distributed URL Shortener',
      difficulty: 'Hard',
      skills: ['System Design', 'Caching', 'Load Balancing'],
      faangFrequency: 'Very High'
    },
    {
      title: 'ML-powered Recommendation Engine',
      difficulty: 'Hard',
      skills: ['Machine Learning', 'APIs', 'Data Processing'],
      faangFrequency: 'Medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredProjects = projects.filter(project => {
    if (selectedTab === 'active') return project.status !== 'completed';
    if (selectedTab === 'completed') return project.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Project Portfolio 🚀</h1>
        <p className="text-orange-100 text-lg">
          Build and showcase projects that demonstrate your technical skills to top employers
        </p>
      </div>

      {/* Project Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'active', name: 'Active Projects', count: projects.filter(p => p.status !== 'completed').length },
              { id: 'completed', name: 'Completed', count: projects.filter(p => p.status === 'completed').length },
              { id: 'all', name: 'All Projects', count: projects.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <button
              onClick={() => setShowAddProject(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Project
            </button>
          </div>
          
          {showAddProject && (
            <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Add New Project</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project name..."
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder="Project description..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-20"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as 'planning' | 'in-progress' | 'completed' })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Progress %"
                    value={newProject.progress}
                    onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value) || 0 })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Tech stack (comma separated): React, Node.js, PostgreSQL"
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="url"
                    placeholder="GitHub URL (optional)"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="url"
                    placeholder="Live URL (optional)"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Project
                  </button>
                  <button
                    onClick={() => setShowAddProject(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{project.description}</p>
                    <select
                      value={project.status}
                      onChange={(e) => handleUpdateProject(project.id, 'status', e.target.value)}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(project.status)}`}
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <FolderOpen className="w-8 h-8 text-gray-400 ml-4" />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <input
                      type="number"
                      value={project.progress}
                      onChange={(e) => handleUpdateProject(project.id, 'progress', parseInt(e.target.value) || 0)}
                      className="text-gray-900 dark:text-white font-medium bg-transparent border-0 w-12 text-right"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="flex items-center space-x-1 hover:text-blue-600">
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} className="flex items-center space-x-1 hover:text-blue-600">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                  {project.lastCommit && (
                    <div className="flex items-center space-x-1">
                      <GitBranch className="w-3 h-3" />
                      <span>{project.lastCommit}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">README Score</p>
                    <p className={`font-semibold ${getScoreColor(project.readmeScore)}`}>{project.readmeScore}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Test Coverage</p>
                    <p className={`font-semibold ${getScoreColor(project.testCoverage)}`}>{project.testCoverage}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">FAANG Ready</p>
                    <p className={`font-semibold ${getScoreColor(project.faangReadiness)}`}>{project.faangReadiness}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Quality Checklist */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">📋 FAANG-Ready Checklist</h2>
          <div className="space-y-3">
            {checklist.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{item.item}</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">{item.weight}pts</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Pro Tip:</strong> Projects scoring 85+ significantly increase your chances at FAANG interviews.
            </p>
          </div>
        </div>

        {/* Project Ideas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">💡 Recommended Projects</h2>
          <div className="space-y-4">
            {projectIdeas.map((idea, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{idea.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    idea.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {idea.difficulty}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {idea.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      FAANG Frequency: {idea.faangFrequency}
                    </span>
                  </div>
                  <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors">
                    Start Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub Integration */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Github className="w-8 h-8" />
          <h2 className="text-xl font-semibold">GitHub Integration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">47</p>
            <p className="text-gray-300 text-sm">Repositories</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">324</p>
            <p className="text-gray-300 text-sm">Commits this year</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">12</p>
            <p className="text-gray-300 text-sm">Pull Requests</p>
          </div>
        </div>
        <button className="w-full mt-4 bg-white text-gray-900 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          View GitHub Profile Analysis
        </button>
      </div>
    </div>
  );
}