const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const NotesSchema = new mongoose.Schema({
    noteId: {
        type: String,
        default: uuidv4, 
        unique: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notes', NotesSchema);
