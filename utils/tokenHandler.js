const { AuthenticationError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, REFRESH_KEY } = require("../config");

exports.generateToken = (user) => {
    const userToken = user.isAdmin
        ? {
              id: user.id,
              username: user.username,
              isAdmin: user.isAdmin,
          }
        : {
              id: user.id,
              username: user.username,
          };

    return jwt.sign(userToken, SECRET_KEY, { expiresIn: "20m" });
};

exports.generateRefresh = (user) => {
    const userToken = user.isAdmin
        ? {
              id: user.id,
              username: user.username,
              isAdmin: user.isAdmin,
          }
        : {
              id: user.id,
              username: user.username,
          };

    return jwt.sign(userToken, REFRESH_KEY, { expiresIn: "2h" });
};

exports.verifyRefresh = (token) => {
    try {
        const user = jwt.verify(token, REFRESH_KEY);
        return user;
    } catch (err) {
        return null;
    }
};

exports.verifyToken = (context) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;

    if (!authHeader) {
        return null;
    }

    // Bearer [token]
    const token = authHeader.split("Bearer ")[1];

    if (!token) {
        return null;
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
    } catch (err) {
        return null;
    }
};

exports.verifyTokenIgnoreExpiration = (token) => {
    try {
        const user = jwt.verify(token, SECRET_KEY, {
            ignoreExpiration: true,
        });
        return user;
    } catch (err) {
        return null;
    }
};

exports.authenticate = (context) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;

    if (!authHeader) {
        throw new Error("Authorization header must be provided");
    }

    // Bearer [token]
    const token = authHeader.split("Bearer ")[1];

    if (!token) {
        throw new Error("Authentication token failed");
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
    } catch (err) {
        throw new AuthenticationError("Invalid/Expired token!");
    }
};
