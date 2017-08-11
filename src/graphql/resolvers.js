import joinMonster from "join-monster"

export default {
    Query: {
        // User
        users: (root, args, { models }, info) => joinMonster(info, args, sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }), { dialect: "mysql" }),
        user: (root, { id }, { models }, info) => joinMonster(info, id, sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }), { dialect: "mysql" }),

        // Post
        posts: (root, args, { models }, info) => joinMonster(info, args, sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }), { dialect: "mysql" }),
        post: (root, { id }, { models }, info) => joinMonster(info, id, sql => models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT }), { dialect: "mysql" }),
    },

    Mutation: {
        // User
        createUser: (root, args, { models }) => models.User.create(args),
        updateUser: (root, args, { models }) => models.User.update(args, { where: { id: args.id } }),
        deleteUser: (root, { id }, { models }) => models.User.destroy({ where: { id } }),

        // Post
        createPost: (root, args, { models }) => models.Post.create(args),
        updatePost: (root, args, { models }) => models.Post.update(args, { where: { id: args.id } }),
        deletePost: (root, { id }, { models }) => models.Post.destroy({ where: { id } }),
    },

    // User: {
    //     posts: (user, args, { models }) => models.Post.findAll({ where: { UserId: user.id } }),
    // },

    // Post: {
    //     author: (post, args, { models }) => models.User.findById(post.UserId),
    // },
};