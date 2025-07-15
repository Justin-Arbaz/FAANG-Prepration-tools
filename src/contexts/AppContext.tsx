import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  hasCompletedOnboarding: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
  targetCompanies: string[];
  timeline: '6months' | '12months';
  currentStreak: number;
  totalXP: number;
  badges: string[];
  avatar?: string;
}

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: string;
  status: 'solved' | 'attempted' | 'not-started';
  attempts: number;
  timeSpent: number;
  date: string;
  tags: string[];
  solution?: string;
  notes?: string;
  code?: string;
  testCases?: { input: string; output: string; }[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  lastCommit?: string;
  readmeScore: number;
  testCoverage: number;
  faangReadiness: number;
  createdAt: string;
  completedAt?: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number;
  xp: number;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  status: 'not-applied' | 'applied' | 'saved' | 'interview' | 'rejected' | 'offer';
  matchScore: number;
  postedDate: string;
  url?: string;
  appliedDate?: string;
  notes?: string;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  week: number;
  phase: string;
  completed: boolean;
  xp: number;
  tasks: string[];
  resources: string[];
  completedAt?: string;
}

interface InterviewSession {
  id: string;
  type: 'behavioral' | 'technical' | 'system-design';
  question: string;
  answer: string;
  score: number;
  feedback: string;
  duration: number;
  date: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'book' | 'course' | 'video' | 'article' | 'github';
  category: string;
  url: string;
  description: string;
  rating: number;
  completed: boolean;
  bookmarked: boolean;
}

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  upvotes: number;
  downvotes: number;
  replies: CommunityReply[];
  createdAt: string;
  tags: string[];
  userVote?: 'up' | 'down';
}

interface CommunityReply {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
}

interface SystemDesignTopic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  notes: string;
  quiz: {
    questions: {
      id: string;
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }[];
    score?: number;
    completed: boolean;
  };
  xp: number;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website?: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    relevant: string[];
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    github?: string;
    live?: string;
    highlights: string[];
  }[];
  skills: {
    technical: string[];
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
  achievements: string[];
}

interface AppContextType {
  // User & Auth
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Progress & Gamification
  totalXP: number;
  currentStreak: number;
  badges: string[];
  studyTime: number;
  
  // Problems
  problems: Problem[];
  addProblem: (problem: Omit<Problem, 'id'>) => void;
  updateProblem: (id: string, updates: Partial<Problem>) => void;
  deleteProblem: (id: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  
  // Jobs
  jobs: Job[];
  updateJobStatus: (id: string, status: Job['status']) => void;
  addJobNote: (id: string, note: string) => void;
  
  // Roadmap
  roadmapSteps: RoadmapStep[];
  completeRoadmapStep: (id: string) => void;
  
  // Interview Sessions
  interviewSessions: InterviewSession[];
  addInterviewSession: (session: Omit<InterviewSession, 'id'>) => void;
  
  // Resources
  resources: Resource[];
  toggleResourceBookmark: (id: string) => void;
  markResourceComplete: (id: string) => void;
  addResource: (resource: Omit<Resource, 'id'>) => void;
  
  // Community
  communityPosts: CommunityPost[];
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'replies'>) => void;
  voteCommunityPost: (id: string, vote: 'up' | 'down') => void;
  addCommunityReply: (postId: string, reply: Omit<CommunityReply, 'id' | 'createdAt' | 'upvotes' | 'downvotes'>) => void;
  
  // System Design
  systemDesignTopics: SystemDesignTopic[];
  updateSystemDesignTopic: (id: string, updates: Partial<SystemDesignTopic>) => void;
  completeSystemDesignQuiz: (id: string, score: number) => void;
  
  // Resume
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  
  // Skills
  skills: Record<string, number>;
  updateSkill: (skill: string, score: number) => void;
  
  // Utility functions
  addXP: (amount: number) => void;
  addBadge: (badge: string) => void;
  addStudyTime: (minutes: number) => void;
  updateStreak: () => void;
  
