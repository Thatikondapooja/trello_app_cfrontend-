import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addActivity } from "../../activity/activitySlice";
import { restoreCardThunk } from "./cardThunks";

interface Props {
  onClose: () => void;
  //   onClick: () => void;
}

export default function ArchivedCardsPanel({ onClose }: Props) {
  const dispatch = useAppDispatch();

  const archivedCards = useAppSelector((state) =>
    state.card.cards.filter((card) => card.isArchived)
  );

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Archived Cards</h2>
        <button onClick={onClose}>✕</button>
      </div>

      {archivedCards.length === 0 && (
        <p className="text-gray-500 text-sm">No archived cards</p>
      )}

      {archivedCards.map((card) => (
        <div
          key={card.id}
          className="border rounded-lg p-3 mb-2 flex justify-between items-center"
        >
          <span className="text-sm">{card.title}</span>
          <button
            className="text-blue-600 text-xs"
            onClick={() => {
              dispatch(restoreCardThunk(card.id));
              dispatch(
                addActivity({
                  id: Date.now().toString(),
                  message: `Card "${card.title}" restored`,
                  timestamp: Date.now(),
                })
              );
            }}
          >
            Restore
          </button>

        </div>
      ))}
    </div>
  );
}
