// import { useState } from "react";
// import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";

// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import { addList } from "../list/listSlice";
// import { addActivity } from "../../activity/activitySlice";
// import { addCard, moveCard } from "../card/cardSlice";
// import InputComponent from "../../../components/comman/inputComponent";
// import Button from "../../../components/comman/Button";
// import ActivityLog from "../../../component/activity/ActivityLog";
// import ListColumn from "../../../component/kanban/ListCloumns";
// import ActivityDetailes from "../../../component/activity/ActivityDetails";

// export default function BoardView() {
//     const dispatch = useAppDispatch();

//     // Local UI state
//     const [listTitle, setListTitle] = useState("");
//     const [cardTitles, setCardTitles] = useState<Record<string, string>>({});
//     const [isAddingList, setIsAddingList] = useState(false);
//     const [activeCard, setActiveCard] = useState<{ id: string; title: string } | null>(null);

//     // Redux state
//     const selectedBoardId = useAppSelector(
//         (state) => state.board.selectedBoardId
//     );

//     const lists = useAppSelector((state) =>
//         state.list.lists.filter((list) => list.boardId === selectedBoardId)
//     );

//     const cards = useAppSelector((state) => state.card.cards);

//     if (!selectedBoardId) {
//         return (
//             <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-yellow-400 to-pink-400">
//                 <div className="bg-white rounded-lg shadow-xl p-8 text-center">
//                     <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10" />
//                     </svg>
//                     <h3 className="text-xl font-semibold text-gray-700 mb-2">No Board Selected</h3>
//                     <p className="text-gray-500">Please select a board from the sidebar to get started</p>
//                 </div>
//             </div>
//         );
//     }

//     // ✅ Add List
//     const handleAddList = () => {
//         if (!listTitle) return;

//         dispatch(
//             addList({
//                 id: Date.now().toString(),
//                 boardId: selectedBoardId,
//                 title: listTitle,
//             })
//         );

//         dispatch(
//             addActivity({
//                 id: Date.now().toString(),
//                 message: `List "${listTitle}" was created`,
//                 timestamp: Date.now(),
               
//             })
//         );

//         setListTitle("");
//         setIsAddingList(false);
//     };

//     // ✅ Add Card
//     const handleAddCard = (listId: string) => {
//         const title = cardTitles[listId];
//         if (!title) return;

//         dispatch(
//             addCard({
//                 id: Date.now().toString(),
//                 listId,
//                 title,
//             })
//         );

//         dispatch(
//             addActivity({
//                 id: Date.now().toString(),
//                 message: `Card "${title}" was added`,
//                 timestamp: Date.now(),
              
//             })
//         );

//         setCardTitles((prev) => ({ ...prev, [listId]: "" }));
//     };

//     // 🎨 Track active card for beautiful overlay
//     const handleDragStart = (event: DragStartEvent) => {
//         const card = cards.find((c) => c.id === event.active.id);
//         if (card) {
//             setActiveCard(card);
//         }
//     };

//     // ✅ Drag & Drop
//     const handleDragEnd = (event: DragEndEvent) => {
//         const { active, over } = event;
//         setActiveCard(null); // Clear active card

//         if (!over) return;

//         dispatch(
//             moveCard({
//                 cardId: active.id as string,
//                 toListId: over.id as string,
//             })
//         );

//         dispatch(
//             addActivity({
//                 id: Date.now().toString(),
//                 message: "Card was moved to another list",
//                 timestamp: Date.now(),
             
//             })
//         );
//     };

//     return (
//         <div className=" min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500  relative overflow-hidden">
//             {/* ===== BOARD AREA ===== */}
//             {/* Board Header */}
//             <div className="px-6 py-5 mx-6 mt-6 rounded-2xl bg-white/15  border border-white/20 shadow-xl">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-lg">
//                             <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10" />
//                             </svg>
//                         </div>
//                         <div>
//                             <h1 className="text-3xl font-bold text-white drop-shadow-lg">Board View</h1>
//                             <p className="text-white/80 text-sm mt-0.5">Manage your tasks and workflow</p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2 px-4 py-2 rounded-xl  backdrop-blur-sm border border-white/30">
//                             <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
//                             </svg>
//                             <span className="text-white font-semibold">{lists.length}</span>
//                             <span className="text-white/80 text-sm">{lists.length === 1 ? 'List' : 'Lists'}</span>
//                         </div>
//                         <ActivityDetailes />
//                     </div>
//                 </div>
        
