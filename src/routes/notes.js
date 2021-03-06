const router = require('express').Router();

const Note = require('../models/Note');

const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
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
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Nota agregada satisfactoriamente');
        res.redirect('/notes');
    }

});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' }).lean();
    res.render('notes/all-notes.hbs', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-notes.hbs', { note })
});

router.put('/notes/edit-notes/:id', isAuthenticated, async (req, res) => {
    const { tittle, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { tittle, description });
    req.flash('success_msg', 'Nota editada satisfactoriamente');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada satisfactoriamente');
    res.redirect('/notes');
});

module.exports = router;