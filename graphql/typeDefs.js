const { gql } = require("apollo-server-express");

module.exports = gql`
    scalar Upload

    type User {
        id: ID
        username: String
        email: String
        avatar: String
        isAdmin: Boolean
        favorites: [String]
        token: String
        createdAt: String
    }

    type Manga {
        id: ID!
        code: Int!
        name: String!
        alias: String
        language: String!
        artist: String!
        group: String
        tags: [String]
        category: String
        parodies: [String]
        characters: [String]
        uploadedAt: String!
        pages: [Page!]!
        viewCount: Float
        favoriteCount: Float
        coverImgSrc: String
        isFavorited: Boolean
    }

    type Page {
        pageNumber: Int!
        pageSrc: String!
    }

    type Comment {
        id: ID!
        manga: Manga
        user: User
        body: String
        createdAt: String
        flags: [Flag]
    }

    type Flag {
        username: String!
        body: String!
        createdAt: String!
    }

    type MangaPaginate {
        mangaCount: Int!
        mangas: [Manga]
    }

    type UserPaginate {
        userCount: Int!
        users: [User]
    }

    type CommentPaginate {
        commentCount: Int!
        comments: [Comment]
    }

    input MangaInput {
        id: ID
        name: String!
        alias: String
        language: String!
        artist: String!
        group: String
        tags: [String]
        category: String
        parodies: [String]
        characters: [String]
        files: [Upload]
    }

    input SearchInput {
        page: Int!
        limit: Int!
        keyword: String
        tags: [String]
        category: String
        language: String
        filter: String
    }

    type Query {
        listMangas: [Manga]
        listPopularMangas: [Manga]
        paginateManga(page: Int!, limit: Int!, keyword: String): MangaPaginate
        getManga(mangaId: ID!): Manga
        getMangaDetail(mangaCode: Int!): Manga
        searchManga(searchInput: SearchInput): MangaPaginate
        listSimilarMangas(
            mangaId: ID!
            artist: String
            tags: [String]
            category: String
        ): [Manga]
        getRandomMangaId: String!

        getUser(userId: ID!): User
        paginateUser(page: Int!, limit: Int!, keyword: String): UserPaginate

        verifyResetToken(resetToken: String!): String

        paginateFavorite(
            userId: ID!
            page: Int!
            limit: Int!
            keyword: String
        ): MangaPaginate

        listCommentsByMangaId(mangaId: ID!): [Comment]
        listCommentsByUserId(
            userId: ID!
            page: Int
            limit: Int
            keyword: String
        ): CommentPaginate
        listFlaggedComments(
            page: Int
            limit: Int
            keyword: String
        ): CommentPaginate
    }

    type Mutation {
        register(username: String!, password: String!): String!
        login(username: String!, password: String!): User!
        firstLogin: User!
        logout(userId: ID!): String!
        refresh: User!

        insertManga(mangaInput: MangaInput): Manga!
        updateManga(mangaInput: MangaInput): Manga!
        deleteManga(mangaId: ID!): String!

        updateAvatar(userId: ID!, avatar: Upload): String!
        updateProfile(userId: ID!, email: String): String!
        updatePassword(
            userId: ID!
            oldPassword: String!
            password: String!
        ): String!
        deleteUser(userId: ID!): String!

        forgotPassword(email: String!): String!
        recoverPassword(resetToken: String!, password: String!): String!

        favoriteManga(userId: ID!, mangaId: ID!): String!

        addComment(mangaId: ID!, body: String!): Comment!
        removeComment(commentId: ID!): String!
        flagComment(commentId: ID!, body: String): String!
        unflagComment(commentId: ID!): String!
    }
`;
