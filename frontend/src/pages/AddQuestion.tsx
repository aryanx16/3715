import { useState } from "react";
import toast from 'react-hot-toast';
import { PlusCircle, CheckCircle2 } from "lucide-react";

export default function AddQuestion() {
  const [question, setQuestion] = useState({
    title: "",
    difficulty: "",
    link: "",
    dateSolved: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You're not logged in!", {
        icon: '🔐',
        duration: 4000,
      });
      return;
    }

    if (!question.title || !question.difficulty || !question.link || !question.dateSolved) {
      toast.error("Please fill all fields!", {
        icon: '📝',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading('Adding question...');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${BACKEND_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(question),
      });

      if (response.ok) {
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success(`Question "${question.title}" added successfully!`, {
          icon: '🎉',
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#10B981',
            color: '#fff',
          },
        });

        // Reset form
        setQuestion({ title: "", difficulty: "", link: "", dateSolved: "" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add question");
      }
    } catch (err: any) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error(err.message || "Failed to add question", {
        icon: '❌',
        duration: 5000,
        style: {
          borderRadius: '10px',
          background: '#EF4444',
          color: '#fff',
        },
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: any) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-8">
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-10 rounded-2xl shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <PlusCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Solved Question</h1>
          <p className="text-gray-600">Track your coding progress and achievements</p>
        </div>

        <div className="space-y-6">
          {/* Question Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Question Title
            </label>
            <input
              type="text"
              name="title"
              value={question.title}
              onChange={handleChange}
              placeholder="e.g. Two Sum, Binary Tree Traversal"
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
              disabled={isLoading}
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Difficulty Level
            </label>
            <div className="relative">
              <select
                name="difficulty"
                value={question.difficulty}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 appearance-none cursor-pointer ${question.difficulty ? getDifficultyColor(question.difficulty) : 'border-gray-200'
                  } ${isLoading ? 'opacity-50' : ''}`}
              >
                <option value="" className="text-gray-500">Select difficulty level</option>
                <option value="Easy" className="text-emerald-600">Easy</option>
                <option value="Medium" className="text-amber-600">Medium</option>
                <option value="Hard" className="text-red-600">Hard</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* LeetCode Link */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Problem Link
            </label>
            <input
              type="url"
              name="link"
              value={question.link}
              onChange={handleChange}
              placeholder="https://leetcode.com/problems/two-sum"
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
              disabled={isLoading}
            />
          </div>

          {/* Date Solved */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Date Solved
            </label>
            <input
              type="date"
              name="dateSolved"
              value={question.dateSolved}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-8 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isLoading ? 'Adding Question...' : 'Add Question to Progress'}
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Keep track of your coding journey and celebrate your achievements
          </p>
        </div>
      </div>
    </div>
  );
}