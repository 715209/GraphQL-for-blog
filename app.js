// Packages
import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import joinMonsterAdapt from "join-monster-graphql-tools-adapter";

// Files
import typeDefs from "./src/graphql/schema";
import resolvers from "./src/graphql/resolvers";
import models from "./src/models";
import joinMonsterMetaData from "./src/config/joinMonsterMetaData"

const app = express();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

joinMonsterAdapt(schema, joinMonsterMetaData);

app.use(
    "/graphiql",
    graphiqlExpress({
        endpointURL: "/graphql",
    })
);

// For CORS
app.use(
    "/graphql",
    (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    }
);

app.use(
    "/graphql",
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