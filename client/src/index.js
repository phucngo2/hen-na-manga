// Libs
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ApolloProvider from "./ApolloProvider";

import store from "./redux/store";
import "./index.css";

ReactDOM.render(
    <Provider store={store}>{ApolloProvider}</Provider>,
    document.getElementById("root")
);
