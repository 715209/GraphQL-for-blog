export default `
    #A user
    type User {
        id: Int!
        username: String!
        firstName: String
        lastName: String
        posts: [Post] # the list of Posts by this author
        createdAt: String!
        updatedAt: String!
    }

    #A post
    type Post {
        id: Int!
        title: String!
        body: String!
        author: User!
    }

    # the schema allows the following queries:
    type Query {
        posts: [Post]
        post (id: Int!): Post
        users: [User]
        user (id: Int!): User
    }

    # the schema allows the following mutations:
    type Mutation {
        createUser (
            username: String!
            firstName: String
            lastName: String
        ): User!
       
        updateUser (
            id: Int!
            username: String
            firstName: String
            lastName: String
        ): Int!

        deleteUser (
            id: Int!
        ): Int!

        createPost (
            UserId: Int!
            title: String!
            body: String!
        ): Post!
       
        updatePost (
            id: Int!
            title: String!
            body: String
        ): Int!

        deletePost (
            id: Int!
        ): Int!
    }
`;