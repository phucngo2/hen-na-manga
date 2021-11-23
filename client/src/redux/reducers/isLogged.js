import { LOGIN, LOGOUT } from "../constants";
import jwtDecode from "jwt-decode";

const initialUser = getUser();

// Default: not logged in
const loggedReducer = (state = initialUser, action) => {
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

function getUser() {
    let data = localStorage.getItem("accessToken");

    // Don't have token
    if (!data) return null;

    // Decode token to check expiration time
    let decodedToken = jwtDecode(data);
    let user = JSON.parse(localStorage.getItem("us"));

    // Expired token
    if (decodedToken.exp * 1000 < Date.now() && !user.isAdmin) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("us");
        return null;
    }

    // Get user data from local storage
    return user;
}
