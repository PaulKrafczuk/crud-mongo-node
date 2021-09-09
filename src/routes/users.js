const router = require('express').Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin.hbs');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup.hbs');
});

router.post('/users/signup', async function(req, res) {
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
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'the email is alreay in use');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('succes_msg', 'you are registered');
            res.redirect('/users/signin');
        }
    };

});


module.exports = router;