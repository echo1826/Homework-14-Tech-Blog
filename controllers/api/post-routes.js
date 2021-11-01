const router = require('express').Router();
const {Post} = require('../../models');
// creating a post will require an id parameter gotten from session variable
// post and delete routes

router.post('/', (req, res) => {
    try{
        const newPost = Post.create({
            title: req.body.postTitle,
            content: req.body.postText,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
        // res.status(200).json(newPost);
    }
    catch(error) {
        res.status(500).json(error);
    }

});

router.delete('/:id', (req, res) => {
    try{
        const deletedPost = Post.destroy({
            where: {
                id: req.params.id
            }
        })
    }catch(error) {
        res.status(500).json(error);
    }
});

module.exports=router;