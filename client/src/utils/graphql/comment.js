import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
    mutation addComment($mangaId: ID!, $body: String!) {
        addComment(mangaId: $mangaId, body: $body) {
            id
            user {
                username
                avatar
            }
            body
            createdAt
        }
    }
`;

export const LIST_COMMENT_USER = gql`
    query listCommentsByUserId(
        $userId: ID!
        $page: Int!
        $limit: Int!
        $keyword: String
    ) {
        listCommentsByUserId(
            userId: $userId
            page: $page
            limit: $limit
            keyword: $keyword
        ) {
            commentCount
            comments {
                id
                manga {
                    code
                    name
                    coverImgSrc
                }
                body
                createdAt
            }
        }
    }
`;

export const LIST_COMMENT_MANGA = gql`
    query listCommentsByMangaId($mangaId: ID!) {
        listCommentsByMangaId(mangaId: $mangaId) {
            id
            user {
                username
                avatar
            }
            body
            createdAt
        }
    }
`;

export const FLAG_COMMENT = gql`
    mutation flagComment($commentId: ID!, $body: String) {
        flagComment(commentId: $commentId, body: $body)
    }
`;

export const LIST_FLAGGED_COMMENTS = gql`
    query listFlaggedComments($page: Int!, $limit: Int!, $keyword: String) {
        listFlaggedComments(page: $page, limit: $limit, keyword: $keyword) {
            commentCount
            comments {
                id
                manga {
                    code
                    name
                }
                user {
                    id
                    username
                }
                body
                createdAt
                flags {
                    username
                    body
                    createdAt
                }
            }
        }
    }
`;

export const UNFLAG_COMMENT = gql`
    mutation unflagComment($commentId: ID!) {
        unflagComment(commentId: $commentId)
    }
`;

export const DELETE_COMMENT = gql`
    mutation removeComment($commentId: ID!) {
        removeComment(commentId: $commentId)
    }
`;
