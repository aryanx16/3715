const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Header Skeleton */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div>
                            <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded-lg w-40 sm:w-44 lg:w-48 mb-2 animate-pulse"></div>
                            <div className="h-3 sm:h-4 bg-gray-200 rounded w-48 sm:w-56 lg:w-64 animate-pulse"></div>
                        </div>
                        <div className="h-8 sm:h-9 lg:h-10 bg-gray-200 rounded-lg w-28 sm:w-30 lg:w-32 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
                        <div className="h-8 sm:h-9 lg:h-10 bg-gray-200 rounded-lg w-24 sm:w-28 lg:w-32 flex-shrink-0 animate-pulse"></div>
                        <div className="h-8 sm:h-9 lg:h-10 bg-gray-200 rounded-lg w-20 sm:w-24 lg:w-28 flex-shrink-0 animate-pulse"></div>
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="h-5 sm:h-6 bg-gray-200 rounded w-32 sm:w-36 lg:w-40 animate-pulse"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                        <div className="space-y-6 sm:space-y-8">
                            {/* Date sections skeleton */}
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="relative">
                                    {/* Timeline line */}
                                    {item !== 3 && (
                                        <div className="absolute left-4 sm:left-6 top-10 sm:top-12 w-0.5 h-full bg-gray-200 animate-pulse"></div>
                                    )}

                                    {/* Date header skeleton */}
                                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
                                        <div className="min-w-0 flex-1">
                                            <div className="h-5 sm:h-6 bg-gray-200 rounded w-full max-w-xs sm:max-w-sm mb-1 animate-pulse"></div>
                                            <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32 animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Questions skeleton */}
                                    <div className="ml-11 sm:ml-14 lg:ml-16 space-y-2 sm:space-y-3">
                                        {[1, 2].map((qItem) => (
                                            <div
                                                key={qItem}
                                                className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100"
                                            >
                                                <div className="flex items-start justify-between gap-3 sm:gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
                                                            <div className="h-4 sm:h-5 bg-gray-200 rounded w-full max-w-xs sm:max-w-sm lg:max-w-md animate-pulse"></div>
                                                        </div>
                                                        <div className="h-5 sm:h-6 bg-gray-200 rounded-full w-12 sm:w-14 lg:w-16 animate-pulse"></div>
                                                    </div>
                                                    <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded-lg w-20 sm:w-24 lg:w-28 flex-shrink-0 animate-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loading indicator */}
                <div className="text-center mt-6 sm:mt-8">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm">Loading your progress...</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;