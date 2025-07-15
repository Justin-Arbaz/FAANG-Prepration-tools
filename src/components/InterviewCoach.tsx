import React, { useState, useEffect } from 'react';
import { Mic, Video, Play, Pause, RotateCcw, Star, MessageCircle, Clock, Save, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function InterviewCoach() {
  const { interviewSessions, addInterviewSession, addXP } = useApp();
  const [selectedType, setSelectedType] = useState('behavioral');
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [sessionFeedback, setSessionFeedback] = useState('');
  const [sessionScore, setSessionScore] = useState(0);

  const interviewTypes = [
    { id: 'behavioral', name: 'Behavioral', icon: MessageCircle, description: 'STAR method & leadership principles' },
    { id: 'technical', name: 'Technical', icon: Mic, description: 'Coding and system design discussions' },
    { id: 'mock', name: 'Mock Interview', icon: Video, description: 'Full interview simulation' }
  ];

  const behavioralQuestions = [
    {
      question: "Tell me about a time when you had to deal with a difficult team member.",
      framework: "STAR",
      tips: ["Focus on conflict resolution", "Show empathy and communication skills", "Highlight positive outcome"],
      category: "Teamwork",
      difficulty: "Medium"
    },
    {
      question: "Describe a situation where you had to learn a new technology quickly.",
      framework: "STAR",
      tips: ["Emphasize learning agility", "Show resourcefulness", "Quantify the timeline"],
      category: "Learning & Development",
      difficulty: "Easy"
    },
    {
      question: "Tell me about a time you failed and what you learned from it.",
      framework: "STAR",
      tips: ["Be genuine and vulnerable", "Focus on lessons learned", "Show growth mindset"],
      category: "Failure & Learning",
      difficulty: "Hard"
    },
    {
      question: "Describe a time when you had to work under pressure.",
      framework: "STAR",
      tips: ["Show stress management skills", "Highlight prioritization", "Demonstrate results under pressure"],
      category: "Pressure & Deadlines",
      difficulty: "Medium"
    }
  ];

  const technicalQuestions = [
    {
      question: "How would you design a URL shortener like bit.ly?",
      framework: "System Design",
      tips: ["Start with requirements", "Discuss scale and constraints", "Design database schema"],
      category: "System Design",
      difficulty: "Hard"
    },
    {
      question: "Explain the difference between SQL and NoSQL databases.",
      framework: "Technical Knowledge",
      tips: ["Compare use cases", "Discuss ACID properties", "Give examples"],
      category: "Databases",
      difficulty: "Medium"
    }
  ];

  const amazonPrinciples = [
    { name: "Customer Obsession", description: "Start with customer and work backwards" },
    { name: "Ownership", description: "Act on behalf of entire company, think long term" },
    { name: "Invent and Simplify", description: "Innovate and find ways to simplify" },
    { name: "Learn and Be Curious", description: "Never stop learning and always seek to improve" },
    { name: "Hire and Develop the Best", description: "Raise performance bar with every hire" },
    { name: "Insist on the Highest Standards", description: "High standards that many think unreasonably high" }
  ];

  const currentQuestions = selectedType === 'behavioral' ? behavioralQuestions : technicalQuestions;
  const currentBehavioralQuestion = currentQuestions[currentQuestion];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsTimerRunning(true);
    setTimer(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
    setIsRecording(false);
    setCurrentAnswer('');
  };

  const handleSaveSession = () => {
    if (!currentAnswer.trim()) return;

    // Calculate score based on answer length and keywords
    let score = 50; // Base score
    
    // Length bonus
    if (currentAnswer.length > 100) score += 10;
    if (currentAnswer.length > 300) score += 10;
    
    // STAR method keywords for behavioral
    if (selectedType === 'behavioral') {
      const starKeywords = ['situation', 'task', 'action', 'result', 'challenge', 'accomplished', 'learned'];
      const foundKeywords = starKeywords.filter(keyword => 
        currentAnswer.toLowerCase().includes(keyword)
      );
      score += foundKeywords.length * 5;
    }
    
    // Technical keywords
    if (selectedType === 'technical') {
      const techKeywords = ['scalable', 'performance', 'database', 'architecture', 'algorithm', 'complexity'];
      const foundKeywords = techKeywords.filter(keyword => 
        currentAnswer.toLowerCase().includes(keyword)
      );
      score += foundKeywords.length * 5;
    }

    score = Math.min(score, 100);
    setSessionScore(score);

    // Generate feedback
    const feedbacks = [
      "Good structure! Try to be more specific with metrics and outcomes.",
      "Great use of the STAR method. Consider adding more technical details.",
      "Excellent storytelling. Make sure to highlight your specific contributions.",
      "Well organized response. Could benefit from more concrete examples.",
      "Strong answer! Remember to quantify your impact where possible."
    ];
    
    const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    setSessionFeedback(feedback);

    // Save to context
    addInterviewSession({
      type: selectedType as 'behavioral' | 'technical' | 'system-design',
      question: currentBehavioralQuestion.question,
      answer: currentAnswer,
      score,
      feedback,
      duration: timer,
      date: new Date().toISOString()
    });

    addXP(score);
    
    // Reset for next question
    setTimeout(() => {
      setCurrentAnswer('');
      setSessionFeedback('');
      setSessionScore(0);
      handleResetTimer();
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Interview Coach 🎤</h1>
        <p className="text-purple-100 text-lg">
          Master behavioral interviews with AI-powered feedback and STAR framework guidance
        </p>
      </div>

      {/* Interview Type Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Choose Interview Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interviewTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 border-2 rounded-xl transition-all ${
                selectedType === type.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4 mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedType === type.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{type.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Question */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Practice Question</h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentBehavioralQuestion.difficulty)}`}>
                  {currentBehavioralQuestion.difficulty}
                </span>
                <span className="text-sm text-gray-500">{currentQuestion + 1} of {currentQuestions.length}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                  {currentBehavioralQuestion.question}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-blue-700 dark:text-blue-300">
                  <span>Category: {currentBehavioralQuestion.category}</span>
                  <span>Framework: {currentBehavioralQuestion.framework}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">💡 Tips for your answer:</h4>
                <ul className="space-y-1">
                  {currentBehavioralQuestion.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Answer Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Answer
              </label>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here using the STAR method..."
                className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Recording Controls */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  <Mic className={`w-8 h-8 ${isRecording ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRecording ? 'Recording your answer...' : 'Click to start recording your answer'}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </button>
                
                <button 
                  onClick={handleResetTimer}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleSaveSession}
                  disabled={!currentAnswer.trim()}
                  className="flex items-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Answer</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">{formatTime(timer)}</span>
              </div>
            </div>

            {/* Session Feedback */}
            {sessionFeedback && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">Session Complete!</span>
                  <span className={`font-bold ${getScoreColor(sessionScore)}`}>Score: {sessionScore}%</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">{sessionFeedback}</p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Previous Question
              </button>
              
              <button
                onClick={() => setCurrentQuestion(Math.min(currentQuestions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === currentQuestions.length - 1}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* STAR Framework */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">⭐ STAR Framework</h3>
            <div className="space-y-3">
              {[
                { letter: 'S', word: 'Situation', description: 'Set the context' },
                { letter: 'T', word: 'Task', description: 'Explain what needed to be done' },
                { letter: 'A', word: 'Action', description: 'Describe what you did' },
                { letter: 'R', word: 'Result', description: 'Share the outcome' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">{item.letter}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{item.word}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amazon Leadership Principles */}
          <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-xl p-6">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-4">Amazon Leadership Principles</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {amazonPrinciples.map((principle, index) => (
                <div key={index} className="bg-white dark:bg-orange-800 rounded-lg p-3">
                  <p className="font-medium text-orange-800 dark:text-orange-100 text-sm">{principle.name}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-200">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Practice History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Practice Sessions</h2>
        
        <div className="space-y-4">
          {interviewSessions.slice(0, 5).map((session, index) => (
            <div key={session.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{session.type}</span>
                  <span className="text-sm text-gray-500">{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className={`font-semibold ${getScoreColor(session.score)}`}>{session.score}%</span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{session.question}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{session.feedback}</p>
              <p className="text-xs text-gray-500 mt-1">Duration: {formatTime(session.duration)}</p>
            </div>
          ))}
        </div>

        {interviewSessions.length === 0 && (
          <div className="text-center py-8">
            <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No practice sessions yet</p>
            <p className="text-sm text-gray-400">Start practicing to see your progress here</p>
          </div>
        )}
      </div>
    </div>
  );
}