import ApiError from "../utils/apiError.js";

export const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError(403, "common:forbidden"));
        }

        next();
    };
};