const router = require('express').Router();
const {Post} = require('../../models');
// creating a post will require an id parameter gotten from session variable
// post and delete routes

router.post('/', async (req, res) => {
    try{
        const newPost = await Post.create({
            title: req.body.postTitle,
            content: req.body.postText,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    }
    catch(error) {
        res.status(500).json(error);
    }

});

router.delete('/:id', async (req, res) => {
    try{
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deletedPost);
    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try{
        console.log('post put route');
        console.log(req.body);
        const updatedPost = await Post.update({title: req.body.title, content: req.body.content}, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedPost);
    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports=router;