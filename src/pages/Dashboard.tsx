import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Upload, Award, Calendar, Clock, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample data - in a real app, this would come from an API
const mockData = {
  recentSummaries: [
    { id: 1, title: 'Introduction to Psychology', subject: 'Psychology', date: '2 days ago' },
    { id: 2, title: 'Organic Chemistry Chapter 7', subject: 'Chemistry', date: '1 week ago' },
    { id: 3, title: 'Macroeconomics Fundamentals', subject: 'Economics', date: '2 weeks ago' },
  ],
  upcomingExams: [
    { id: 1, title: 'Midterm: Psychology 101', date: 'Nov 15, 2025', daysLeft: 5 },
    { id: 2, title: 'Final: Chemistry', date: 'Dec 10, 2025', daysLeft: 30 },
  ],
  weakTopics: [
    { id: 1, title: 'Neural Networks', subject: 'Computer Science', strength: 25 },
    { id: 2, title: 'Organic Compounds', subject: 'Chemistry', strength: 40 },
    { id: 3, title: 'Quantum Mechanics', subject: 'Physics', strength: 30 },
  ]
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [studyTime, setStudyTime] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [topicsReviewed, setTopicsReviewed] = useState(0);

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Simulate fetching data from API
    setStudyTime(12.5);
    setStreakDays(7);
    setTopicsReviewed(32);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{greeting}, Alex!</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/upload" className="btn-primary flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Material
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          variants={item}
          className="card flex items-center bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-100 dark:border-primary-900/20"
        >
          <div className="rounded-full p-3 bg-primary-100 dark:bg-primary-900/30">
            <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Time</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{studyTime}h</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">this week</p>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="card flex items-center bg-gradient-to-br from-secondary-500/10 to-secondary-600/5 border border-secondary-100 dark:border-secondary-900/20"
        >
          <div className="rounded-full p-3 bg-secondary-100 dark:bg-secondary-900/30">
            <Star className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Streak</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{streakDays} days</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">keep it up!</p>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="card flex items-center bg-gradient-to-br from-accent-500/10 to-accent-600/5 border border-accent-100 dark:border-accent-900/20"
        >
          <div className="rounded-full p-3 bg-accent-100 dark:bg-accent-900/30">
            <BookOpen className="h-6 w-6 text-accent-600 dark:text-accent-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Topics Reviewed</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{topicsReviewed}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">across all subjects</p>
          </div>
        </motion.div>

        <motion.div 
          variants={item}
          className="card flex items-center bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-100 dark:border-amber-900/20"
        >
          <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
            <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">My Level</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">level 7</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Recent Summaries */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="card h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Summaries</h2>
              <Link to="/summary" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                View all <ExternalLink className="ml-1 w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {mockData.recentSummaries.map((summary) => (
                <Link key={summary.id} to={`/summary/${summary.id}`}>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="rounded-lg p-3 bg-primary-100 dark:bg-primary-900/30">
                          <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900 dark:text-white">{summary.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{summary.subject}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500">{summary.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
              
              <Link to="/upload" className="block p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Upload className="mx-auto h-5 w-5 text-gray-500 dark:text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload new material</p>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div variants={item} className="space-y-8">
          {/* Upcoming Exams */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Exams</h2>
              <Link to="/exam-planner" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                View all <ExternalLink className="ml-1 w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {mockData.upcomingExams.map((exam) => (
                <Link key={exam.id} to="/exam-planner">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{exam.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{exam.date}</p>
                      </div>
                      <div className="flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 rounded-full h-10 w-10">
                        <span className="text-xs font-medium text-amber-800 dark:text-amber-300">{exam.daysLeft}d</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              <Link to="/exam-planner" className="block p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Calendar className="mx-auto h-5 w-5 text-gray-500 dark:text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Add exam date</p>
              </Link>
            </div>
          </div>

          {/* Weak Areas */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Needs Improvement</h2>
              <Link to="/learning-path" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                View all <ExternalLink className="ml-1 w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {mockData.weakTopics.map((topic) => (
                <Link key={topic.id} to="/learning-path">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{topic.title}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{topic.subject}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            topic.strength < 30 
                              ? 'bg-red-500' 
                              : topic.strength < 70 
                                ? 'bg-amber-500' 
                                : 'bg-green-500'
                          }`} 
                          style={{ width: `${topic.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;