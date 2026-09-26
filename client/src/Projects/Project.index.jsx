import { useState } from "react";
import AddProject from "./Project.AddProject";

function ProjectIndex() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [editProjectData, setEditProjectData] = useState(false);

  const [projects, setProjects] = useState([]);

  const addNewProject = (newProject) => {
    const projectTOAdd = {
      ...newProject,
      id: newProject._id || newProject.id,
    };

    setProjects((prevProject) => [...prevProject, projectTOAdd]);
    setShowAddProject(false);
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
    </div>
  );
}

export default ProjectIndex;
