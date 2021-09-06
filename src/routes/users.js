const router = require('express').Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin.hbs');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup.hbs');
});

router.post('/users/signup', (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (!name) {
        errors.push({ text: 'please insert your name' });
    };

    if (!email) {
        errors.push({ text: 'please insert your email' });
    };

    if (password != confirm_password) {
        errors.push({ text: 'Password dot not match' });
    };

    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 6 characters' });
    };

    if (errors.length > 0) {
        res.render('users/signup.hbs', { errors, name, email, password, confirm_password });
    } else {
        res.send('ok');
    };

});


module.exports = router;