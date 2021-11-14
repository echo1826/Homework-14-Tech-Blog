const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./Comment');
class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    hooks: {
        beforeDestroy: async (post) => {
            await Comment.destroy({
                where: {
                    post_id: post.id
                }
            });
            return post;
        }
    },
    sequelize,
    timestamps: true,
    updatedAt: false,
    freezeTableName: true,
    modelName: 'post'
})

module.exports = Post;