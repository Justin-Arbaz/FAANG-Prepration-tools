import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { RoadmapEngine } from './components/RoadmapEngine';
import { DailyPlanner } from './components/DailyPlanner';
import { CodePractice } from './components/CodePractice';
import { SystemDesign } from './components/SystemDesign';
import { ProjectManager } from './components/ProjectManager';
import { ResumeOptimizer } from './components/ResumeOptimizer';
import { InterviewCoach } from './components/InterviewCoach';
import JobMatcher from './components/JobMatcher';
import { Analytics } from './components/Analytics';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AIAssistant } from './components/AIAssistant';
import { Community } from './components/Community';
import { Resources } from './components/Resources';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { OnboardingFlow } from './components/OnboardingFlow';
import { BrowserRouter } from 'react-router-dom';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(!user?.hasCompletedOnboarding);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 pt-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/roadmap" element={<RoadmapEngine />} />
            <Route path="/planner" element={<DailyPlanner />} />
            <Route path="/code-practice" element={<CodePractice />} />
            <Route path="/system-design" element={<SystemDesign />} />
            <Route path="/projects" element={<ProjectManager />} />
            <Route path="/resume" element={<ResumeOptimizer />} />
            <Route path="/interviews" element={<InterviewCoach />} />
            <Route path="/jobs" element={<JobMatcher />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;