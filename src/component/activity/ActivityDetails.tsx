import { useState } from "react";
import ActivityLog from "./ActivityLog";

export default function ActivityDetails() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            {/* Activity Button */}
            <button
                onClick={() => setIsVisible(true)}
                className="flex items-center gap-1 md:gap-2 p-2 md:px-4 md:py-2.5 rounded-xl bg-slate-100/50 hover:bg-slate-200 transition-all duration-200 border border-slate-200"
            >
                <span className="w-8 h-8 rounded-full bg-gradient-to-l from-indigo-500 to-blue-400 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <span className="hidden md:inline text-slate-700 text-sm font-medium">Activity</span>
            </button>

            {isVisible && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setIsVisible(false)}
                    />

                    {/* Activity Drawer */}
                    <div className="fixed top-0 right-0 h-screen w-[420px] bg-gradient-to-l from-indigo-300 to-blue-300  shadow-2xl flex flex-col z-[60] animate-slide-in">
                        {/* Header */}
                        <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
                            <h2 className="text-xl font-bold text-indigo-800 flex items-center gap-3">
                                <span className="w-11 h-11 rounded-full bg-gradient-to-l from-indigo-500 to-blue-400  to-pink-500 flex items-center justify-center text-white shadow-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                Activity Log
                            </h2>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-indigo-400 hover:text-indigo-700 text-xl w-9 h-9 rounded-lg hover:bg-white/60 transition-all flex items-center justify-center"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-5">
                            <ActivityLog />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}