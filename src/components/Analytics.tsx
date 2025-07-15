import React from 'react';
import { BarChart3, TrendingUp, Target, Award, Calendar } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Analytics() {
  const { problems, projects, tasks, skills, totalXP, currentStreak, studyTime } = useApp();
  
  const skillsData = Object.entries(skills).map(([skill, score]) => ({
    skill,
    score,
    change: '+' + Math.floor(Math.random() * 15 + 1) // Random change for demo
  }));

  const solvedProblems = problems.filter(p => p.status === 'solved').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const studyHours = Math.floor(studyTime / 60);
  
  const weeklyProgress = [
    { week: 'Week 1', problems: Math.floor(solvedProblems * 0.2), hours: Math.floor(studyHours * 0.2), xp: Math.floor(totalXP * 0.15) },
    { week: 'Week 2', problems: Math.floor(solvedProblems * 0.3), hours: Math.floor(studyHours * 0.25), xp: Math.floor(totalXP * 0.2) },
    { week: 'Week 3', problems: Math.floor(solvedProblems * 0.3), hours: Math.floor(studyHours * 0.3), xp: Math.floor(totalXP * 0.25) },
    { week: 'Week 4', problems: Math.floor(solvedProblems * 0.2), hours: Math.floor(studyHours * 0.25), xp: Math.floor(totalXP * 0.4) },
  ];

  const achievements = [
    { name: 'First Week Complete', earned: true, date: '2024-01-07' },
    { name: 'Problem Solver', earned: true, date: '2024-01-12' },
    { name: 'Consistent Learner', earned: true, date: '2024-01-15' },
    { name: 'Tree Master', earned: false, progress: 78 },
    { name: 'Interview Ready', earned: false, progress: 45 },
    { name: 'System Designer', earned: false, progress: 32 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Progress Analytics 📊</h1>
        <p className="text-indigo-100 text-lg">
          Track your journey with detailed insights and progress metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Total Problems', value: solvedProblems.toString(), change: '+' + problems.filter(p => p.date === new Date().toISOString().split('T')[0]).length + ' this week', icon: Target, color: 'blue' },
          { name: 'Study Hours', value: studyHours + 'h', change: '+8h this week', icon: Calendar, color: 'green' },
          { name: 'Current Streak', value: currentStreak + ' days', change: 'Keep it up!', icon: TrendingUp, color: 'orange' },
          { name: 'Total XP', value: totalXP.toString(), change: '+' + completedTasks * 25 + ' this week', icon: Award, color: 'purple' }
        ].map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{metric.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${metric.color}-100 dark:bg-${metric.color}-900 rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{metric.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Radar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills Assessment</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {skillsData.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.skill}</span>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-gray-500">Technical Skill</p>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Weekly Progress</h2>
          
          <div className="space-y-6">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{week.week}</h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Problems</p>
                    <p className="text-lg font-semibold text-blue-600">{week.problems}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hours</p>
                    <p className="text-lg font-semibold text-green-600">{week.hours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">XP</p>
                    <p className="text-lg font-semibold text-purple-600">{week.xp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Achievements & Badges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border transition-all ${
                achievement.earned 
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' 
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                }`}>
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    achievement.earned 
                      ? 'text-yellow-800 dark:text-yellow-200' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.name}
                  </h3>
                  {achievement.earned ? (
                    <p className="text-xs text-yellow-600 dark:text-yellow-300">
                      Earned {achievement.date}
                    </p>
                  ) : (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                        <div 
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">🤖 AI Recommendations</h2>
        <div className="space-y-3">
          <div className="bg-white dark:bg-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-100 font-medium">Focus on Dynamic Programming</p>
            <p className="text-sm text-blue-600 dark:text-blue-200 mt-1">
              Your DP skills are improving but need more practice. Try 5 medium-level DP problems this week.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-100 font-medium">System Design Practice</p>
            <p className="text-sm text-blue-600 dark:text-blue-200 mt-1">
              Great progress! Continue with distributed systems concepts. Design a chat application next.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-100 font-medium">Mock Interview Scheduling</p>
            <p className="text-sm text-blue-600 dark:text-blue-200 mt-1">
              You're ready for technical mocks. Schedule 2 coding interviews this week to build confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}