const {Post, User, Comment} = require('../models');

const postData = 
    {
        title: 'test',
        content: 'testing',
        user_id: 1
    }


const userData = 
    {
        username: 'tester',
        password: 'testpass'
    }
const commentData = {
    content: 'comment test',
    post_id: 1
}

const seedPost = async () => {
    await User.create(userData);
    await Post.create(postData);
    await Comment.create(commentData);
}

module.exports = seedPost;