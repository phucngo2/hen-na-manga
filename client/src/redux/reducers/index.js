// Libs
import { combineReducers } from "redux";

import darkModeReducer from "./isDarkMode";
import loggedReducer from "./isLogged";

// Combine reducers
const combinedReducers = combineReducers({
    isDarkMode: darkModeReducer,
    user: loggedReducer,
});

export default combinedReducers;
