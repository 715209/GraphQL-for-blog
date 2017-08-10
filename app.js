import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './src/graphql/schema';
import resolvers from './src/graphql/resolvers';
import models from './src/models';

const app = express();

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
        schema,
        context: {
            models
        }
    })
);

models.sequelize.sync({ force: false })
    .then(() => {
        app.listen(3000, () => console.log("App running on port :3000"));
    });