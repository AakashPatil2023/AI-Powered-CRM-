import { useState } from "react";

function AddProject({ onAddProject, onClose }) {
    const [project, setProject] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleAddProject = async () => {
        if (!project.trim()) return;

        try {
            const response = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: project.trim(),
                    description,
                    dueDate
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            onAddProject(data);
            onClose();

            setProject("");
            setDescription("");
            setDueDate("");
        } catch (error) {
            console.error("Failed to add project", error);
        }
    };
  return (
   <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">

                <h3 className="text-xl font-semibold mb-5">
                    Add Project
                </h3>

                {/* Project Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Project Title
                    </label>

                    <input
                        type="text"
                        value={project}
                        placeholder="Enter project title"
                        onChange={(e) => setProject(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Due Date */}
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

                {/* Description */}
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

                {/* Buttons */}
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
                        onClick={handleAddProject}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Confirm
                    </button>

                </div>
            </div>
        </div>
  );
}

export default AddProject;
