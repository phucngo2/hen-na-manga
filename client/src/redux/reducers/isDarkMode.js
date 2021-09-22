import { TOGGLE } from "../constants";

// Default: dảk mode
const darkModeReducer = (state = true, action) => {
    switch (action.type) {
        case TOGGLE:
            return !state;
        default:
            return state;
    }
};

export default darkModeReducer;
