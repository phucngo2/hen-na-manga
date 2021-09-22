import React from "react";
import App from "./App";
import {
    InMemoryCache,
    ApolloProvider,
    ApolloClient,
    fromPromise,
    ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { REFRESH } from "./utils/graphql/auth";

// Upload Link
const link = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});

// Authentication Link
const authLink = setContext(async (_, { headers }) => {
    var token = localStorage.getItem("accessToken");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const getNewToken = () => {
    return client.mutate({ mutation: REFRESH }).then((response) => {
        // extract your accessToken from your response data and return it
        const token = response.data.refresh.token;
        return token;
    });
};

// Error Link
const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                switch (err.extensions.code) {
                    case "UNAUTHENTICATED":
                        return fromPromise(
                            getNewToken().catch((error) => {
                                // Handle token refresh errors e.g clear stored tokens, redirect to login
                                localStorage.removeItem("accessToken");
                                window.location.assign("/");
                                return;
                            })
                        )
                            .filter((value) => Boolean(value))
                            .flatMap((accessToken) => {
                                localStorage.setItem(
                                    "accessToken",
                                    accessToken
                                );

                                const oldHeaders =
                                    operation.getContext().headers;
                                // modify the operation context with a new token
                                operation.setContext({
                                    headers: {
                                        ...oldHeaders,
                                        authorization: `Bearer ${accessToken}`,
                                    },
                                });

                                // Retry the request, returning the new observable
                                return forward(operation);
                            });
                    default: {
                        return;
                    }
                }
            }
        }
    }
);

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, link]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
