import asyncHandler from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/apiResponse.js";
import {
    registerService,
    loginService,
    getMeService,
} from "./auth.service.js";

const formatUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    };
};

export const register = asyncHandler(async (req, res) => {
    const { user, token } = await registerService(req.body);

    return successResponse(
        res,
        req.t("auth:register_success"),
        {
            user: formatUser(user),
            token,
        },
        201
    );
});

export const login = asyncHandler(async (req, res) => {
    const { user, token } = await loginService(req.body);

    return successResponse(res, req.t("auth:login_success"), {
        user: formatUser(user),
        token,
    });
});

export const me = asyncHandler(async (req, res) => {
    const user = await getMeService(req.user.id);

    return successResponse(res, req.t("user:profile_found"), formatUser(user));
});