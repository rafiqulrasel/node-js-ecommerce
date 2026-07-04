import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .notEmpty()
        .withMessage((value, { req }) => req.t("validation:name_required"))
        .isLength({ min: 2 })
        .withMessage((value, { req }) =>
            req.t("validation:min_length", { field: "Name", count: 2 })
        ),

    body("email")
        .notEmpty()
        .withMessage((value, { req }) => req.t("validation:email_required"))
        .isEmail()
        .withMessage((value, { req }) => req.t("validation:invalid_email")),

    body("password")
        .notEmpty()
        .withMessage((value, { req }) => req.t("validation:password_required"))
        .isLength({ min: 8 })
        .withMessage((value, { req }) =>
            req.t("validation:password_min", { count: 8 })
        ),
];

export const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage((value, { req }) => req.t("validation:email_required"))
        .isEmail()
        .withMessage((value, { req }) => req.t("validation:invalid_email")),

    body("password")
        .notEmpty()
        .withMessage((value, { req }) => req.t("validation:password_required")),
];