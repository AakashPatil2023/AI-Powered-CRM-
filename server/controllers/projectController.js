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
        const [title, description, dueDate] = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const project = await Project.create({
            title,
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