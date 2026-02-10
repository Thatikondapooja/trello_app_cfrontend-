import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    PointerSensor,
    useSensors,
    useSensor,
    closestCorners
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addActivity } from "../../activity/activitySlice";
import InputComponent from "../../../components/comman/inputComponent";
import Button from "../../../components/comman/Button";
import Tooltip from "../../../components/comman/Tooltip";
import ListColumn from "../../../component/kanban/ListCloumns";
import ActivityDetails from "../../../component/activity/ActivityDetails";
import { createList, fetchLists } from "../list/listThunks";
import { createCard, fetchCardById, fetchCardsByList, moveCardThunk } from "../card/cardThunks";
import { clearSelectedCard, reorderCards } from "../card/cardSlice";
import { reorderLists } from "../list/listSlice";
import CardDetailsModal from "../card/CardDetailsModel";
import { ArchiveRestore, ChevronLeft } from "lucide-react";
import UserDropdown from "./userDropDown";
import ArchivedCardsPanel from "../card/ArchivedCardsPanel";

export default function BoardView() {
    const dispatch = useAppDispatch();
    const [listTitle, setListTitle] = useState("");
    const [cardTitles, setCardTitles] = useState<Record<string, string>>({});
    const [isAddingList, setIsAddingList] = useState(false);
    const [activeCard, setActiveCard] = useState<{ id: number; title: string } | null>(null);
    const [activeList, setActiveList] = useState<{ id: number; title: string } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showArchived, setShowArchived] = useState(false);

    const { boardId } = useParams<{ boardId: string }>();
    const selectedBoardId = boardId ? Number(boardId) : null;

    const lists = useAppSelector((state) =>
        state.list.lists.filter(
            (list) => list.boardId === Number(selectedBoardId)
        )
    );

    const cards = useAppSelector((state) => state.card.cards);
    const selectedCard = useAppSelector(state => state.card.selectedCard);
    const user = useAppSelector(state => state.auth.user);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

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

    const handleAddList = () => {
        if (!listTitle || !selectedBoardId) return;
        dispatch(
            createList({
                title: listTitle,
                boardId: Number(selectedBoardId),
            })
        );
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
        dispatch(addActivity({ id: Date.now().toString(), message: `Card "${title}" added`, timestamp: Date.now() }));
        setCardTitles((prev) => ({ ...prev, [listId]: "" }));
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeData = active.data.current;

        if (activeData?.type === "LIST") {
            const list = lists.find((l) => l.id === active.id);
            if (list) setActiveList(list);
        } else {
            const card = cards.find((c) => c.id === Number(active.id));
            if (card) setActiveCard(card);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveCard(null);
        setActiveList(null);

        if (!over) return;

        // 🔄 REORDER LISTS
        if (active.data.current?.type === "LIST") {
            if (active.id !== over.id) {
                dispatch(reorderLists({
                    activeId: Number(active.id),
                    overId: Number(over.id)
                }));
            }
            return;
        }

        // 🔄 HANDLE CARDS (REORDER OR MOVE)
        const activeCard = cards.find((c) => c.id === active.id);
        if (!activeCard) return;

        const fromListId = activeCard.listId;
        const toListId =
            over.data.current?.listId ??
            cards.find((c) => c.id === Number(over.id))?.listId;

        if (!toListId) return;

        if (fromListId === toListId) {
            dispatch(reorderCards({
                listId: fromListId,
                activeId: Number(active.id),
                overId: Number(over.id),
            }));
        } else {
            dispatch(moveCardThunk({
                cardId: Number(active.id),
                toListId,
            }));
            dispatch(addActivity({
                id: Date.now().toString(),
                message: "Card moved",
                timestamp: Date.now(),
            }));
        }
    };

    const handleCardClick = (cardId: number) => {
        dispatch(fetchCardById(cardId));
    };

    function handleGoBack() {
        window.history.back();
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col h-screen overflow-hidden">
            <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between shrink-0 sticky top-0 z-50">
                <div className="flex items-center gap-2 md:gap-6">
                    <Tooltip content="Go back">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center justify-center p-2 rounded-full bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition shrink-0">
                            <ChevronLeft size={20} className="md:w-6 md:h-6" />
                        </button>
                    </Tooltip>
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden sm:flex w-10 h-10 bg-indigo-50 rounded-lg items-center justify-center border border-indigo-100 shrink-0">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-sm md:text-xl font-bold text-slate-900 leading-none truncate">Project Workspace</h1>
                            <p className="text-[10px] md:text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold truncate">{lists.length} Columns</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <Tooltip content="Activity Details"><ActivityDetails /></Tooltip>
                    <Tooltip content="Archived Cards">
                        <button
                            onClick={() => setShowArchived(true)}
                            className="flex items-center justify-center p-2 md:px-3 md:py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition shrink-0"
                        >
                            <ArchiveRestore size={18} className="md:mr-1" />
                            <span className="hidden md:inline text-sm">Archived cards</span>
                        </button>
                    </Tooltip>
                    {showArchived && (
                        <ArchivedCardsPanel onClose={() => setShowArchived(false)} />
                    )}
                    {user && (
                        <div className="relative shrink-0">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(true);
                                }}
                                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm cursor-pointer hover:bg-indigo-100 transition-colors"
                            >
                                <span className="text-indigo-600 font-bold text-xs md:text-sm">
                                    {(user.FullName || user.email || 'U')[0].toUpperCase()}
                                </span>
                            </div>
                            {isOpen && <UserDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />}
                        </div>
                    )}
                </div>
            </header>

            <main className="p-4 md:p-8 flex flex-col md:flex-row md:gap-3 overflow-x-auto gap-6 items-start custom-scrollbar h-full">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={lists.map(l => l.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        {lists.map((list) => (
                            <ListColumn
                                key={list.id}
                                listId={list.id}
                                title={list.title}
                                cards={cards.filter((card) => card.listId === list.id && !card.isArchived)}
                                cardTitles={cardTitles}
                                setCardTitles={setCardTitles}
                                onAddCard={handleAddCard}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </SortableContext>

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
                                    <Button onClick={handleAddList} className=" px-4 py-2 text-sm font-lato text-white bg-indigo-500 hover:bg-indigo-700 py-2 rounded-xl transition-all">Add List</Button>
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
                            <div className="bg-white rounded-xl p-4 shadow-2xl border-2 border-indigo-400 w-72">
                                <p className="text-sm text-slate-900 font-bold">{activeCard.title}</p>
                            </div>
                        ) : activeList ? (
                            <div className="w-72 bg-indigo-50 rounded-xl p-3 shadow-2xl border-2 border-indigo-400 opacity-90">
                                <h2 className="font-semibold text-sm mb-3 text-gray-800">
                                    {activeList.title}
                                </h2>
                                <div className="flex flex-col gap-2">
                                    {cards.filter(c => c.listId === activeList.id).slice(0, 3).map(c => (
                                        <div key={c.id} className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 h-8"></div>
                                    ))}
                                </div>
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
