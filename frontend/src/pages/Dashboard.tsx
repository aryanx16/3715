import { useEffect, useState } from "react";
import { CalendarDays, Code, TrendingUp, Award, ExternalLink, Calendar, Clock } from "lucide-react";

type Question = {
  _id: string;
  title: string;
  difficulty: string;
  link: string;
  dateSolved: string;
};

type GroupedQuestions = {
  [date: string]: Question[];
};

function getBadgeColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "hard":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function getProgressColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "from-emerald-500 to-emerald-600";
    case "medium":
      return "from-amber-500 to-amber-600";
    case "hard":
      return "from-red-500 to-red-600";
    default:
      return "from-gray-500 to-gray-600";
  }
}

export default function Dashboard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate API call with sample data
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Simulating API call with sample data
        setTimeout(() => {
          const sampleData: Question[] = [
            {
              _id: "1",
              title: "Two Sum",
              difficulty: "Easy",
              link: "https://leetcode.com/problems/two-sum/",
              dateSolved: "2024-06-14"
            },
            {
              _id: "2",
              title: "Add Two Numbers",
              difficulty: "Medium",
              link: "https://leetcode.com/problems/add-two-numbers/",
              dateSolved: "2024-06-14"
            },
            {
              _id: "3",
              title: "Longest Substring Without Repeating Characters",
              difficulty: "Medium",
              link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
              dateSolved: "2024-06-13"
            },
            {
              _id: "4",
              title: "Median of Two Sorted Arrays",
              difficulty: "Hard",
              link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
              dateSolved: "2024-06-13"
            },
            {
              _id: "5",
              title: "Palindrome Number",
              difficulty: "Easy",
              link: "https://leetcode.com/problems/palindrome-number/",
              dateSolved: "2024-06-12"
            }
          ];
          setQuestions(sampleData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("❌ Failed to fetch questions.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const grouped: GroupedQuestions = {};
  questions.forEach((q) => {
    const date = new Date(q.dateSolved).toLocaleDateString("en-CA");
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(q);
  });

  // Calculate stats
  const totalQuestions = questions.length;
  const difficultyStats = questions.reduce((acc, q) => {
    acc[q.difficulty.toLowerCase()] = (acc[q.difficulty.toLowerCase()] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    gradient: string;
  }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200   z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Coding Dashboard</h1>
                <p className="text-gray-600">Track your problem-solving journey</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {questions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Yet</h3>
            <p className="text-gray-600 mb-8">Start solving problems to see your progress here!</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Add Your First Question
            </button>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Award}
                title="Total Solved"
                value={totalQuestions}
                subtitle="Problems"
                gradient="from-blue-500 to-blue-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Easy Problems"
                value={difficultyStats.easy || 0}
                gradient="from-emerald-500 to-emerald-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Medium Problems"
                value={difficultyStats.medium || 0}
                gradient="from-amber-500 to-amber-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Hard Problems"
                value={difficultyStats.hard || 0}
                gradient="from-red-500 to-red-600"
              />
            </div>

            {/* Questions Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Recent Activity
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-8">
                  {Object.keys(grouped)
                    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                    .map((date, dateIndex) => (
                      <div key={date} className="relative">
                        {/* Timeline line */}
                        {dateIndex !== Object.keys(grouped).length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-blue-200 to-transparent"></div>
                        )}
                        
                        {/* Date header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <CalendarDays className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {grouped[date].length} problem{grouped[date].length !== 1 ? 's' : ''} solved
                            </p>
                          </div>
                        </div>

                        {/* Questions list */}
                        <div className="ml-16 space-y-3">
                          {grouped[date].map((q, index) => (
                            <div
                              key={q._id}
                              className="group bg-gray-50 hover:bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 animate-fadeIn"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getProgressColor(q.difficulty)}`}></div>
                                    <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                      {q.title}
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getBadgeColor(q.difficulty)}`}>
                                      {q.difficulty}
                                    </span>
                                  </div>
                                </div>
                                <a
                                  href={q.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group-hover:shadow-sm"
                                >
                                  View Problem
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}