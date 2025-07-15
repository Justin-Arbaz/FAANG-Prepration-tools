import React, { useState } from 'react';
import { Calendar, Clock, Play, Pause, RotateCcw, CheckCircle, Plus, Timer } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function DailyPlanner() {
  const { tasks, addTask, toggleTask, addStudyTime, addXP } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'DSA',
    priority: 'medium' as 'low' | 'medium' | 'high',
    estimatedTime: 30,
    xp: 20
  });

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          setIsTimerRunning(false);
          addStudyTime(25); // Add 25 minutes of study time
          addXP(10); // Bonus XP for completing pomodoro
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds, addStudyTime, addXP]);

  const weeklyGoals = [
    { goal: 'Complete 15 LeetCode problems', progress: 11, total: 15 },
    { goal: 'Finish Netflix system design', progress: 3, total: 5 },
    { goal: 'Record 5 behavioral answers', progress: 2, total: 5 },
  ];

  const motivationalQuotes = [
    "The expert in anything was once a beginner.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "The best time to plant a tree was 20 years ago. The second best time is now."
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
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Date and Motivation */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Daily Planner 📅</h1>
            <p className="text-green-100 text-lg">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-200">💡 Daily Motivation</p>
            <p className="text-lg italic max-w-sm">
              "{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pomodoro Timer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pomodoro Timer</h2>
              <Timer className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">
                  {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isTimerRunning 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                </button>
                
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerMinutes(25);
                    setTimerSeconds(0);
                  }}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
              
              <div className="flex space-x-2 justify-center">
                {[25, 15, 5].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => {
                      setTimerMinutes(minutes);
                      setTimerSeconds(0);
                      setIsTimerRunning(false);
                    }}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {minutes}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Tasks</h2>
              <button 
                onClick={() => setShowAddTask(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
            
            {showAddTask && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Add New Task</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Task title..."
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={newTask.category}
                      onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Estimated time (minutes)"
                      value={newTask.estimatedTime}
                      onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) || 30 })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder="XP reward"
                      value={newTask.xp}
                      onChange={(e) => setNewTask({ ...newTask, xp: parseInt(e.target.value) || 20 })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddTask}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Task
                    </button>
                    <button
                      onClick={() => setShowAddTask(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg border transition-all ${
                    task.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:shadow-md cursor-pointer'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 dark:border-gray-500 hover:border-green-500'
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(task.category)}`}></div>
                    
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        task.completed 
                          ? 'text-gray-500 line-through' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {task.estimatedTime} min
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500">
                          🍅 {Math.ceil(task.estimatedTime / 25)} pomodoros
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Goals */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Weekly Goals</h3>
            <div className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{goal.goal}</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {goal.progress}/{goal.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Streak */}
          <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-xl p-6">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🔥 Study Streak</h3>
            <p className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-2">7 Days</p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Keep it up! You're building great habits.
            </p>
            <div className="mt-3 flex space-x-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">🔥</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Today's Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</span>
                <span className="font-medium">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Time Studied</span>
                <span className="font-medium">{Math.floor(89 * 60 / 60)}h {(89 * 60) % 60}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">XP Earned</span>
                <span className="font-medium text-blue-600">+{tasks.filter(t => t.completed).reduce((sum, t) => sum + t.xp, 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}