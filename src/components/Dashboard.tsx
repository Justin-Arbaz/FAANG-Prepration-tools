import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  Clock, 
  BookOpen,
  Code,
  Users,
  CheckCircle,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

export function Dashboard() {
  const { user } = useAuth();
  const { 
    totalXP, 
    currentStreak, 
    tasks, 
    toggleTask, 
    addTask,
    deleteTask,
    problems, 
    projects, 
    addXP,
    getWeeklyStats,
    badges
  } = useApp();

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'DSA',
    priority: 'medium' as 'low' | 'medium' | 'high',
    estimatedTime: 30,
    xp: 20
  });

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const solvedProblems = problems.filter(p => p.status === 'solved').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const weeklyStats = getWeeklyStats();

  const stats = [
    { 
      name: 'Problems Solved', 
      value: solvedProblems.toString(), 
      change: `+${weeklyStats.problemsSolved}`, 
      changeType: 'positive',
      icon: Code 
    },
    { 
      name: 'Study Streak', 
      value: `${currentStreak} days`, 
      change: 'Active', 
      changeType: 'positive',
      icon: TrendingUp 
    },
    { 
      name: 'Tasks Completed', 
      value: `${completedTasks}/${totalTasks}`, 
      change: `+${weeklyStats.tasksCompleted}`, 
      changeType: 'positive',
      icon: CheckCircle 
    },
    { 
      name: 'Projects Done', 
      value: completedProjects.toString(), 
      change: 'This month', 
      changeType: 'positive',
      icon: Users 
    },
  ];

  const todayTasks = tasks.slice(0, 6);

  const upcomingMilestones = [
    { 
      title: 'Complete DSA Fundamentals', 
      progress: Math.min(100, (solvedProblems / 50) * 100), 
      dueDate: 'Next week',
      target: 50,
      current: solvedProblems
    },
    { 
      title: 'Finish System Design Course', 
      progress: 45, 
      dueDate: '3 days',
      target: 10,
      current: 4
    },
    { 
      title: 'Complete Portfolio Projects', 
      progress: Math.min(100, (completedProjects / 3) * 100), 
      dueDate: 'This month',
      target: 3,
      current: completedProjects
    },
  ];

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        completed: false
      });
      setNewTask({
        title: '',
        category: 'DSA',
        priority: 'medium',
        estimatedTime: 30,
        xp: 20
      });
      setShowAddTask(false);
    }
  };

  const handleDeleteTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(taskId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DSA': return 'bg-blue-500';
      case 'System Design': return 'bg-purple-500';
      case 'Behavioral': return 'bg-green-500';
      case 'Projects': return 'bg-orange-500';
      case 'Resume': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 🚀</h1>
        <p className="text-blue-100 text-lg">
          You're making great progress on your {user?.timeline === '6months' ? '6-month' : '12-month'} journey to {user?.targetCompanies?.join(', ') || 'top tech companies'}
        </p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Level: {user?.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{totalXP} XP earned</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>{badges.length} badges earned</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Tasks</h2>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <button
                onClick={() => setShowAddTask(true)}
                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {showAddTask && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="DSA">DSA</option>
                    <option value="System Design">System Design</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Projects">Projects</option>
                    <option value="Resume">Resume</option>
                  </select>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Time (min)"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) || 30 })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                  <input
                    type="number"
                    placeholder="XP reward"
                    value={newTask.xp}
                    onChange={(e) => setNewTask({ ...newTask, xp: parseInt(e.target.value) || 20 })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div 
                key={task.id} 
                className={`group flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  task.completed 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 dark:border-gray-500 hover:border-green-500'
                }`}>
                  {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(task.category)}`}></div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    task.completed 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.estimatedTime}m
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    +{task.xp} XP
                  </span>
                  <button
                    onClick={(e) => handleDeleteTask(task.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {todayTasks.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No tasks for today</p>
              <button
                onClick={() => setShowAddTask(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                Add your first task
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Milestones */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Milestones</h2>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingMilestones.map((milestone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{milestone.title}</p>
                  <span className="text-xs text-gray-500">{milestone.dueDate}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{milestone.progress.toFixed(0)}% complete</span>
                  <span>{milestone.current}/{milestone.target}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
            View Full Roadmap
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => addXP(10)}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-800 dark:hover:to-emerald-800 transition-all"
          >
            <div className="flex items-center space-x-3">
              <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-800 dark:text-green-200">Start Coding</span>
            </div>
            <ArrowRight className="w-4 h-4 text-green-600 dark:text-green-400" />
          </button>
          
          <button 
            onClick={() => addXP(15)}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800 dark:hover:to-cyan-800 transition-all"
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-800 dark:text-blue-200">Study Session</span>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          
          <button 
            onClick={() => addXP(25)}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800 dark:hover:to-pink-800 transition-all"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-purple-800 dark:text-purple-200">Mock Interview</span>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {tasks.filter(t => t.completed).slice(0, 5).map((task) => (
            <div key={task.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                <p className="text-xs text-gray-500">Completed • +{task.xp} XP</p>
              </div>
              <span className="text-xs text-gray-500">
                {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : 'Today'}
              </span>
            </div>
          ))}
          
          {problems.filter(p => p.status === 'solved').slice(0, 3).map((problem) => (
            <div key={problem.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Code className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{problem.title}</p>
                <p className="text-xs text-gray-500">Solved • {problem.difficulty} • {problem.platform}</p>
              </div>
              <span className="text-xs text-gray-500">{problem.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}