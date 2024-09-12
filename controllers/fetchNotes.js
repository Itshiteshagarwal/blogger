const express = require('express');
const Notes = require('../models/Notes');

const fetchNotes = async(req,res)=>{
    try {
        const notes = await Notes.find();
        res.json(notes);   
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error: error
        })
    }

}

module.exports = fetchNotes;