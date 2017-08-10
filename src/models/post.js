export default (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Post.associate = function (models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Post.belongsTo(models.User);
        Post.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Post;
};