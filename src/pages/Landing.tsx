import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Calendar, Check, CheckCircle2, ChevronDown, Clock, FileText, Gem, Lightbulb, DivideIcon as LucideIcon, PencilRuler, RefreshCw, Server, Star, User, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';

// Testimonial data
const testimonials = [
  {
    id: 1,
    content: "Study Buddy completely transformed how I prepare for exams. The AI-generated summaries and flashcards saved me countless hours of study time.",
    author: "Sarah J.",
    role: "Computer Science Student",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    content: "The adaptive learning paths helped me focus on my weak areas instead of wasting time on concepts I already understood. My grades improved significantly.",
    author: "Michael T.",
    role: "Pre-Med Student",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    content: "The exam planner feature is brilliant! It created a structured study schedule for my finals that was realistic and helped me avoid last-minute cramming.",
    author: "Emma L.",
    role: "MBA Student",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// Feature data
interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Textbook Chapter Summarizer",
    description: "Upload any academic material and get concise, intelligent summaries in various formats and lengths.",
    icon: FileText
  },
  {
    title: "Adaptive Quiz Generator",
    description: "Generate customized quizzes from your study materials with varying difficulty levels and detailed explanations.",
    icon: PencilRuler
  },
  {
    title: "Smart Flashcards",
    description: "Create and study with AI-generated flashcards using spaced repetition to maximize retention.",
    icon: RefreshCw
  },
  {
    title: "Personalized Learning Paths",
    description: "Receive tailored study recommendations based on your performance and learning patterns.",
    icon: Brain
  },
  {
    title: "Exam Planner",
    description: "Set exam dates and get a customized study schedule that ensures optimal preparation.",
    icon: Calendar
  },
  {
    title: "Progress Analytics",
    description: "Track your learning journey with detailed metrics and visualizations of your progress.",
    icon: Server
  }
];

// Pricing plans
const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual studying",
    features: [
      "Chapter summarization (3/month)",
      "Basic flashcards",
      "Simple quizzes",
      "Limited progress tracking"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Student",
    price: "$9.99",
    period: "per month",
    description: "Everything you need to excel",
    features: [
      "Unlimited summarization",
      "Advanced adaptive quizzes",
      "Smart flashcards with spaced repetition",
      "Personalized learning paths",
      "Comprehensive analytics",
      "Exam planner"
    ],
    cta: "Start Free Trial",
    highlighted: true
  },
  {
    name: "Group",
    price: "$29.99",
    period: "per month",
    description: "For study groups and teams",
    features: [
      "All Student features",
      "Group study rooms",
      "Shared materials library",
      "Collaborative note-taking",
      "Team progress tracking",
      "Priority support"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

const Landing = () => {
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        <div className="absolute inset-0 -z-10">
          <svg className="absolute right-0 top-0 h-full w-full transform translate-x-1/2 text-primary-50 dark:text-primary-900/20" 
               viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
            <polygon points="0,0 100,0 50,100 0,100" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
                  AI-Powered Learning Assistant
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                  Study Smarter,<br className="hidden md:block" /> Not Harder
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                  Your intelligent learning companion that adapts to your unique style. 
                  Summarize content, create flashcards, generate quizzes, and optimize your 
                  study schedule—all powered by AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup" className="btn-primary px-8 py-3 text-base font-medium">
                    Get Started for Free
                  </Link>
                  <a href="#features" className="btn-outlined px-8 py-3 text-base font-medium">
                    Explore Features
                  </a>
                </div>
                <div className="mt-8 flex items-center text-gray-600 dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {testimonials.map((t, i) => (
                      <img 
                        key={i} 
                        src={t.image} 
                        alt={t.author} 
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                      />
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm mt-1">from 2,000+ happy students</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                  <img 
                    src="https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Study Buddy Dashboard" 
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-2">Interactive Dashboard</h3>
                      <p className="text-gray-200">Track your progress and see your learning journey</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-48">
                  <div className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Next Review</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Neural Networks</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-48">
                  <div className="flex items-center">
                    <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-2">
                      <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Upcoming Exam</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">6 days left</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-20 flex justify-center">
            <a href="#features" className="animate-bounce flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <span className="text-sm mb-2">Learn more</span>
              <ChevronDown className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to Excel in Your Studies
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              Our comprehensive suite of AI-powered tools adapts to your learning style and helps you study more effectively.
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={item} className="card border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition">
                <div className="rounded-full p-3 bg-primary-100 dark:bg-primary-900/30 inline-block mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How Study Buddy Works
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              Our platform makes it easy to transform your study materials into effective learning tools.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center mb-16">
              <motion.div 
                className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 h-12 w-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Upload Study Materials</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload any textbook chapter, PDF, Word document, or lecture notes through our simple interface.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src="https://images.pexels.com/photos/5486746/pexels-photo-5486746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Upload study materials" 
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-16">
              <motion.div 
                className="md:w-1/2 mb-8 md:mb-0 md:pl-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 h-12 w-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Processes Content</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our intelligent AI analyzes your materials, extracts key concepts, and prepares personalized learning content.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src="https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="AI processing" 
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 h-12 w-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Study with Smart Tools</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Access summaries, flashcards, quizzes, and personalized study plans that adapt to your learning patterns.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Study with tools" 
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              Thousands of students have improved their study habits and academic performance with Study Buddy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="inline-block h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              Choose a plan that works for you, all with a 14-day money-back guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card border border-gray-200 dark:border-gray-700 ${
                  plan.highlighted 
                    ? 'relative overflow-hidden border-primary-300 dark:border-primary-700 shadow-lg' 
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={plan.name === "Free" ? "/signup" : "/signup"}
                  className={`block text-center py-2 rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'btn-primary'
                      : 'btn-outlined'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-3xl mx-auto">
              Start Transforming Your Study Habits Today
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already improved their learning efficiency with Study Buddy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/signup" 
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started for Free
              </Link>
              <Link 
                to="/login" 
                className="bg-transparent text-white border border-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Log In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;