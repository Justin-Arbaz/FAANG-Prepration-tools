import React, { useState } from 'react';
import { Network, Layers, Database, Cloud, Zap, BookOpen, CheckCircle, Play, Save, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function SystemDesign() {
  const { systemDesignTopics, updateSystemDesignTopic, completeSystemDesignQuiz, addXP } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('hld');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuiz, setShowQuiz] = useState(false);

  const categories = [
    { id: 'hld', name: 'High-Level Design', icon: Network, description: 'Scalable distributed systems' },
    { id: 'lld', name: 'Low-Level Design', icon: Layers, description: 'Object-oriented design patterns' }
  ];

  const hldProjects = [
    {
      title: 'Design Netflix',
      difficulty: 'Hard',
      completed: false,
      progress: 30,
      concepts: ['CDN', 'Microservices', 'Load Balancing', 'Caching'],
      estimatedTime: '45 min'
    },
    {
      title: 'Design WhatsApp',
      difficulty: 'Medium',
      completed: true,
      progress: 100,
      concepts: ['WebSockets', 'Message Queues', 'Database Sharding'],
      estimatedTime: '30 min'
    },
    {
      title: 'Design Uber',
      difficulty: 'Hard',
      completed: false,
      progress: 0,
      concepts: ['Geolocation', 'Real-time Tracking', 'Payment Systems'],
      estimatedTime: '50 min'
    }
  ];

  const lldProjects = [
    {
      title: 'Design a Chess Game',
      difficulty: 'Medium',
      completed: true,
      progress: 100,
      concepts: ['Strategy Pattern', 'Factory Pattern', 'State Machine'],
      estimatedTime: '40 min'
    },
    {
      title: 'Design a Parking Lot',
      difficulty: 'Easy',
      completed: true,
      progress: 100,
      concepts: ['Abstract Classes', 'Inheritance', 'Encapsulation'],
      estimatedTime: '25 min'
    },
    {
      title: 'Design an ATM System',
      difficulty: 'Medium',
      completed: false,
      progress: 60,
      concepts: ['State Pattern', 'Command Pattern', 'Observer Pattern'],
      estimatedTime: '35 min'
    }
  ];

  const currentProjects = selectedCategory === 'hld' ? hldProjects : lldProjects;
  const currentTopic = selectedTopic ? systemDesignTopics.find(t => t.id === selectedTopic) : null;

  const handleSaveNotes = (topicId: string, notes: string) => {
    updateSystemDesignTopic(topicId, { notes });
  };

  const handleCompleteQuiz = (topicId: string) => {
    const topic = systemDesignTopics.find(t => t.id === topicId);
    if (!topic) return;

    let score = 0;
    topic.quiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });

    const percentage = Math.round((score / topic.quiz.questions.length) * 100);
    completeSystemDesignQuiz(topicId, percentage);
    setShowQuiz(false);
    setQuizAnswers({});
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">System Design Studio 🏗️</h1>
        <p className="text-purple-100 text-lg">
          Master system design through interactive projects and visual learning
        </p>
      </div>

      {/* Category Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 border-2 rounded-xl transition-all ${
                selectedCategory === category.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedCategory === 'hld' ? 'High-Level Design' : 'Low-Level Design'} Projects
              </h2>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {currentProjects.map((project, index) => (
                <div key={index} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        project.completed ? 'bg-green-500' : project.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}></div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-gray-900 dark:text-white font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          project.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.concepts.map((concept, conceptIndex) => (
                      <span key={conceptIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                        {concept}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Est. {project.estimatedTime}</span>
                    <button 
                      onClick={() => addXP(project.completed ? 10 : 25)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        project.completed 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {project.completed ? 'Review' : project.progress > 0 ? 'Continue' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Topics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Interactive Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemDesignTopics.map((topic) => (
                <div key={topic.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">{topic.title}</h3>
                    {topic.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{topic.description}</p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedTopic(topic.id)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Study
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTopic(topic.id);
                        setShowQuiz(true);
                      }}
                      disabled={topic.quiz.completed}
                      className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                        topic.quiz.completed
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {topic.quiz.completed ? `Quiz: ${topic.quiz.score}%` : 'Take Quiz'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Detail Panel */}
        <div className="space-y-6">
          {currentTopic && !showQuiz && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{currentTopic.title}</h3>
                {currentTopic.completed && <Award className="w-5 h-5 text-yellow-500" />}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{currentTopic.description}</p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Notes
                </label>
                <textarea
                  value={currentTopic.notes}
                  onChange={(e) => handleSaveNotes(currentTopic.id, e.target.value)}
                  placeholder="Add your notes here..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => updateSystemDesignTopic(currentTopic.id, { completed: true })}
                  disabled={currentTopic.completed}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTopic.completed
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {currentTopic.completed ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          )}

          {currentTopic && showQuiz && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quiz: {currentTopic.title}</h3>
              
              <div className="space-y-6">
                {currentTopic.quiz.questions.map((question, qIndex) => (
                  <div key={question.id}>
                    <p className="font-medium text-gray-900 dark:text-white mb-3">
                      {qIndex + 1}. {question.question}
                    </p>
                    
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <label key={oIndex} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={oIndex}
                            checked={quizAnswers[question.id] === oIndex}
                            onChange={(e) => setQuizAnswers(prev => ({
                              ...prev,
                              [question.id]: parseInt(e.target.value)
                            }))}
                            className="text-blue-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => handleCompleteQuiz(currentTopic.id)}
                  disabled={Object.keys(quizAnswers).length < currentTopic.quiz.questions.length}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  Submit Quiz
                </button>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Quick Reference */}
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-xl p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-4">📚 Quick Reference</h3>
            <div className="space-y-3">
              {[
                { title: 'CAP Theorem', category: 'Theory' },
                { title: 'Database Types', category: 'Storage' },
                { title: 'API Design', category: 'Communication' },
                { title: 'Caching Patterns', category: 'Performance' }
              ].map((ref, index) => (
                <button 
                  key={index} 
                  onClick={() => addXP(5)}
                  className="w-full text-left p-3 bg-white dark:bg-blue-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <p className="font-medium text-blue-800 dark:text-blue-100">{ref.title}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-200">{ref.category}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}