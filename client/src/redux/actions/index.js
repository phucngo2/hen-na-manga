import { TOGGLE, LOGIN, LOGOUT } from "../constants";

export const toggleDarkMode = () => {
    return {
        type: TOGGLE,
    };
};

export const login = (data) => {
    localStorage.setItem("accessToken", data.token);
    const avatar = data.avatar || "/avatar.jpg";

    const user = data.isAdmin
        ? {
              id: data.id,
              username: data.username,
              isAdmin: data.isAdmin,
              avatar,
          }
        : {
              id: data.id,
              username: data.username,
              avatar,
          };

    return {
        type: LOGIN,
        payload: user,
    };
};

export const logout = () => {
    localStorage.removeItem("accessToken");

    return {
        type: LOGOUT,
    };
};
