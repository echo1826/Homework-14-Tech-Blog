const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
    // console.log(postData.user);
    const posts = postData.map((post) => {
        return post.get({
            plain: true
        });
    });
    console.log(posts);
    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
    });
});

router.get('/dashboard', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User,
            required: true,
            where: {
                id: req.session.userId
            }
        }]
    });
    const posts = postData.map((post) => {
        return post.get({
            plain: true
        });
    });
    res.render('dashboard', {
        ...posts,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;