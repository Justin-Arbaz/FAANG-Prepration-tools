import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Code,
  Network,
  FolderOpen,
  FileText,
  Mic,
  Briefcase,
  BarChart3,
  Users,
  BookOpen,
  Bot,
  Target
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Career Roadmap', href: '/roadmap', icon: MapPin },
  { name: 'Daily Planner', href: '/planner', icon: Calendar },
  { name: 'Code Practice', href: '/code-practice', icon: Code },
  { name: 'System Design', href: '/system-design', icon: Network },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Interview Coach', href: '/interviews', icon: Mic },
  { name: 'Job Matcher', href: '/jobs', icon: Briefcase },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const secondaryNav = [
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
];

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FAANG Prep
          </span>
        </div>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <item.icon className="mr-3 w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            {secondaryNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="mr-3 w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}