import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Target, Calendar, Briefcase, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    experience: '',
    targetCompanies: [] as string[],
    timeline: '',
    focusAreas: [] as string[],
    currentSkills: {} as Record<string, number>
  });
  const { updateUser } = useAuth();

  const steps = [
    {
      title: 'Welcome to FAANG Prep! 🚀',
      description: 'Let\'s personalize your learning journey to land your dream job',
      component: WelcomeStep
    },
    {
      title: 'What\'s your experience level?',
      description: 'This helps us tailor the difficulty and pace of your learning plan',
      component: ExperienceStep
    },
    {
      title: 'Which companies are you targeting?',
      description: 'We\'ll customize interview prep based on your target companies',
      component: CompaniesStep
    },
    {
      title: 'What\'s your timeline?',
      description: 'Choose your preparation timeline for optimal pacing',
      component: TimelineStep
    },
    {
      title: 'Rate your current skills',
      description: 'Help us understand your strengths and areas for improvement',
      component: SkillsStep
    },
    {
      title: 'You\'re all set! 🎉',
      description: 'Your personalized roadmap is ready',
      component: CompleteStep
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      updateUser({
        hasCompletedOnboarding: true,
        level: formData.experience as any,
        targetCompanies: formData.targetCompanies,
        timeline: formData.timeline as any
      });
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {steps[currentStep].description}
            </p>
          </div>

          <CurrentStepComponent formData={formData} setFormData={setFormData} />

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={nextStep}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="text-center py-8">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Target className="w-12 h-12 text-white" />
      </div>
      <div className="space-y-4 text-gray-600 dark:text-gray-400">
        <p>We'll help you build a personalized roadmap to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            '🧠 Master Data Structures & Algorithms',
            '🏗️ Learn System Design',
            '💼 Ace Behavioral Interviews',
            '🚀 Build an Impressive Portfolio'
          ].map((item, index) => (
            <div key={index} className="text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceStep({ formData, setFormData }: any) {
  const options = [
    { 
      value: 'beginner', 
      title: 'Beginner', 
      description: 'New to programming or just starting CS fundamentals',
      icon: '🌱'
    },
    { 
      value: 'intermediate', 
      title: 'Intermediate', 
      description: 'Some coding experience, familiar with basic algorithms',
      icon: '🌿'
    },
    { 
      value: 'advanced', 
      title: 'Advanced', 
      description: 'Strong coding skills, ready for complex problems',
      icon: '🌳'
    }
  ];

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setFormData({ ...formData, experience: option.value })}
          className={`w-full p-6 text-left border-2 rounded-xl transition-all ${
            formData.experience === option.value
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{option.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{option.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function CompaniesStep({ formData, setFormData }: any) {
  const companies = [
    { name: 'Google', logo: '🇬' },
    { name: 'Meta', logo: '🇲' },
    { name: 'Amazon', logo: '🇦' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Netflix', logo: '🇳' },
    { name: 'Microsoft', logo: '🇲' },
    { name: 'Tesla', logo: '🚗' },
    { name: 'Uber', logo: '🚗' }
  ];

  const toggleCompany = (company: string) => {
    const current = formData.targetCompanies || [];
    if (current.includes(company)) {
      setFormData({ ...formData, targetCompanies: current.filter(c => c !== company) });
    } else {
      setFormData({ ...formData, targetCompanies: [...current, company] });
    }
  };

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
        Select all companies you're interested in (you can change this later)
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {companies.map((company) => (
          <button
            key={company.name}
            onClick={() => toggleCompany(company.name)}
            className={`p-4 border-2 rounded-xl transition-all ${
              formData.targetCompanies?.includes(company.name)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-2xl mb-2">{company.logo}</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{company.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TimelineStep({ formData, setFormData }: any) {
  const options = [
    { 
      value: '6months', 
      title: '6 Months', 
      description: 'Intensive preparation, 15-20 hours/week',
      icon: '⚡'
    },
    { 
      value: '12months', 
      title: '12 Months', 
      description: 'Balanced approach, 8-12 hours/week',
      icon: '🎯'
    }
  ];

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setFormData({ ...formData, timeline: option.value })}
          className={`w-full p-6 text-left border-2 rounded-xl transition-all ${
            formData.timeline === option.value
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{option.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{option.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function SkillsStep({ formData, setFormData }: any) {
  const skills = [
    'Arrays & Strings',
    'Linked Lists',
    'Trees & Graphs',
    'Dynamic Programming',
    'System Design',
    'Behavioral Interviews'
  ];

  const updateSkill = (skill: string, rating: number) => {
    setFormData({
      ...formData,
      currentSkills: { ...formData.currentSkills, [skill]: rating }
    });
  };

  return (
    <div className="space-y-6">
      {skills.map((skill) => (
        <div key={skill}>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-900 dark:text-white">{skill}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formData.currentSkills[skill] || 0}/10
            </span>
          </div>
          <div className="flex space-x-1">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                onClick={() => updateSkill(skill, rating)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  (formData.currentSkills[skill] || 0) >= rating
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <span className="text-xs text-white font-medium">
                  {(formData.currentSkills[skill] || 0) >= rating ? rating : ''}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CompleteStep({ formData }: any) {
  return (
    <div className="text-center py-8">
      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Award className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Your personalized roadmap is ready!
      </h3>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Experience Level:</p>
            <p className="font-medium text-gray-900 dark:text-white capitalize">{formData.experience}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Timeline:</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {formData.timeline === '6months' ? '6 Months' : '12 Months'}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 dark:text-gray-400">Target Companies:</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {formData.targetCompanies?.join(', ') || 'None selected'}
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        We've created a customized learning plan based on your goals. Let's start your journey! 🚀
      </p>
    </div>
  );
}