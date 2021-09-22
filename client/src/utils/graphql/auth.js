import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation register($username: String!, $password: String!) {
        register(username: $username, password: $password)
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            username
            token
            isAdmin
            avatar
        }
    }
`;

export const REFRESH = gql`
    mutation {
        refresh {
            token
        }
    }
`;

export const FIRST_LOGIN = gql`
    mutation {
        firstLogin {
            id
            username
            token
            isAdmin
            avatar
        }
    }
`;

export const LOGOUT = gql`
    mutation logout($userId: ID!) {
        logout(userId: $userId)
    }
`;
