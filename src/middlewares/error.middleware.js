export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const message = err.messageKey
        ? req.t(err.messageKey)
        : req.t("error:internal_server_error");

    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || null,
    });
};