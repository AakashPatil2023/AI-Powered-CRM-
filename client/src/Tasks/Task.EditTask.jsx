import { useState } from "react";

function formatDateForInput(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function EditTask({ task, onEditTask, onClose }) {
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [dueDate, setDueDate] = useState(formatDateForInput(task.dueDate));

    const handleEditTask = async () => {
        if (!title.trim()) return;

        try {
            const taskId = task.id || task._id;
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    dueDate: dueDate
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const updatedTask = {
                ...data,
                id: data._id || data.id,
            };

            onEditTask(updatedTask);
            onClose();
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-5">
                    Edit Task
                </h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Task
                    </label>

                    <input
                        type="text"
                        value={title}
                        placeholder="Enter task"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Due Date
                    </label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>

                    <textarea
                        value={description}
                        placeholder="Enter description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        rows={4}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleEditTask}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTask;
