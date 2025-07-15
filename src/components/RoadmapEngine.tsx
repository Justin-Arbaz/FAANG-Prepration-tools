import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Target, ArrowRight, Star, Trophy, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

export function RoadmapEngine() {
  const { user } = useAuth();
  const { roadmapSteps, completeRoadmapStep, totalXP, addXP } = useApp();
  const [selectedWeek, setSelectedWeek] = useState(1);

  const roadmapPhases = [
    {
      phase: 'Foundation',
      weeks: '1-4',
      description: 'Build strong CS fundamentals',
      color: 'from-blue-500 to-cyan-500',
      progress: calculatePhaseProgress('Foundation')
    },
    {
      phase: 'DSA Mastery',
      weeks: '5-12',
      description: 'Master data structures and algorithms',
      color: 'from-green-500 to-emerald-500',
      progress: calculatePhaseProgress('DSA Mastery')
    },
    {
      phase: 'System Design',
      weeks: '13-18',
      description: 'Learn scalable system architecture',
      color: 'from-purple-500 to-pink-500',
      progress: calculatePhaseProgress('System Design')
    },
    {
      phase: 'Interview Prep',
      weeks: '19-24',
      description: 'Mock interviews and final preparation',
      color: 'from-orange-500 to-red-500',
      progress: calculatePhaseProgress('Interview Prep')
    }
  ];

  function calculatePhaseProgress(phase: string): number {
    const phaseSteps = roadmapSteps.filter(step => step.phase === phase);
    if (phaseSteps.length === 0) return 0;
    const completedSteps = phaseSteps.filter(step => step.completed).length;
    return Math.round((completedSteps / phaseSteps.length) * 100);
  }

  const weeklyPlans = {
    1: {
      title: 'Week 1: Programming Fundamentals',
      goals: [
        'Review time/space complexity basics',
        'Practice basic array and string problems',
        'Set up development environment',
        'Complete onboarding assessments'
      ],
      tasks: [
        { name: 'Complete Big O Notation course', completed: true, xp: 50 },
        { name: 'Solve 10 Easy Array problems', completed: true, xp: 100 },
        { name: 'Solve 5 String manipulation problems', completed: false, xp: 75 },
        { name: 'Setup LeetCode tracking integration', completed: true, xp: 25 },
        { name: 'Watch "Thinking in Algorithms" video series', completed: false, xp: 40 }
      ],
      resources: [
        'Cracking the Coding Interview - Chapter 1',
        'LeetCode Array Problems (Easy)',
        'Khan Academy - Algorithms Course'
      ]
    },
    2: {
      title: 'Week 2: Arrays and Two Pointers',
      goals: [
        'Master two-pointer technique',
        'Practice sliding window problems',
        'Learn prefix sum concepts',
        'Build first portfolio project'
      ],
      tasks: [
        { name: 'Complete Two Pointers module', completed: false, xp: 60 },
        { name: 'Solve 15 Two Pointer problems', completed: false, xp: 120 },
        { name: 'Implement sliding window template', completed: false, xp: 80 },
        { name: 'Start Todo App project', completed: false, xp: 100 },
        { name: 'Record STAR format behavioral answers', completed: false, xp: 50 }
      ],
      resources: [
        'Two Pointers Pattern Guide',
        'Sliding Window Technique Masterclass',
        'React.js Project Tutorial'
      ]
    },
    3: {
      title: 'Week 3: Linked Lists and Stacks',
      goals: [
        'Master linked list operations',
        'Understand stack data structure',
        'Practice recursion problems',
        'Continue portfolio development'
      ],
      tasks: [
        { name: 'Implement linked list from scratch', completed: false, xp: 80 },
        { name: 'Solve 12 Linked List problems', completed: false, xp: 100 },
        { name: 'Master stack operations', completed: false, xp: 60 },
        { name: 'Practice recursion patterns', completed: false, xp: 90 },
        { name: 'Add features to portfolio project', completed: false, xp: 70 }
      ],
      resources: [
        'Linked List Visualization Tool',
        'Stack and Queue Masterclass',
        'Recursion Practice Problems'
      ]
    }
  };

  const currentWeekPlan = weeklyPlans[selectedWeek as keyof typeof weeklyPlans] || weeklyPlans[1];
  const currentWeekSteps = roadmapSteps.filter(step => step.week === selectedWeek);

  const handleCompleteStep = (stepId: string) => {
    completeRoadmapStep(stepId);
  };

  const handleStartWeek = (week: number) => {
    setSelectedWeek(week);
    addXP(5); // Small XP for engagement
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Career Roadmap 🎯</h1>
            <p className="text-purple-100 text-lg">
              {user?.timeline === '6months' ? '6-month' : '12-month'} plan targeting {user?.targetCompanies?.join(', ') || 'top tech companies'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-200">Current Week</p>
            <p className="text-2xl font-bold">Week {selectedWeek}</p>
            <p className="text-sm text-purple-200">{totalXP} XP Total</p>
          </div>
        </div>
      </div>

      {/* Roadmap Phases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roadmapPhases.map((phase, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-lg flex items-center justify-center mb-4`}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{phase.phase}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{phase.description}</p>
            <p className="text-xs text-gray-500 mb-2">Weeks {phase.weeks}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${phase.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${phase.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{phase.progress}% complete</p>
          </div>
        ))}
      </div>

      {/* Week Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((week) => {
            const weekSteps = roadmapSteps.filter(step => step.week === week);
            const completedSteps = weekSteps.filter(step => step.completed).length;
            const isCompleted = weekSteps.length > 0 && completedSteps === weekSteps.length;
            const isInProgress = weekSteps.length > 0 && completedSteps > 0 && completedSteps < weekSteps.length;
            
            return (
              <button
                key={week}
                onClick={() => handleStartWeek(week)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  selectedWeek === week
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : isInProgress
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Week {week}
                {isCompleted && (
                  <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Plan Detail */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{currentWeekPlan.title}</h2>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <button
                onClick={() => addXP(10)}
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Play className="w-3 h-3" />
                <span>Start Week</span>
              </button>
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              This Week's Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentWeekPlan.goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap Steps for Current Week */}
          {currentWeekSteps.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Roadmap Steps</h3>
              <div className="space-y-3">
                {currentWeekSteps.map((step) => (
                  <div 
                    key={step.id} 
                    className={`p-4 rounded-lg border transition-all ${
                      step.completed 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleCompleteStep(step.id)}
                          disabled={step.completed}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            step.completed 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300 dark:border-gray-500 hover:border-green-500'
                          }`}
                        >
                          {step.completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </button>
                        <div>
                          <h4 className={`font-medium ${
                            step.completed 
                              ? 'text-gray-500 line-through' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          +{step.xp} XP
                        </span>
                        {step.completed && (
                          <p className="text-xs text-green-600">
                            Completed {step.completedAt ? new Date(step.completedAt).toLocaleDateString() : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Tasks & Activities</h3>
            <div className="space-y-3">
              {currentWeekPlan.tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${
                      task.completed 
                        ? 'text-gray-500 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.name}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    +{task.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Recommended Resources</h3>
            <div className="space-y-2">
              {currentWeekPlan.resources.map((resource, index) => (
                <button
                  key={index}
                  onClick={() => addXP(5)}
                  className="flex items-center space-x-3 w-full text-left p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{resource}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Overall Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">DSA Fundamentals</span>
                  <span className="text-gray-900 dark:text-white font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">System Design</span>
                  <span className="text-gray-900 dark:text-white font-medium">35%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Behavioral Prep</span>
                  <span className="text-gray-900 dark:text-white font-medium">62%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Projects</span>
                  <span className="text-gray-900 dark:text-white font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-xl p-6">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Focus This Week
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
              Master the two-pointer technique. This pattern appears in 15% of technical interviews!
            </p>
            <button 
              onClick={() => addXP(15)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors"
            >
              Start Practice
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Week Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Steps Completed</span>
                <span className="font-medium">
                  {currentWeekSteps.filter(s => s.completed).length}/{currentWeekSteps.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">XP Available</span>
                <span className="font-medium text-blue-600">
                  {currentWeekSteps.reduce((sum, step) => sum + step.xp, 0)} XP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="font-medium text-green-600">
                  {currentWeekSteps.length > 0 
                    ? Math.round((currentWeekSteps.filter(s => s.completed).length / currentWeekSteps.length) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}