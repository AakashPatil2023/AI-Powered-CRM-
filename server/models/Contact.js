const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },

        number: {
            type: String,
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);