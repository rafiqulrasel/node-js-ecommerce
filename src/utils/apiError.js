class ApiError extends Error {
    constructor(statusCode, messageKey, errors = null) {
        super(messageKey);
        this.statusCode = statusCode;
        this.messageKey = messageKey;
        this.errors = errors;
        this.isOperational = true;
    }
}

export default ApiError;