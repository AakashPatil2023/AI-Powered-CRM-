import { useEffect, useState } from "react";
import AddProject from "./Project.AddProject";
import EditProject from './Project.EditProject';

function formatDisplayDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
}

function ProjectIndex() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [editProjectData, setEditProjectData] = useState(false);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProjects(
          Array.isArray(data)
            ? data.map((project) => ({
                ...project,
                id: project._id || project.id,
              }))
            : [],
        );
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    fetchProjects();
  }, []);

  const addNewProject = (newProject) => {
    const projectToAdd = {
      ...newProject,
      id: newProject._id || newProject.id,
    };

    setProjects((prevProject) => [...prevProject, projectToAdd]);
    setShowAddProject(false);
  };

  const handleEditClick = (project) => {
    setEditProjectData(project);
  };

  const editProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === (updatedProject.id || updatedProject._id)
          ? {
              ...project,
              ...updatedProject,
              id: updatedProject.id || updatedProject._id,
            }
          : project,
      ),
    );
    setEditProjectData(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between h-32 px-4">
        <h2 className="text-2xl font-bold">Projects List</h2>
        <button
          onClick={() => setShowAddProject(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </div>
      {showAddProject && (
        <AddProject
          onAddProject={addNewProject}
          onClose={() => setShowAddProject(false)}
        />
      )}

      {editProjectData && (
        <EditProject
          project={editProjectData}
          onEditProject={editProject}
          onClose={() => setEditProjectData(null)}
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
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {project.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {project.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatDisplayDate(project.dueDate)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(project)}
                  data-dialog-target="modal-xl"
                  className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                  type="button"
                >
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

export default ProjectIndex;
