import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { createBoard } from "./features/auth/board/boardThunks";

const CreateBoard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        // async function handleSubmit(e: React.FormEvent){// }
        e.preventDefault();

        if (!title.trim()) {
            setError("Board title is required");
            return;
        }

        try {
           const createboarddispatch= await dispatch(
                createBoard({ title, description })
            ).unwrap();
            console.log("createboarddispatch", createboarddispatch)

            navigate("/dashboard"); // ✅ go back after success
        } catch (err) {
            setError("Failed to create board");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow"
            >
                <h2 className="text-2xl font-bold mb-6">Create Board</h2>

                {error && (
                    <p className="text-sm text-red-500 mb-4">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                        Title
                    </label>
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project name"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-1">
                        Description
                    </label>
                    <textarea
                        className="w-full border rounded-lg px-3 py-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional description"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="px-4 py-2 rounded-lg border"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBoard;
