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
        include: [{
                model: Comment
            },
            {
                model: User,
                attributes: {
                    exclude: 'password'
                },
                // as: 'postUser'
            }
        ]
    });
    const post = await postData.get({
        plain: true
    });
    // for(let i=0; i<post.comments.length; i++) {

    // }
    // console.log(post.comments[0].user_id);
    // const userComment = await User.findOne({
    //     where: {
    //         id: post.comments[0].user_id
    //     }
    // });
    const commentUser = userComment.get({
        plain: true
    });
    const deleteBtnValue = post.comments[0].user_id == req.session.user_id;
    // console.log(post);
    // res.json(post);
    res.render('post', {
        post: post,
        commentUser: commentUser,
        deleteBtn: deleteBtnValue
    });
});

router.get('/postform', (req, res) => {
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