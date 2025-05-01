import React from 'react';

function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <p className="mt-1 text-gray-900 dark:text-white">John Doe</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p className="mt-1 text-gray-900 dark:text-white">john.doe@example.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Study Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Documents Uploaded</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Flashcards Created</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">48</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Quizzes Completed</h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">15</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Preferences</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                <button className="bg-primary-500 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-600 transition-colors">
                  Manage
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Study Reminders</span>
                <button className="bg-primary-500 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-600 transition-colors">
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;