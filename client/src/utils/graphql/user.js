import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            avatar
            email
        }
    }
`;

export const UPDATE_USER_AVATAR = gql`
    mutation updateAvatar($userId: ID!, $avatar: Upload!) {
        updateAvatar(userId: $userId, avatar: $avatar)
    }
`;

export const UPDATE_USER_PROFILE = gql`
    mutation updateProfile($userId: ID!, $email: String!) {
        updateProfile(userId: $userId, email: $email)
    }
`;

export const UPDATE_USER_PASSWORD = gql`
    mutation updatePassword(
        $userId: ID!
        $oldPassword: String!
        $password: String!
    ) {
        updatePassword(
            userId: $userId
            oldPassword: $oldPassword
            password: $password
        )
    }
`;

export const PAGINATE_USER = gql`
    query paginateUser($page: Int!, $limit: Int!, $keyword: String) {
        paginateUser(page: $page, limit: $limit, keyword: $keyword) {
            userCount
            users {
                id
                username
                createdAt
            }
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($userId: ID!) {
        deleteUser(userId: $userId)
    }
`;

export const FORGOT_PASSWORD = gql`
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;

export const VERIFY_RESET_TOKEN = gql`
    query verifyResetToken($resetToken: String!) {
        verifyResetToken(resetToken: $resetToken)
    }
`;

export const RECOVER_PASSWORD = gql`
    mutation recoverPassword($resetToken: String!, $password: String!) {
        recoverPassword(resetToken: $resetToken, password: $password)
    }
`;
