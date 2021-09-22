import { LOGIN, LOGOUT } from "../constants";

// Default: not logged in
const loggedReducer = (state = null, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return null;
        default:
            return state;
    }
};

export default loggedReducer;
