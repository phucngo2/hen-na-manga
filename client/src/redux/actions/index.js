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

    localStorage.setItem("us", JSON.stringify(user));

    return {
        type: LOGIN,
        payload: user,
    };
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("us");

    return {
        type: LOGOUT,
    };
};
