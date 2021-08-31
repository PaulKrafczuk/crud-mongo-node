const router = require('express').Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
    console.log(req.body);

    const { tittle, description } = req.body;
    console.log(tittle, description);
    const errors = [];

    if (!tittle) { //validacion del titulo
        errors.push({ text: 'inserta un titulo' });
    }

    if (!description) { //validacion de la descripcion
        errors.push({ text: 'la descripcion no puede estar vacia' });
    }

    if (errors.length > 0) {
        res.render('notes/new-note', { errors, tittle, description });
    } else {
        const newNote = new Note({ tittle, description });
        await newNote.save();
        res.redirect('/notes');
    }

});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({ date: 'desc' }).lean();
    res.render('notes/all-notes.hbs', { notes });
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-notes.hbs', { note })
});

router.put('/notes/edit-notes/:id', async (req, res) => {
    const { tittle, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { tittle, description });
    res.redirect('/notes');
});
module.exports = router;