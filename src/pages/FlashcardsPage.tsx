import { useState } from 'react';
import { RefreshCw, Pencil, X, Plus, Clock, RotateCcw, Check, SkipForward, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample flashcard data
const sampleDecks = [
  { id: 1, title: 'Psychology 101', totalCards: 24, reviewDue: 'Today', lastReviewed: '2 days ago' },
  { id: 2, title: 'Organic Chemistry', totalCards: 48, reviewDue: 'Tomorrow', lastReviewed: '1 week ago' },
  { id: 3, title: 'Data Structures', totalCards: 32, reviewDue: '3 days', lastReviewed: '5 days ago' },
];

const sampleCards = [
  { id: 1, front: 'What is classical conditioning?', back: 'A learning process in which an association is made between a previously neutral stimulus and a stimulus that naturally evokes a response.' },
  { id: 2, front: 'Who developed the theory of psychosocial development?', back: 'Erik Erikson developed the theory of psychosocial development, which describes eight stages of development across the human lifespan.' },
  { id: 3, front: 'What is the difference between procedural and declarative memory?', back: 'Procedural memory is for skills and habits (knowing how), while declarative memory is for facts and events (knowing what).' },
  { id: 4, front: 'What is confirmation bias?', back: 'The tendency to search for, interpret, favor, and recall information in a way that confirms or supports one\'s prior beliefs or values.' },
  { id: 5, front: 'What does the neurotransmitter dopamine do?', back: 'Dopamine plays a major role in the brain\'s reward system, motivation, memory, attention and even regulating body movements.' },
];

interface FlashcardProps {
  front: string;
  back: string;
  onNext: () => void;
  onResult: (result: 'correct' | 'incorrect' | 'hard') => void;
}

const Flashcard = ({ front, back, onNext, onResult }: FlashcardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleFlip = () => {
    if (!flipped) {
      setFlipped(true);
    }
  };

  const handleResult = (result: 'correct' | 'incorrect' | 'hard') => {
    setAnswered(true);
    onResult(result);
    
    // Move to next card after a brief delay
    setTimeout(() => {
      setFlipped(false);
      setAnswered(false);
      onNext();
    }, 500);
  };

  return (
    <div 
      className="w-full max-w-lg mx-auto cursor-pointer relative"
      style={{ perspective: '1000px', height: '350px' }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center shadow-lg p-8 text-center"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 20 }}
        onClick={handleFlip}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-white dark:from-primary-900/30 dark:to-gray-800"></div>
        </div>
        <div className="relative z-10">
          <div className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
            {front}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            Click to reveal answer
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center shadow-lg p-8 bg-white dark:bg-gray-800"
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 20 }}
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        <div className="flex flex-col items-center justify-between h-full">
          <div className="overflow-y-auto text-center">
            <div className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-6">
              {back}
            </div>
          </div>
          
          {!answered && (
            <div className="grid grid-cols-3 gap-3 w-full mt-6">
              <button
                onClick={() => handleResult('incorrect')}
                className="py-2 px-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg font-medium text-sm flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition"
              >
                <X className="h-4 w-4 mr-1" /> Again
              </button>
              <button
                onClick={() => handleResult('hard')}
                className="py-2 px-3 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg font-medium text-sm flex items-center justify-center hover:bg-amber-200 dark:hover:bg-amber-900/50 transition"
              >
                <RotateCcw className="h-4 w-4 mr-1" /> Hard
              </button>
              <button
                onClick={() => handleResult('correct')}
                className="py-2 px-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg font-medium text-sm flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-900/50 transition"
              >
                <Check className="h-4 w-4 mr-1" /> Easy
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const FlashcardsPage = () => {
  const [activeTab, setActiveTab] = useState<'decks' | 'study'>('decks');
  const [activeDeck, setActiveDeck] = useState<number | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyStats, setStudyStats] = useState({ correct: 0, incorrect: 0, hard: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const handleStartStudy = (deckId: number) => {
    setActiveDeck(deckId);
    setActiveTab('study');
    setCurrentCardIndex(0);
    setStudyStats({ correct: 0, incorrect: 0, hard: 0 });
  };

  const handleCardResult = (result: 'correct' | 'incorrect' | 'hard') => {
    setStudyStats(prev => ({
      ...prev,
      [result]: prev[result] + 1
    }));
  };

  const handleNextCard = () => {
    if (currentCardIndex < sampleCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of deck
      setCurrentCardIndex(0);
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('decks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'decks'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            My Flashcard Decks
          </button>
          {activeDeck && (
            <button
              onClick={() => setActiveTab('study')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'study'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Study Session
            </button>
          )}
        </div>
      </div>

      {/* Decks List */}
      <AnimatePresence mode="wait">
        {activeTab === 'decks' && (
          <motion.div
            key="decks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Flashcard Decks</h1>
              <button className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-2" /> Create Deck
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sampleDecks.map((deck) => (
                <div 
                  key={deck.id} 
                  className="card border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{deck.title}</h3>
                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span>{deck.totalCards} cards</span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Review due: <span className="font-medium">{deck.reviewDue}</span></span>
                  </div>

                  <div className="flex justify-between mt-6">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Last reviewed: {deck.lastReviewed}
                    </span>
                    <button
                      onClick={() => handleStartStudy(deck.id)}
                      className="btn-primary py-1 px-3 text-sm"
                    >
                      Study Now
                    </button>
                  </div>
                </div>
              ))}

              {/* Create New Deck Card */}
              <div className="card border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-8">
                <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
                  <Plus className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Create New Deck</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  Start building your own custom flashcard deck
                </p>
                <button className="btn-outlined py-1 px-3 text-sm">
                  Create Deck
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Study Session */}
        {activeTab === 'study' && (
          <motion.div
            key="study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {sampleDecks.find(d => d.id === activeDeck)?.title} - Study Session
              </h1>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-4">
                  Card {currentCardIndex + 1} of {sampleCards.length}
                </span>
                <button
                  onClick={() => setActiveTab('decks')}
                  className="btn-outlined py-1 px-3 text-sm"
                >
                  End Session
                </button>
              </div>
            </div>

            {/* Study Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">Study Progress</span>
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Easy: {studyStats.correct}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hard: {studyStats.hard}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Again: {studyStats.incorrect}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    <SkipForward className="h-4 w-4 mr-1" />
                    Skip Card
                  </button>
                </div>
              </div>
            </div>

            {/* Flashcard Display */}
            <Flashcard
              front={sampleCards[currentCardIndex].front}
              back={sampleCards[currentCardIndex].back}
              onNext={handleNextCard}
              onResult={handleCardResult}
            />
            
            {/* Study Controls */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-outlined flex items-center"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Card
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlashcardsPage;