const router = require('express').Router();
const {User, Post, Comment} = require('../models');

router.get('/login' , (req, res) => {
    if(req.session.loggedIn) {

    }else {
        res.render('login');
    }  
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;