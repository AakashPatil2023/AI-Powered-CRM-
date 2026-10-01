const Project = require("../models/Project");

// get all projects

const getProjects = async (req, res) => {
    try {
        const project = await Project.find();

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

// create project

const createProject = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const project = await Project.create({
            title: title.trim(),
            description,
            dueDate
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// update project

const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// delete project

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};