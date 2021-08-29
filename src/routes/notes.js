const router = require('express').Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', (req, res) => {
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
        console.log(newNote);
        res.send('okey');
    }

});

router.get('/notes', (req, res) => {
    res.send('Notes from database');
});

module.exports = router;