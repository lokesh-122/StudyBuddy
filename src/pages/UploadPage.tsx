import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, FileImage, FileArchive, FilePlus, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const fileTypes = [
  { name: 'PDF', extensions: ['.pdf'], icon: FileText },
  { name: 'Word', extensions: ['.doc', '.docx'], icon: FileText },
  { name: 'Text', extensions: ['.txt'], icon: FileText },
  { name: 'Images', extensions: ['.jpg', '.jpeg', '.png'], icon: FileImage },
  { name: 'Others', extensions: ['.ppt', '.pptx', '.xls', '.xlsx'], icon: FileArchive },
];

const UploadPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB max file size
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, here you would upload files to server and process them
      setIsProcessing(false);
      // Navigate to summary page after processing
      // navigate('/summary/1');
    }, 3000);
  };

  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    const fileType = fileTypes.find(type => type.extensions.includes(extension));
    return fileType ? fileType.icon : FilePlus;
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Learning Material</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Upload Box */}
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragActive 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
                : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-base text-gray-600 dark:text-gray-400">
              {isDragActive
                ? "Drop your files here..."
                : "Drag & drop files here, or click to select files"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Supports PDF, Word, Text Files (max 50MB)
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                Uploaded Files ({files.length})
              </h3>
              <div className="space-y-3">
                {files.map((file, index) => {
                  const FileIcon = getFileTypeIcon(file.name);
                  return (
                    <motion.div 
                      key={`${file.name}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                          <FileIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary Options */}
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
              Summary Options
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Summary Length
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setSummaryLength('short')}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    summaryLength === 'short'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Short
                </button>
                <button
                  type="button"
                  onClick={() => setSummaryLength('medium')}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    summaryLength === 'medium'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setSummaryLength('detailed')}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    summaryLength === 'detailed'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Detailed
                </button>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center text-sm text-primary-600 dark:text-primary-400 mt-4 focus:outline-none"
            >
              <span>Advanced Options</span>
              <ChevronDown 
                className={`ml-1 h-4 w-4 transition-transform ${showAdvanced ? 'transform rotate-180' : ''}`} 
              />
            </button>

            {/* Advanced Options */}
            {showAdvanced && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Psychology, Computer Science"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="topics" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Key Topics (comma separated)
                  </label>
                  <input
                    type="text"
                    id="topics"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    placeholder="e.g., Neural Networks, Machine Learning, AI"
                    className="input-field"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={files.length === 0 || isProcessing}
              className={`btn-primary w-full flex items-center justify-center ${
                (files.length === 0 || isProcessing) ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  Generate Summary
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;