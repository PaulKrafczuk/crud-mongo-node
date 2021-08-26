const router = require('express').Router();

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note.hbs');
});

router.get('/notes', (req, res) => {
    res.send('Notes from database');
})

module.exports = router;