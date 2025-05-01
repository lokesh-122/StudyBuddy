import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Download, Share2, Star } from 'lucide-react';

interface Summary {
  id: string;
  title: string;
  subject: string;
  content: string;
  keyPoints: string[];
  dateCreated: string;
}

const SummaryPage = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockSummary: Summary = {
          id: id || '1',
          title: 'Introduction to Neural Networks',
          subject: 'Computer Science',
          content: `Neural networks are computing systems inspired by biological neural networks. They are designed to recognize patterns and are particularly effective for solving complex problems in various fields including computer vision, natural language processing, and more.

The basic structure consists of interconnected nodes (neurons) organized in layers:
1. Input Layer: Receives raw data
2. Hidden Layers: Process the information
3. Output Layer: Produces the final result

Key concepts include:
• Weights and Biases
• Activation Functions
• Backpropagation
• Gradient Descent`,
          keyPoints: [
            'Understanding basic neural network architecture',
            'Different types of neural networks',
            'Common applications in machine learning',
            'Training processes and optimization'
          ],
          dateCreated: new Date().toISOString()
        };
        
        setTimeout(() => {
          setSummary(mockSummary);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching summary:', error);
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          Summary not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{summary.title}</h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{summary.subject}</span>
            <span className="mx-2">•</span>
            <span>{new Date(summary.dateCreated).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="btn-outlined py-2 px-4 flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Save
          </button>
          <button className="btn-outlined py-2 px-4 flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="btn-primary py-2 px-4 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Summary</h2>
            <div className="prose dark:prose-invert max-w-none">
              {summary.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-300 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Points</h2>
            <ul className="space-y-3">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Study Tools</h2>
            <div className="space-y-3">
              <button className="w-full btn-outlined py-2 px-4 text-left flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Create Flashcards
              </button>
              <button className="w-full btn-outlined py-2 px-4 text-left flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Generate Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;