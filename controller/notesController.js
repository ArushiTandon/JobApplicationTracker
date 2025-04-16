const { sequelize } = require('../util/db');
const Notes = require('../model/notes');


exports.createNote = async (req, res) => {
    
    const userId = req.user.id;
    const { note } = req.body;

    try {

        const newNote = await sequelize.transaction(async (t) => {
            return await Notes.create({ note, userId }, { transaction: t });
        });

        res.status(201).json({ message: 'Note created successfully', newNote });
        
    } catch (error) {
        console.error('ERROR CREATING NOTE:', error);
        res.status(400).json({ error: 'Error creating note' }); 
    }
}

exports.getNotes = async (req, res) => {

    try {

        const notes = await Notes.findAll({ where: { userId: req.user.id } });
        res.status(200).json(notes);

    } catch (error) {
        console.error('ERROR GETTING NOTES:', error);
        res.status(400).json({ error: 'Error getting notes' });
    }
}

exports.updateNote = async (req, res) => {

    const noteId = req.params.noteId;
    const updateNote = req.body;

    try {

        const updatedNote = await Notes.findOne({ where: {id: noteId}});
        await updateNote.update(updateNote);

        res.status(200).json({ message: 'Note updated successfully', updatedNote });
        
    } catch (error) {
        console.error('ERROR UPDATING NOTES:', error);
        res.status(400).json({ error: 'Error updating notes' });  
    }
}

exports.deleteNote = async (req, res) => {

    const noteId = req.params.noteId;

    try {

        const note = await Notes.destroy({ where: {id: noteId}});
        res.status(200).json({ message: 'Note deleted successfully', note });
        
    } catch (error) {
        console.error('ERROR DELETING NOTES:', error);
        res.status(400).json({ error: 'Error deleting notes' });  
    }
}