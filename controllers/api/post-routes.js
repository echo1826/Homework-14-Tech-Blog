const router = require('express').Router();
const {Post} = require('../../models');
// creating a post will require an id parameter gotten from session variable
// post and delete routes

router.post('/', (req, res) => {
    try{
        const newPost = Post.create(req.body, {
            user_id: req.session.user_id
        });
        res.redirect('/dashboard')
        // res.status(200).json(newPost);
    }
    catch(error) {
        res.status(500).json(error);
    }

});

// router.delete('/', (req, res) => {
//     try{
//         const deletedPost = Post.destroy()
//     }
// });

module.exports=router;