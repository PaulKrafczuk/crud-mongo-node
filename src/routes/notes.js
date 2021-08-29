const router = require('express').Router();

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', (req, res) => {
    const { tittle, description } = req.body;
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
        res.send('okey');
    }

});

router.get('/notes', (req, res) => {
    res.send('Notes from database');
});

module.exports = router;