//                 {/* Kanban Board Container */}
//                 <div className="mt-6 mx-6 rounded-3xl bg-white/10 backdrop-blur-xl border-transparent border-white/20 shadow p-6 overflow-x-auto">
//                     <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//                         <div className="flex gap-4 h-full items-start">
//                             {/* Lists */}
//                             {lists.map((list) => (
//                                 <ListColumn
//                                     key={list.id}
//                                     listId={list.id}
//                                     title={list.title}
//                                     cards={cards.filter(
//                                         (card) => card.listId === list.id
//                                     )}
//                                     cardTitles={cardTitles}
//                                     setCardTitles={setCardTitles}
//                                     onAddCard={handleAddCard}
//                                 />
//                             ))}

//                             {/* Add List Button/Form */}
//                             <div className="shrink-0 w-[280px]">
//                                 {isAddingList ? (
//                                     <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
//                                         <div className="mb-2">
//                                             <InputComponent
//                                                 value={listTitle}
//                                                 onChange={(e) => setListTitle(e.target.value)}
//                                                 placeholder="Enter list title..."
//                                             />
//                                         </div>
//                                         <div className="flex gap-2">
//                                             <Button onClick={handleAddList}>
//                                                 Add List
//                                             </Button>
//                                             <button
//                                                 onClick={() => {
//                                                     setIsAddingList(false);
//                                                     setListTitle("");
//                                                 }}
//                                                 className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded"
//                                             >
//                                                 ✕
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                         <div
//                                             onClick={() => setIsAddingList(true)}
//                                             className="w-[280px] shrink-0 cursor-pointer bg-white/30 backdrop-blur-lg rounded-2xl border-2 border-dashed border-white/60
//                                              hover:bg-white/40 transition-all flex items-center justify-center p-6 text-white font-medium"
//                                         >
//                                             + Add another list
//                                         </div>

//                                 )}
//                             </div>
                          
//                         </div>

//                         {/* 🎨 Beautiful Drag Overlay */}
//                         {/* 🎨 Beautiful Drag Overlay */}
//                         <DragOverlay>
//                             {activeCard ? (
//                                 <div className="bg-white rounded-xl p-3 -44  border-2 border-purple-400">
//                                     <p className="text-sm text-gray-700 font-medium">{activeCard.title}</p>
//                                 </div>
//                             ) : null}
//                         </DragOverlay>
//                     </DndContext>
//                 </div>
//             </div>
          
//             {/* ===== ACTIVITY PANEL =====
//             <div className="w-[340px] shrink-0 m-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/30 flex flex-col">

//                 {/* Header */}
//                 {/* <div className="px-6 py-4 border-b border-gray-200/60">
//                     <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                         <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                             <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </span>
//                         Activity
//                     </h2>
//                 </div> */}

//                 {/* Activity Content */}
//                 {/* <div className="flex-1 overflow-y-auto px-4 py-4 ">
//                     <ActivityLog />
//                 </div>
//             </div> */} 
//         </div>

//    );
// }


