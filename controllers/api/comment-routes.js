// creating a comment will require session to save the user id 
// post and delete routes
const router = require('express').Router();
const {Comment} = require('../../models');

router.post('/', (req, res) => {
    try{
        const newComment = await Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        res.status(200).json({message: "New comment added"});
    }catch(error){
        res.status(500).json(error);
    }
});

router.delete('/:id', (req, res) => {
    try{
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletedComment);
    }catch(error) {
        res.status(500).json(error);
    }
});

router.put('/:id', (req, res) => {
    try{
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedComment);
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;