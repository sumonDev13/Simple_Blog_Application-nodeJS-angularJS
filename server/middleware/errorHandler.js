const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ error: message });
};

export default errorHandler;