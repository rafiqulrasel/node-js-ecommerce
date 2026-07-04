import bcrypt from "bcryptjs";
import ApiError from "../../utils/apiError.js";
import { generateToken } from "../../utils/jwt.js";
import {
    createUser,
    findUserByEmail,
    findUserById,
} from "./auth.repository.js";

export const registerService = async (payload) => {
    const existingUser = await findUserByEmail(payload.email);

    if (existingUser) {
        throw new ApiError(409, "validation:email_exists");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await createUser({
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
    });

    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    return { user, token };
};

export const loginService = async (payload) => {
    const user = await findUserByEmail(payload.email, true);

    if (!user) {
        throw new ApiError(401, "auth:invalid_credentials");
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "auth:invalid_credentials");
    }

    if (!user.isActive) {
        throw new ApiError(403, "auth:account_disabled");
    }

    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    return { user, token };
};

export const getMeService = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new ApiError(404, "user:not_found");
    }

    return user;
};