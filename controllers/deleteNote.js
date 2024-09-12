const mongoose = require('mongoose');
const Notes = require('../models/Notes');

// Function to check if an ObjectId is valid (not used in this case)
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId; // Use noteId from URL parameters

        // Validate the noteId format (UUID in this case)
        if (!noteId) {
            return res.status(400).json({ error: "Invalid note ID format" });
        }

        let note = await Notes.findOne({ noteId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        await Notes.findOneAndDelete({ noteId });
        res.json({ message: "Note has been deleted" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = deleteNote;
