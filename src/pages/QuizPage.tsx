import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, Award } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "What is the primary purpose of activation functions in neural networks?",
    options: [
      "To add non-linearity to the network",
      "To reduce the network size",
      "To speed up training",
      "To prevent overfitting"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "Which of the following is NOT a common activation function?",
    options: [
      "ReLU",
      "Sigmoid",
      "Tangent",
      "Quadratic"
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    text: "What is backpropagation used for in neural networks?",
    options: [
      "To predict future inputs",
      "To calculate and update weights",
      "To compress the network",
      "To visualize the network"
    ],
    correctAnswer: 1
  }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(mockQuestions.length).fill(null));

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    
    setSelectedAnswer(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (optionIndex === mockQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(mockQuestions.length).fill(null));
  };

  if (showResult) {
    const percentage = (score / mockQuestions.length) * 100;
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <Award className="h-16 w-16 text-primary-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completed!</h2>
              <p className="text-gray-600 dark:text-gray-400">
                You scored {score} out of {mockQuestions.length} questions correctly
              </p>
            </div>

            <div className="mb-8">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${
                    percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{percentage}% Correct</p>
            </div>

            <button
              onClick={resetQuiz}
              className="btn-primary flex items-center justify-center mx-auto"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Neural Networks Quiz</h1>
            <span className="text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{question.text}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = selectedAnswer !== null && index === question.correctAnswer;
              const isWrong = isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${
                      isSelected
                        ? isCorrect
                          ? 'text-green-700 dark:text-green-400'
                          : 'text-red-700 dark:text-red-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {option}
                    </span>
                    {selectedAnswer !== null && (
                      isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : isWrong ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            {selectedAnswer !== null ? (
              selectedAnswer === question.correctAnswer ? (
                <span className="text-green-600 dark:text-green-400">Correct!</span>
              ) : (
                <span className="text-red-600 dark:text-red-400">Incorrect</span>
              )
            ) : ' '}
          </span>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`btn-primary flex items-center ${
              selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentQuestion === mockQuestions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;