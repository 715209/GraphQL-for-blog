import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const app = express();

const typeDefs = `
    type Author {
        id: Int!
        firstName: String
        lastName: String
        posts: [Post] # the list of Posts by this author
    }

    type Post {
        id: Int!
        title: String
        author: Author
        votes: Int
    }

    # the schema allows the following query:
    type Query {
        posts: [Post]
        author(id: Int!): Author
    }
`;

// example data
const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const resolvers = {
    Query: {
        posts: (root, args, context) => posts,
        author: (root, args, context) => authors.find(value => value.id === args.id)
    },

    Author: {
        posts: (author) => posts.filter(item => (item.authorId === author.id) ? true : false),
    },

    Post: {
        author: (post) => authors.find(value => value.id === post.authorId),
    },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
    })
);

app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
        schema
    })
);

app.listen(3000);