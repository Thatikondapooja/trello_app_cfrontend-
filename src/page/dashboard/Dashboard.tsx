// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { useNavigate } from "react-router-dom";
// import { selectBoard } from "../../features/auth/board/boardSlice";

// const Dashboard = () => {
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//     const boards = useAppSelector((state) => state.board.boards);

//     const handleBoardClick = (boardId: string) => {
//         dispatch(selectBoard(boardId));
//         navigate("/board");
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500  relative overflow-hidden">
//             {/* Animated Background Elements */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//                 <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl"></div>
//             </div>

//             {/* Main Content */}
//             <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <div className="mb-12">
//                     <div className="flex items-center gap-3 mb-4">
//                         <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-lg">
//                             <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10" />
//                             </svg>
//                         </div>
//                         <div>
//                             <h1 className="text-4xl font-bold text-white drop-shadow-lg">
//                                 Your Boards
//                             </h1>
//                             <p className="text-white/80 text-sm mt-1">
//                                 {boards.length} {boards.length === 1 ? 'board' : 'boards'} available
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Boards Grid */}
//                 {boards.length === 0 ? (
//                     // Empty State
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-md">
//                             <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
//                                 <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-2xl font-bold text-gray-800 mb-3">
//                                 No Boards Yet
//                             </h3>
//                             <p className="text-gray-600 mb-6">
//                                 Create your first board to get started with organizing your tasks and projects.
//                             </p>
//                             <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
//                                 Create Board
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     // Boards Grid
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {boards.map((board) => (
//                             <div
//                                 key={board.id}
//                                 onClick={() => handleBoardClick(board.id)}
//                                 className="group cursor-pointer"
//                             >
//                                 <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-white/20">
//                                     {/* Board Color Header */}
//                                     <div className="h-32 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative overflow-hidden">
//                                         <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
//                                         {/* Decorative Pattern */}
//                                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
//                                         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
//                                     </div>

//                                     {/* Board Content */}
//                                     <div className="p-5">
//                                         <h2 className="text-xl font-bold text-gray-800 mb-2  group-hover:text-purple-600 transition-colors">
//                                             {board.title}
//                                         </h2>
//                                         <p className="text-sm text-gray-600 line-clamp-2 mb-4">
//                                             {board.description || "No description"}
//                                         </p>

//                                         {/* Board Stats/Meta */}
//                                         <div className="flex items-center justify-between pt-3 border-t border-gray-200">
//                                             <div className="flex items-center gap-2 text-xs text-gray-500">
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                 </svg>
//                                                 <span>Recently updated</span>
//                                             </div>
//                                             <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                                                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Create New Board Card */}
//                         <div className="group cursor-pointer">
//                             <div className="bg-white/40 backdrop-blur-lg rounded-2xl border-2 border-dashed border-white/60 hover:border-white hover:bg-white/60 transition-all duration-300 h-full min-h-[280px] flex flex-col items-center justify-center p-6">
//                                 <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
//                                     <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-lg font-semibold text-white mb-2">
//                                     Create New Board
//                                 </h3>
//                                 <p className="text-sm text-white/80 text-center">
//                                     Start a new project or workspace
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
// import { selectBoard } from "../../features/auth/board/boardSlice";
import { useEffect } from "react";
import { fetchBoards } from "../../features/auth/board/boardThunks";
import Button from "../../components/comman/Button";
import { selectBoard } from "../../features/auth/board/boardSlice";

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const boards = useAppSelector(state => state.board.boards);
    console.log("boars in dashboard",boards)
    useEffect(() => {
        dispatch(fetchBoards());
    }, []);

    const handleBoardClick = (boardId:number) => {
        console.log("dashboard")
        dispatch(selectBoard(boardId));
        navigate("/board");

   
     };
function handleNewBoard(){
    console.log("dash")
    navigate("/board/create");
}
   
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-30">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">T</span>
                    </div>
                    <span className="text-lg font-bold  font-lato text-slate-900 tracking-tight">Trello Clone</span>
                </div>
                {/* <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div> */}
            </nav>

            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Workspace Boards</h1>
                        <p className="text-slate-500 mt-1">Manage and track your active projects</p>
                    </div>
                    <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                        <span>+</span> New Board
                    </button>
                </div>

                {boards.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Create your first board</h3>
                        <p className="text-slate-500 mb-6 max-w-xs mx-auto  font-lato">Get started by organizing your tasks and projects in a visual workspace.</p>
                        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors" onClick={handleNewBoard}>
                            Create Board
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {boards.map((board) => (
                            <div
                                key={board.id}
                                onClick={() => handleBoardClick(board.id)}
                                className="group cursor-pointer bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                            >
                                <div className="h-28 bg-slate-200 group-hover:bg-indigo-50/50 transition-colors relative">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                                                        
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/15 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/15 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500 opacity-50 group-hover:opacity-100 "></div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {board.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                                        {board.description || "Project management workspace"}
                                    </p>
                                    <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-4">
                                        <div className="flex items-center gap-1.5  font-lato uppercase tracking-wider">
                                            <span>Active</span>
                                        </div>
                                        <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Professional Add Card */}
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer flex flex-col items-center justify-center p-8 group">
                            <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
                                <span className="text-2xl text-slate-400 group-hover:text-indigo-600">+</span>
                            </div>
                                <Button className="text-slate-600 font-lato  bg-indigo-500 group-hover:bg-indigo-600" onClick={handleNewBoard}>New Board</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;