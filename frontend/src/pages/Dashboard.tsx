import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink, Calendar, Filter, Brain, Settings } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

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

type SortOrder = 'newest' | 'oldest';
type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

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
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
    const [showSpacedRepetition, setShowSpacedRepetition] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${BACKEND_URL}/api/questions`, {
                    headers: { Authorization: `${token}` },
                });

                setQuestions(res.data || []);
            } catch (err) {
                setError("❌ Failed to fetch questions.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    // Filter and sort questions
    const filteredQuestions = questions.filter(q =>
        difficultyFilter === 'all' || q.difficulty.toLowerCase() === difficultyFilter
    );

    const grouped: GroupedQuestions = {};
    filteredQuestions.forEach((q) => {
        const date = new Date(q.dateSolved).toLocaleDateString("en-CA");
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(q);
    });

    // Sort dates
    const sortedDates = Object.keys(grouped).sort((a, b) => {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Calculate spaced repetition data
    //   const today = new Date();
    const getDateXDaysAgo = (days: number) => {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toLocaleDateString("en-CA");
    };

    const spacedRepetitionData = {
        threeDaysAgo: questions.filter(q =>
            new Date(q.dateSolved).toLocaleDateString("en-CA") === getDateXDaysAgo(3)
        ),
        sevenDaysAgo: questions.filter(q =>
            new Date(q.dateSolved).toLocaleDateString("en-CA") === getDateXDaysAgo(7)
        ),
        fifteenDaysAgo: questions.filter(q =>
            new Date(q.dateSolved).toLocaleDateString("en-CA") === getDateXDaysAgo(15)
        )
    };

    const totalReviewQuestions = spacedRepetitionData.threeDaysAgo.length +
        spacedRepetitionData.sevenDaysAgo.length +
        spacedRepetitionData.fifteenDaysAgo.length;

    const SpacedRepetitionCard = ({ title, questions, icon: Icon, gradient }: {
        title: string;
        questions: Question[];
        daysAgo: number;
        icon: any;
        gradient: string;
    }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-lg bg-gradient-to-r ${gradient} shadow-sm`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-gray-500">
                        {questions.length} question{questions.length !== 1 ? 's' : ''} to review
                    </p>
                </div>
            </div>

            {questions.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {questions.map((q) => (
                        <div key={q._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getProgressColor(q.difficulty)}`}></div>
                                <span className="text-sm font-medium text-gray-900 truncate">{q.title}</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${getBadgeColor(q.difficulty)}`}>
                                    {q.difficulty.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <a
                                href={q.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4">
                    <div className="text-gray-400 text-sm">No problems to review</div>
                </div>
            )}
        </div>
    );

    const HeaderControls = () => (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            {/* Left side - Title and Spaced Review Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Problem Dashboard</h1>
                    <p className="text-gray-600 text-sm mt-1">Track your coding progress and review schedule</p>
                </div>

                {totalReviewQuestions > 0 && (
                    <button
                        onClick={() => setShowSpacedRepetition(!showSpacedRepetition)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${showSpacedRepetition
                                ? 'bg-purple-100 text-purple-700 border border-purple-200 shadow-sm'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm'
                            }`}
                    >
                        <Brain className="w-4 h-4" />
                        <span className="text-sm">Review Mode</span>
                        <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {totalReviewQuestions}
                        </span>
                    </button>
                )}
            </div>

            {/* Right side - Filter Controls */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                    <Settings className="w-4 h-4 text-gray-400 ml-2" />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                        className="px-3 py-2 text-sm border-0 bg-transparent focus:ring-0 focus:outline-none cursor-pointer text-gray-700 font-medium"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                    <Filter className="w-4 h-4 text-gray-400 ml-2" />
                    <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                        className="px-3 py-2 text-sm border-0 bg-transparent focus:ring-0 focus:outline-none cursor-pointer text-gray-700 font-medium"
                    >
                        <option value="all">All Levels</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {(sortOrder !== 'newest' || difficultyFilter !== 'all') && (
                    <button
                        onClick={() => {
                            setSortOrder('newest');
                            setDifficultyFilter('all');
                        }}
                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200 shadow-sm"
                    >
                        Reset
                    </button>
                )}
            </div>
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
            <div className="max-w-7xl mx-auto px-6 py-8">
                {questions.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CalendarDays className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Yet</h3>
                        <p className="text-gray-600 mb-8">Start solving problems to see your progress here!</p>
                        <Link to={"/add-question"}>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Add Your First Question
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Header with Controls */}
                        <HeaderControls />

                        {/* Spaced Repetition Section */}
                        {showSpacedRepetition && (
                            <div className="mb-8 animate-slideDown">
                                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-sm">
                                            <Brain className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">Spaced Repetition Review</h2>
                                            <p className="text-gray-600 text-sm">
                                                Review problems at optimal intervals to strengthen retention
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <SpacedRepetitionCard
                                            title="3 Days Ago"
                                            questions={spacedRepetitionData.threeDaysAgo}
                                            daysAgo={3}
                                            icon={Calendar}
                                            gradient="from-emerald-500 to-emerald-600"
                                        />
                                        <SpacedRepetitionCard
                                            title="1 Week Ago"
                                            questions={spacedRepetitionData.sevenDaysAgo}
                                            daysAgo={7}
                                            icon={Calendar}
                                            gradient="from-amber-500 to-amber-600"
                                        />
                                        <SpacedRepetitionCard
                                            title="2 Weeks Ago"
                                            questions={spacedRepetitionData.fifteenDaysAgo}
                                            daysAgo={15}
                                            icon={Calendar}
                                            gradient="from-purple-500 to-purple-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Filter Status */}
                        {(difficultyFilter !== 'all' || filteredQuestions.length !== questions.length) && (
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                                    <Filter className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Showing {filteredQuestions.length} of {questions.length} questions
                                        {difficultyFilter !== 'all' && (
                                            <span className="ml-1">• <span className="capitalize">{difficultyFilter}</span> level</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Questions Timeline */}
                        {filteredQuestions.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Filter className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Questions Match Your Filters</h3>
                                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                                <button
                                    onClick={() => {
                                        setSortOrder('newest');
                                        setDifficultyFilter('all');
                                    }}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                        Problem History
                                    </h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-8">
                                        {sortedDates.map((date, dateIndex) => (
                                            <div key={date} className="relative">
                                                {/* Timeline line */}
                                                {dateIndex !== sortedDates.length - 1 && (
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
                        )}
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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
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
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out forwards;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
        </div>
    );
}