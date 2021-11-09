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
    console.log(req.session.loggedIn);
    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
        userId: req.session.userId
    });
});

router.get('/dashboard', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User,
            required: true,
            where: {
                id: req.session.user_id
            }
        }]
    });
    const posts = postData.map((post) => {
        return post.get({
            plain: true
        });
    });
    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
    });
});

router.get('/post/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: 'password'
                },

            }
        ]
    });
    const post = await postData.get({
        plain: true
    });

    const commentData = await Comment.findAll({
        where: {
            post_id: post.id
        },
        include: [{
            model: User,
            attributes: {
                exclude: 'password'
            }
        }]
    });
    const comments = commentData.map((comment) => comment.get({ plain: true}));
    console.log("COMMENTS======================================",comments);
    for(let i = 0; i<comments.length; i++) {
        console.log(comments[i].user);
        if(comments[i].user.id == req.session.user_id) {
            comments[i].delete = true;
        }else {
            comments[i].delete = false;
        }
    }
    
    // console.log(comments);

    res.render('post', {
        post,
        comments,
        logged_in: req.session.logged_in
    });
});

router.get('/postform', withAuth, (req, res) => {
    res.render('postform', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
    });
});

router.get('/login', (req, res) => {
    console.log(req.session.logged_in);
    if (req.session.logged_in) {
        res.redirect('/home');
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;