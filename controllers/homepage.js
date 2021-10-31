const router = require('express').Router();
const {User, Post, Comment} = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    // console.log(postData.user);
    const posts = postData.map((post) => {
        return post.get({plain:true});
    });
    console.log(posts);
    res.render('homepage', {posts});
});

router.get('/dashboard/:id', async (req, res) => {
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                required: true,
                where: {
                    id: req.session.userId
                }
            }
        ]
    });
    const posts = postData.map((post) => {
        return post.get({plain:true});
    });
    res.render('dashboard', {posts});
});

router.get('/login' , (req, res) => {
    if(req.session.loggedIn) {

    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;