import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addActivity } from "../../activity/activitySlice";
import InputComponent from "../../../components/comman/inputComponent";
import Button from "../../../components/comman/Button";
import ListColumn from "../../../component/kanban/ListCloumns";
import ActivityDetailes from "../../../component/activity/ActivityDetails";
import { createList, fetchLists } from "../list/listThunks";
import { createCard, fetchCardById, fetchCardsByList, moveCardThunk } from "../card/cardThunks";
import { arrayMove } from "@dnd-kit/sortable";
import { clearSelectedCard, reorderCards } from "../card/cardSlice";
import CardDetailsModal from "../card/CardDetailsModel";
export default function BoardView() {
    const dispatch = useAppDispatch();
    const [listTitle, setListTitle] = useState("");
    const [cardTitles, setCardTitles] = useState<Record<string, string>>({});
    const [isAddingList, setIsAddingList] = useState(false);
    const [activeCard, setActiveCard] = useState<{ id: number; title: string } | null>(null);
    const boards = useAppSelector(state => state.board.boards);
    console.log("boars in dashboard", boards)
    const selectedBoardId = useAppSelector(
        (state) => state.board.selectedBoardId
    );
    console.log("selectedBoardId", selectedBoardId)
    const lists = useAppSelector((state) =>
        state.list.lists.filter(
            (list) => list.boardId === Number(selectedBoardId)
        )
    );

    console.log("lists ", lists)

    const cards = useAppSelector((state) => state.card.cards);
    console.log("cards from board", cards)


    useEffect(() => {
        if (selectedBoardId) {
           dispatch(fetchLists(Number(selectedBoardId)));

        }
    }, [selectedBoardId, dispatch]);


    useEffect(() => {
        lists.forEach((list) => {
            dispatch(fetchCardsByList(list.id));
        });
    }, [lists, dispatch]);


    

    if (!selectedBoardId) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-slate-200 max-w-md">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Workspace Selected</h3>
                    <p className="text-slate-500">Go back to the dashboard and pick a board to view your tasks.</p>
                </div>
            </div>
        );
    }

    // Handlers (Functionality kept exactly the same as requested)
    const handleAddList = () => {
       console.log("hello")
            if (!listTitle || !selectedBoardId) return;
        console.log("hello y")

            dispatch(
                createList({
                    title: listTitle,
                    boardId: Number(selectedBoardId),
                })
            );

        // dispatch(addList({ id: Date.now().toString(), boardId: selectedBoardId, title: listTitle }));
        dispatch(addActivity({ id: Date.now().toString(), message: `List "${listTitle}" created`, timestamp: Date.now() }));
        setListTitle("");
        setIsAddingList(false);
    };

    const handleAddCard = (listId: number) => {
        const title = cardTitles[listId];
        if (!title) return;

        dispatch(
            createCard({
                title,
                listId,
            })
        );
        // dispatch(addCard({ id: Date.now().toString(), listId, title }));
        dispatch(addActivity({ id: Date.now().toString(), message: `Card "${title}" added`, timestamp: Date.now() }));
        setCardTitles((prev) => ({ ...prev, [listId]: "" }));
    };

    const handleDragStart = (event: DragStartEvent) => {
        const card = cards.find((c) => c.id === event.active.id);
        if (card) setActiveCard(card);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveCard(null);

        if (!over) return;

        // dragged card
        const activeCard = cards.find((c) => c.id === active.id);
        if (!activeCard) return;

        const fromListId = activeCard.listId;

        // destination list (from droppable metadata)
        const toListId =
            over.data.current?.listId ??
            cards.find((c) => c.id === over.id)?.listId;

        if (!toListId) return;

        // 🔁 SAME LIST → REORDER
        if (fromListId === toListId) {
            dispatch(
                reorderCards({
                    listId: fromListId,
                    activeId: Number(active.id),
                    overId: Number(over.id),
                })
            );
            return;
        }

        // ➡️ DIFFERENT LIST → MOVE (backend)
        dispatch(
            moveCardThunk({
                cardId: Number(active.id),
                toListId,
            })
        );

        dispatch(
            addActivity({
                id: Date.now().toString(),
                message: "Card moved",
                timestamp: Date.now(),
            })
        );
    };

    const selectedCard = useAppSelector(state => state.card.selectedCard);
    console.log("selectedCard", selectedCard)

    const handleCardClick = (cardId: number) => {
    
        dispatch(fetchCardById(cardId));
       
    };


    return (
        <div className="min-h-screen bg-slate-50 flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100 ">
                            <svg className="w-5 h-5 text-indigo-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="md:text-xl text-xs  font-bold text-slate-900 leading-none">Project Workspace</h1>
                            <p className="md:text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">{lists.length} Columns</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <ActivityDetailes />
                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main Board View */}
            <main className=" p-8 flex flex-col md:flex-row md:gap-3 overflow-x-auto  gap-6 items-start custom-scrollbar">
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    {lists.map((list) => (
                        <ListColumn
                            key={list.id}
                            listId={(list.id)}
                            title={list.title}
                            cards={cards.filter((card) => card.listId === list.id)}
                            cardTitles={cardTitles}
                            setCardTitles={setCardTitles}
                            onAddCard={handleAddCard}
                            onCardClick={handleCardClick}   // ✅ THIS WAS MISSING

                        />
                    ))}

                    {/* New List Column */}
                    <div className="w-80 shrink-0">
                        {isAddingList ? (
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                                <InputComponent
                                    value={listTitle}
                                    onChange={(e) => setListTitle(e.target.value)}
                                    placeholder="Enter title..."
                                    className="mb-3"
                                   
                                />
                                <div className="flex gap-2">
                                    <Button onClick={handleAddList} className=" px-4 py-2 text-sm font-lato text-white">Add List</Button>
                                    <button onClick={() => setIsAddingList(false)} className="px-3 text-slate-400 hover:text-slate-600">✕</button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingList(true)}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-200/50 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-slate-200 hover:text-slate-700 transition-all"
                            >
                                <span className="text-xl font-lato">+</span> Add List
                            </button>
                        )}
                    </div>

                    <DragOverlay>
                        {activeCard ? (
                            <div className="bg-white rounded-xl p-4 shadow-2xl border-2 border-indigo-400 w-">
                                <p className="text-sm text-slate-900 font-bold">{activeCard.title}</p>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </main>

            {selectedCard && (
                <CardDetailsModal
                    card={selectedCard}
                    onClose={() => dispatch(clearSelectedCard())}
                />
            )}

        </div>
    );
}

