const Contact = require("../models/Contact");


// get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// create contact
const createContact = async (req, res) => {
    try {
        const {email, number} = req.body;

        if(!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const contact = await Contact.create({
            email,
            number
        });

        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// update contact
const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// delete contact

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if(!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
};