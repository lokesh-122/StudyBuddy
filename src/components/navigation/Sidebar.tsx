import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart3, 
  Calendar, 
  FileText, 
  Home, 
  Upload, 
  RefreshCw, 
  GraduationCap,
  Award,
  Settings,
  PenTool
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Upload', href: '/upload', icon: Upload },
    { name: 'Summaries', href: '/summary', icon: FileText },
    { name: 'Flashcards', href: '/flashcards', icon: RefreshCw },
    { name: 'Quizzes', href: '/quiz', icon: PenTool },
    { name: 'Learning Path', href: '/learning-path', icon: GraduationCap },
    { name: 'Exam Planner', href: '/exam-planner', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 h-screen overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <Link to="/dashboard" className="flex items-center">
          <BookOpen className="h-8 w-8 text-primary-500" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Study Buddy</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-4 pb-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-200 ease-in-out relative ${
                isActive 
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <item.icon 
                className={`h-5 w-5 mr-3 ${
                  isActive 
                    ? 'text-primary-500 dark:text-primary-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Lower Section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
        <Link 
          to="/profile" 
          className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Award className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
          My Progress
        </Link>
        <Link 
          to="/settings" 
          className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;