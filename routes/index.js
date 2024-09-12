const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')

const login = require('../controllers/login');
const fetchnotes = require('../controllers/fetchNotes');
const signUp = require('../controllers/signUp');
const userDetail = require('../controllers/userDetail');
const updatenote = require('../controllers/updateNote');
const deletenote = require("../controllers/deleteNote");

router.post('/login',login)
router.post('/signup',signUp)
router.get('/fetchnotes', fetchnotes);
router.post('/userdetail',fetchuser, userDetail);
router.put('/updatenote/:noteId', updatenote)
router.delete('/deletenote/:noteId',deletenote)

module.exports = router;