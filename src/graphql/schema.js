export default `
    # An user
    type User {
        # The user id
        id: Int!
        # The username of the user
        username: String!
        # The first name of the user
        firstName: String
        # The last name of the user
        lastName: String
        # The list of posts by this user
        posts: [Post]
        # The date the user was created
        createdAt: String!
        # The date the user was updated
        updatedAt: String!
    }

    # A post
    type Post {
        # The post id
        id: Int!
        # The title of the post
        title: String!
        # The content of the post
        body: String!
        # The author of the post
        author: User!
        # The date the post was created
        createdAt: String!
        # The date the post was updated
        updatedAt: String!
    }

    # the schema allows the following queries:
    type Query {
        # Get all posts
        posts: [Post]
        # Get post by id
        post (id: Int!): Post
        # Get all users
        users: [User]
        # Get user by id
        user (id: Int!): User
    }

    # the schema allows the following mutations:
    type Mutation {
        # Create an user
        createUser (
            # The username of the user
            username: String!
            # The first name of the user
            firstName: String
            # The last name of the user
            lastName: String
        ): User!

        # Create an user
        updateUser (
            # The user id
            id: Int!
             # The username of the user
            username: String!
            # The first name of the user
            firstName: String
            # The last name of the user
            lastName: String
        ): Int!

        deleteUser (
            # The user id
            id: Int!
        ): Int!

        createPost (
            # The author who created the post
            UserId: Int!
            # The title of the post
            title: String!
            # The content of the post
            body: String!
        ): Post!
       
        updatePost (
            # The post id
            id: Int!
            # The title of the post
            title: String!
            # The content of the post
            body: String!
        ): Int!

        deletePost (
            # The post id
            id: Int!
        ): Int!
    }
`;