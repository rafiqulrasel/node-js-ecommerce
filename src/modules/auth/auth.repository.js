import User from "./auth.model.js";

export const createUser = async (payload) => {
    return User.create(payload);
};

export const findUserByEmail = async (email, withPassword = false) => {
    const query = User.findOne({ email });

    if (withPassword) {
        query.select("+password");
    }

    return query;
};

export const findUserById = async (id) => {
    return User.findById(id).select("-password");
};