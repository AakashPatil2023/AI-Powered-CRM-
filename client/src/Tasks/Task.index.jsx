import { useState, useEffect } from "react";
import AddTask from "./Task.AddTask";
import EditTask from "./Task.EditTask";

function formatDisplayDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString();
}

function TaskIndex() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editTaskData, setEditTaskData] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTasks(
          Array.isArray(data)
            ? data.map((task) => ({ ...task, id: task._id || task.id }))
            : [],
        );
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addNewTask = (newTask) => {
    const taskToAdd = {
      ...newTask,
      id: newTask._id || newTask.id,
    };

    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
    setShowAddTask(false);
  };

  const handleEditClick = (task) => {
    setEditTaskData(task);
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === (updatedTask.id || updatedTask._id)
          ? {
              ...task,
              ...updatedTask,
              id: updatedTask.id || updatedTask._id,
            }
          : task,
      ),
    );
    setEditTaskData(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between h-32 px-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onClose={() => setShowAddTask(false)}
        />
      )}
      {editTaskData && (
        <EditTask
          task={editTaskData}
          onEditTask={editTask}
          onClose={() => setEditTaskData(null)}
        />
      )}

      <table className="w-full mt-4 border-collapse border text-center border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Due Date
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{task.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {task.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatDisplayDate(task.dueDate)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button onClick={() => handleEditClick(task)} 
                  data-dialog-target="modal-xl"
                  className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskIndex;