  // Analytics
  getWeeklyStats: () => any;
  getSkillProgress: () => any;
  getDailyActivity: () => any;
  
  // AI Assistant
  sendMessage: (message: string) => Promise<string>;
  chatHistory: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Core state
  const [user, setUser] = useState<User | null>(null);
  const [totalXP, setTotalXP] = useState(2450);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [badges, setBadges] = useState(['First Week', 'Problem Solver', 'Consistent Learner']);
  const [studyTime, setStudyTime] = useState(89 * 60);
  const [lastActiveDate, setLastActiveDate] = useState(new Date().toDateString());
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string; timestamp: string }[]>([]);
  
  // Data states
  const [problems, setProblems] = useState<Problem[]>([
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      platform: 'LeetCode',
      status: 'solved',
      attempts: 1,
      timeSpent: 15,
      date: '2024-01-15',
      tags: ['Array', 'Hash Table'],
      testCases: [
        { input: '[2,7,11,15], 9', output: '[0,1]' },
        { input: '[3,2,4], 6', output: '[1,2]' }
      ]
    },
    {
      id: '2',
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'Medium',
      platform: 'LeetCode',
      status: 'solved',
      attempts: 2,
      timeSpent: 25,
      date: '2024-01-15',
      tags: ['Tree', 'BFS'],
      testCases: [
        { input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }
      ]
    },
    {
      id: '3',
      title: 'Longest Substring Without Repeating',
      difficulty: 'Medium',
      platform: 'LeetCode',
      status: 'attempted',
      attempts: 3,
      timeSpent: 45,
      date: '2024-01-14',
      tags: ['String', 'Sliding Window'],
      testCases: [
        { input: '"abcabcbb"', output: '3' },
        { input: '"bbbbb"', output: '1' }
      ]
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'TaskFlow - Project Management App',
      description: 'Full-stack task management with real-time collaboration',
      status: 'in-progress',
      progress: 75,
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      githubUrl: 'https://github.com/user/taskflow',
      liveUrl: 'https://taskflow-demo.vercel.app',
      lastCommit: '2 days ago',
      readmeScore: 85,
      testCoverage: 78,
      faangReadiness: 82,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'CryptoTracker - Real-time Dashboard',
      description: 'Cryptocurrency portfolio tracker with live price updates',
      status: 'completed',
      progress: 100,
      techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Chart.js'],
      githubUrl: 'https://github.com/user/crypto-tracker',
      liveUrl: 'https://crypto-tracker-live.vercel.app',
      lastCommit: '1 week ago',
      readmeScore: 92,
      testCoverage: 85,
      faangReadiness: 88,
      createdAt: '2023-12-01',
      completedAt: '2024-01-10'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Solve 2 Tree problems on LeetCode',
      completed: true,
      category: 'DSA',
      priority: 'high',
      estimatedTime: 60,
      xp: 50,
      createdAt: '2024-01-15',
      completedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Review System Design: Distributed Caching',
      completed: false,
      category: 'System Design',
      priority: 'medium',
      estimatedTime: 45,
      xp: 40,
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      title: 'Practice behavioral questions (STAR format)',
      completed: false,
      category: 'Behavioral',
      priority: 'medium',
      estimatedTime: 30,
      xp: 30,
      createdAt: '2024-01-15'
    }
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Software Engineer L4',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$180K - $250K',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Build and maintain large-scale distributed systems...',
      requirements: ['JavaScript', 'React', 'System Design', 'Algorithms'],
      status: 'not-applied',
      matchScore: 89,
      postedDate: '2 days ago',
      url: 'https://careers.google.com/jobs/123'
    },
    {
      id: '2',
      title: 'Senior Frontend Engineer',
      company: 'Meta',
      location: 'Menlo Park, CA',
      salary: '$170K - $230K',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Work on products used by billions of people...',
      requirements: ['React', 'TypeScript', 'GraphQL', 'Testing'],
      status: 'applied',
      matchScore: 92,
      postedDate: '1 week ago',
      url: 'https://careers.meta.com/jobs/456',
      appliedDate: '2024-01-14'
    }
  ]);

  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([
    {
      id: '1',
      title: 'Master Array and String Fundamentals',
      description: 'Learn basic array operations, string manipulation, and two-pointer techniques',
      week: 1,
      phase: 'Foundation',
      completed: true,
      xp: 100,
      tasks: ['Solve 10 easy array problems', 'Practice string algorithms', 'Learn two-pointer technique'],
      resources: ['LeetCode Array Problems', 'String Algorithms Guide'],
      completedAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Binary Trees and Tree Traversals',
      description: 'Understand tree data structures and traversal algorithms',
      week: 2,
      phase: 'Foundation',
      completed: false,
      xp: 120,
      tasks: ['Learn tree traversal methods', 'Solve 15 tree problems', 'Implement BST operations'],
      resources: ['Tree Algorithms Course', 'Binary Tree Visualization']
    }
  ]);

  const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>([
    {
      id: '1',
      type: 'behavioral',
      question: 'Tell me about a time you faced a difficult challenge',
      answer: 'I used the STAR method to structure my response...',
      score: 85,
      feedback: 'Good structure, could improve on quantifying impact',
      duration: 180,
      date: '2024-01-15'
    }
  ]);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Cracking the Coding Interview',
      type: 'book',
      category: 'DSA',
      url: 'https://example.com/ctci',
      description: 'Essential book for technical interviews',
      rating: 5,
      completed: false,
      bookmarked: true
    },
    {
      id: '2',
      title: 'System Design Interview Course',
      type: 'course',
      category: 'System Design',
      url: 'https://example.com/system-design',
      description: 'Comprehensive system design preparation',
      rating: 4,
      completed: true,
      bookmarked: true
    }
  ]);

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      title: 'How I got into Google after 6 months of preparation',
      content: 'Here\'s my complete journey and tips...',
      author: 'John Doe',
      authorId: 'user1',
      category: 'Success Stories',
      upvotes: 45,
      downvotes: 2,
      replies: [],
      createdAt: '2024-01-15',
      tags: ['Google', 'Success', 'Tips']
    }
  ]);

  const [systemDesignTopics, setSystemDesignTopics] = useState<SystemDesignTopic[]>([
    {
      id: '1',
      title: 'Load Balancing',
      description: 'Understanding different load balancing strategies',
      completed: false,
      notes: '',
      quiz: {
        questions: [
          {
            id: '1',
            question: 'What is the main purpose of a load balancer?',
            options: ['Increase security', 'Distribute traffic', 'Store data', 'Compile code'],
            correct: 1,
            explanation: 'Load balancers distribute incoming traffic across multiple servers'
          }
        ],
        completed: false
      },
      xp: 50
    }
  ]);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: {
      technical: [],
      languages: [],
      frameworks: [],
      tools: []
    },
    achievements: []
  });

  const [skills, setSkills] = useState<Record<string, number>>({
    'Arrays & Strings': 85,
    'Trees & Graphs': 72,
    'Dynamic Programming': 58,
    'System Design': 65,
    'Behavioral': 78,
    'Database Design': 70,
    'React': 90,
    'Node.js': 80,
    'Python': 75
  });

  // Utility functions
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const addXP = (amount: number) => {
    setTotalXP(prev => {
      const newTotal = prev + amount;
      
      // Check for level-up badges
      if (newTotal >= 1000 && !badges.includes('XP Master')) {
        addBadge('XP Master');
      }
      if (newTotal >= 5000 && !badges.includes('XP Legend')) {
        addBadge('XP Legend');
      }
      
      return newTotal;
    });
  };

  const addBadge = (badge: string) => {
    setBadges(prev => prev.includes(badge) ? prev : [...prev, badge]);
  };

  const addStudyTime = (minutes: number) => {
    setStudyTime(prev => prev + minutes);
    addXP(Math.floor(minutes / 10));
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastActiveDate === yesterday) {
      setCurrentStreak(prev => prev + 1);
    } else if (lastActiveDate !== today) {
      setCurrentStreak(1);
    }
    
    setLastActiveDate(today);
    
    // Streak badges
    if (currentStreak >= 7 && !badges.includes('Week Warrior')) {
      addBadge('Week Warrior');
    }
    if (currentStreak >= 30 && !badges.includes('Month Master')) {
      addBadge('Month Master');
    }
  };

  // Problem functions
  const addProblem = (problem: Omit<Problem, 'id'>) => {
    const newProblem = { ...problem, id: generateId() };
    setProblems(prev => [newProblem, ...prev]);
    
    if (problem.status === 'solved') {
      const xpMap = { Easy: 10, Medium: 20, Hard: 30 };
      addXP(xpMap[problem.difficulty]);
      updateStreak();
    }
  };

  const updateProblem = (id: string, updates: Partial<Problem>) => {
    setProblems(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        
        // Award XP if status changed to solved
        if (updates.status === 'solved' && p.status !== 'solved') {
          const xpMap = { Easy: 10, Medium: 20, Hard: 30 };
          addXP(xpMap[p.difficulty]);
          updateStreak();
        }
        
        return updated;
      }
      return p;
    }));
  };

  const deleteProblem = (id: string) => {
    setProblems(prev => prev.filter(p => p.id !== id));
  };

  // Project functions
  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject = { 
      ...project, 
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        
        // Award XP for project completion
        if (updates.status === 'completed' && p.status !== 'completed') {
          addXP(100);
          addBadge('Project Completed');
          updated.completedAt = new Date().toISOString();
          updateStreak();
        }
        
        return updated;
      }
      return p;
    }));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Task functions
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = { 
      ...task, 
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const updated = { ...t, ...updates };
        
        if (updates.completed && !t.completed) {
          addXP(t.xp);
          updated.completedAt = new Date().toISOString();
          updateStreak();
        }
        
        return updated;
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  // Job functions
  const updateJobStatus = (id: string, status: Job['status']) => {
    setJobs(prev => prev.map(j => {
      if (j.id === id) {
        const updated = { ...j, status };
        
        if (status === 'applied') {
          addXP(25);
          updated.appliedDate = new Date().toISOString();
        } else if (status === 'interview') {
          addXP(50);
          addBadge('Interview Scheduled');
        } else if (status === 'offer') {
          addXP(200);
          addBadge('Job Offer Received');
        }
        
        return updated;
      }
      return j;
    }));
  };

  const addJobNote = (id: string, note: string) => {
    setJobs(prev => prev.map(j => 
      j.id === id ? { ...j, notes: note } : j
    ));
  };

  // Roadmap functions
  const completeRoadmapStep = (id: string) => {
    setRoadmapSteps(prev => prev.map(step => {
      if (step.id === id && !step.completed) {
        addXP(step.xp);
        addBadge('Roadmap Progress');
        updateStreak();
        return { 
          ...step, 
          completed: true, 
          completedAt: new Date().toISOString() 
        };
      }
      return step;
    }));
  };

  // Interview functions
  const addInterviewSession = (session: Omit<InterviewSession, 'id'>) => {
    const newSession = { ...session, id: generateId() };
    setInterviewSessions(prev => [newSession, ...prev]);
    addXP(session.score);
    updateStreak();
  };

  // Resource functions
  const toggleResourceBookmark = (id: string) => {
    setResources(prev => prev.map(r => 
      r.id === id ? { ...r, bookmarked: !r.bookmarked } : r
    ));
  };

  const markResourceComplete = (id: string) => {
    setResources(prev => prev.map(r => {
      if (r.id === id && !r.completed) {
        addXP(20);
        updateStreak();
        return { ...r, completed: true };
      }
      return r;
    }));
  };

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = { ...resource, id: generateId() };
    setResources(prev => [newResource, ...prev]);
  };

  // Community functions
  const addCommunityPost = (post: Omit<CommunityPost, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'replies'>) => {
    const newPost = { 
      ...post, 
      id: generateId(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: []
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    addXP(15);
  };

  const voteCommunityPost = (id: string, vote: 'up' | 'down') => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === id) {
        const updated = { ...post };
        
        if (post.userVote === vote) {
          // Remove vote
          if (vote === 'up') updated.upvotes--;
          else updated.downvotes--;
          delete updated.userVote;
        } else {
          // Change or add vote
          if (post.userVote === 'up') updated.upvotes--;
          if (post.userVote === 'down') updated.downvotes--;
          
          if (vote === 'up') updated.upvotes++;
          else updated.downvotes++;
          updated.userVote = vote;
        }
        
        return updated;
      }
      return post;
    }));
  };

  const addCommunityReply = (postId: string, reply: Omit<CommunityReply, 'id' | 'createdAt' | 'upvotes' | 'downvotes'>) => {
    const newReply = {
      ...reply,
      id: generateId(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0
    };
    
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ));
    addXP(10);
  };

  // System Design functions
  const updateSystemDesignTopic = (id: string, updates: Partial<SystemDesignTopic>) => {
    setSystemDesignTopics(prev => prev.map(topic => {
      if (topic.id === id) {
        const updated = { ...topic, ...updates };
        
        if (updates.completed && !topic.completed) {
          addXP(topic.xp);
          updateStreak();
        }
        
        return updated;
      }
      return topic;
    }));
  };

  const completeSystemDesignQuiz = (id: string, score: number) => {
    setSystemDesignTopics(prev => prev.map(topic => {
      if (topic.id === id) {
        const updated = { 
          ...topic, 
          quiz: { ...topic.quiz, score, completed: true },
          completed: true
        };
        addXP(topic.xp);
        updateStreak();
        return updated;
      }
      return topic;
    }));
  };

  // Resume functions
  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({ ...prev, [section]: data }));
  };

  // Skill functions
  const updateSkill = (skill: string, score: number) => {
    setSkills(prev => ({ ...prev, [skill]: score }));
  };

  // AI Assistant
  const sendMessage = async (message: string): Promise<string> => {
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    // Mock AI response (replace with actual OpenAI API call)
    const responses = [
      "That's a great question! For FAANG interviews, I'd recommend focusing on...",
      "Based on your progress, you should work on dynamic programming next.",
      "Here's a step-by-step approach to solve this problem...",
      "Your system design skills are improving! Try practicing with larger scale problems.",
      "For behavioral interviews, remember to use the STAR method..."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const assistantMessage = {
      role: 'assistant' as const,
      content: response,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, assistantMessage]);
    
    return response;
  };

  // Analytics functions
  const getWeeklyStats = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyTasks = tasks.filter(t => 
      t.completedAt && new Date(t.completedAt) >= weekAgo
    );
    
    const weeklyProblems = problems.filter(p => 
      p.status === 'solved' && new Date(p.date) >= weekAgo
    );
    
    return {
      tasksCompleted: weeklyTasks.length,
      problemsSolved: weeklyProblems.length,
      xpEarned: weeklyTasks.reduce((sum, t) => sum + t.xp, 0) + 
                weeklyProblems.reduce((sum, p) => {
                  const xpMap = { Easy: 10, Medium: 20, Hard: 30 };
                  return sum + xpMap[p.difficulty];
                }, 0),
      studyHours: Math.floor(studyTime / 60)
    };
  };

  const getSkillProgress = () => {
    return Object.entries(skills).map(([skill, score]) => ({
      skill,
      score,
      change: Math.floor(Math.random() * 10) + 1 // Mock change for demo
    }));
  };

  const getDailyActivity = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayTasks = tasks.filter(t => 
        t.completedAt && t.completedAt.startsWith(dateStr)
      ).length;
      
      const dayProblems = problems.filter(p => 
        p.status === 'solved' && p.date === dateStr
      ).length;
      
      days.push({
        date: dateStr,
        activity: dayTasks + dayProblems,
        level: dayTasks + dayProblems > 3 ? 'high' : 
               dayTasks + dayProblems > 1 ? 'medium' : 
               dayTasks + dayProblems > 0 ? 'low' : 'none'
      });
    }
    return days;
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('faangPrepData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setUser(data.user || null);
        setTotalXP(data.totalXP || 2450);
        setCurrentStreak(data.currentStreak || 7);
        setBadges(data.badges || ['First Week', 'Problem Solver', 'Consistent Learner']);
        setProblems(data.problems || []);
        setProjects(data.projects || []);
        setTasks(data.tasks || []);
        setJobs(data.jobs || []);
        setRoadmapSteps(data.roadmapSteps || []);
        setInterviewSessions(data.interviewSessions || []);
        setResources(data.resources || []);
        setCommunityPosts(data.communityPosts || []);
        setSystemDesignTopics(data.systemDesignTopics || []);
        setResumeData(data.resumeData || {});
        setSkills(data.skills || {});
        setStudyTime(data.studyTime || 89 * 60);
        setLastActiveDate(data.lastActiveDate || new Date().toDateString());
        setChatHistory(data.chatHistory || []);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const data = {
      user,
      totalXP,
      currentStreak,
      badges,
      problems,
      projects,
      tasks,
      jobs,
      roadmapSteps,
      interviewSessions,
      resources,
      communityPosts,
      systemDesignTopics,
      resumeData,
      skills,
      studyTime,
      lastActiveDate,
      chatHistory
    };
    localStorage.setItem('faangPrepData', JSON.stringify(data));
  }, [
    user, totalXP, currentStreak, badges, problems, projects, tasks, jobs,
    roadmapSteps, interviewSessions, resources, communityPosts, systemDesignTopics,
    resumeData, skills, studyTime, lastActiveDate, chatHistory
  ]);

  // Initialize user if not exists
  useEffect(() => {
    if (!user) {
      setUser({
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        hasCompletedOnboarding: true,
        level: 'intermediate',
        targetCompanies: ['Google', 'Meta', 'Amazon'],
        timeline: '6months',
        currentStreak: 7,
        totalXP: 2450,
        badges: ['First Week', 'Problem Solver', 'Consistent Learner']
      });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{
      // User & Auth
      user,
      setUser,
      
      // Progress & Gamification
      totalXP,
      currentStreak,
      badges,
      studyTime,
      
      // Problems
      problems,
      addProblem,
      updateProblem,
      deleteProblem,
      
      // Projects
      projects,
      addProject,
      updateProject,
      deleteProject,
      
      // Tasks
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      
      // Jobs
      jobs,
      updateJobStatus,
      addJobNote,
      
      // Roadmap
      roadmapSteps,
      completeRoadmapStep,
      
      // Interview Sessions
      interviewSessions,
      addInterviewSession,
      
      // Resources
      resources,
      toggleResourceBookmark,
      markResourceComplete,
      addResource,
      
      // Community
      communityPosts,
      addCommunityPost,
      voteCommunityPost,
      addCommunityReply,
      
      // System Design
      systemDesignTopics,
      updateSystemDesignTopic,
      completeSystemDesignQuiz,
      
      // Resume
      resumeData,
      updateResumeData,
      
      // Skills
      skills,
      updateSkill,
      
      // Utility functions
      addXP,
      addBadge,
      addStudyTime,
      updateStreak,
      
      // Analytics
      getWeeklyStats,
      getSkillProgress,
      getDailyActivity,
      
      // AI Assistant
      sendMessage,
      chatHistory
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}