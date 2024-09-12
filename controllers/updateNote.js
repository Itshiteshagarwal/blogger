const mongoose = require('mongoose');
const Notes = require('../models/Notes');

// Function to check if an ObjectId is valid (not used in this case)
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const updateNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const noteId = req.params.noteId; // Use noteId from URL parameters

        // Validate the noteId format (UUID in this case)
        if (!noteId) {
            return res.status(400).json({ error: "Invalid note ID format" });
        }

        let note = await Notes.findOne({ noteId });
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Update note fields
        const updatedNoteData = {};
        if (title) { updatedNoteData.title = title; }
        if (description) { updatedNoteData.description = description; }
        if (tag) { updatedNoteData.tag = tag; }

        note = await Notes.findOneAndUpdate({ noteId }, { $set: updatedNoteData }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = updateNote;
