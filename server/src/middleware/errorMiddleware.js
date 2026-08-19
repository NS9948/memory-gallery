const errorMiddleware = (error, req, res, next) => {

    let statusCode = error.statusCode || 500

    if (
        error.name === "ValidationError" ||
        error.name === "CastError"
    ) {
        statusCode = 400
    }

    return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error"
    })
}

export default errorMiddleware