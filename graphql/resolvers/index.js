const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");

const mangaResolvers = require("./manga");
const authResolvers = require("./auth");
const userResolvers = require("./user");
const emailResolvers = require("./email");
const favoriteResolvers = require("./favorite");
const commentResolvers = require("./comment");

module.exports = {
    Upload: GraphQLUpload,

    Manga: {
        coverImgSrc: (parent) => parent.pages[0].pageSrc || "",
    },

    Query: {
        ...mangaResolvers.Query,
        ...userResolvers.Query,
        ...emailResolvers.Query,
        ...favoriteResolvers.Query,
        ...commentResolvers.Query,
    },

    Mutation: {
        ...mangaResolvers.Mutation,
        ...authResolvers.Mutation,
        ...userResolvers.Mutation,
        ...emailResolvers.Mutation,
        ...favoriteResolvers.Mutation,
        ...commentResolvers.Mutation,
    },
};
