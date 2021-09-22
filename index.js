// Libs
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { graphqlUploadExpress } = require("graphql-upload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("events").EventEmitter.defaultMaxListeners = 1000;

const { MONGODB, CLIENT_URL } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { COOKIE_KEY } = require("./config");

async function startApolloServer(typeDefs, resolvers) {
    // Create server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res }),
    });
    await server.start();

    // Intergrated with Express to handle upload
    const app = express();
    var corsOptions = {
        origin: CLIENT_URL,
        credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(cookieParser(COOKIE_KEY));
    app.use(graphqlUploadExpress({ maxFileSize: 5242880, maxFiles: 1000 }));

    server.applyMiddleware({ app, cors: false });

    // Config static path
    app.use("/g", express.static("static/mangas"));
    app.use("/avatar", express.static("static/users"));

    // Start server
    const port = process.env.PORT || 4000;
    app.listen({ port }, () =>
        console.log(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
        )
    );
}

// Connect DB
mongoose
    .connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected!");
    })
    .catch((err) => console.log(err));

startApolloServer(typeDefs, resolvers);
