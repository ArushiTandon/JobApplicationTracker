const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const Notes = require('../controller/notesController');

//Create a note
router.post('/createNote', jwtAuthMiddleware, Notes.createNote);

//Get all notes
router.get('/getNotes', jwtAuthMiddleware, Notes.getNotes);

//Update a note
router.put('/updateNote/:noteId', jwtAuthMiddleware, Notes.updateNote);

//Delete a note
router.delete('/deleteNote/:noteId', jwtAuthMiddleware, Notes.deleteNote);




module.exports = router;