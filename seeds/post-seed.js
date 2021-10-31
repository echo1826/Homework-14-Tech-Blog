const {
    Post,
    User,
    Comment
} = require('../models');

const postData = [{
    title: 'test',
    content: 'testing',
    user_id: 1
}, 
{
    title: 'testing',
    content: 'test',
    user_id: 2
},
{
    title: 'tester',
    content: 'tester',
    user_id: 1
}
]


const userData = [{
    username: 'tester',
    password: 'testpass'
},
{
    username: 'test',
    password: 'testpass'
}
]
const commentData = {
    content: 'comment test',
    post_id: 1
}

const seedPost = async () => {
    await User.bulkCreate(userData);
    await Post.bulkCreate(postData);
    await Comment.create(commentData);
}

module.exports = seedPost;