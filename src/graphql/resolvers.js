export default {
    Query: {
        posts: (root, args, { models }) => models.Post.findAll(),
        post: (root, { id }, { models }) => models.Post.findById(id),
        users: (root, args, { models }) => models.User.findAll(),
        user: (root, { id }, { models }) => models.User.findById(id),
    },

    Mutation: {
        createUser: (root, args, { models }) => models.User.create(args),
        updateUser: (root, args, { models }) => models.User.update(args, { where: { id: args.id } }),
        deleteUser: (root, { id }, { models }) => models.User.destroy({ where: { id } }),

        createPost: (root, args, { models }) => models.Post.create(args),
        updatePost: (root, args, { models }) => models.Post.update(args, { where: { id: args.id } }),
        deletePost: (root, { id }, { models }) => models.Post.destroy({ where: { id } }),
    },

    User: {
        posts: (user, args, { models }) => models.Post.findAll({ where: { UserId: user.id } }),
    },

    Post: {
        author: (post, args, { models }) => models.User.findById(post.UserId),
    },
};