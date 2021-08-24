const router = require('express').Router();

router.get('/users/signin', (req, res) => {
    res.send('please sign in');
});

router.get('/users/signup', (req, res) => {
    res.send('formulario de ingreso');
});


module.exports = router;