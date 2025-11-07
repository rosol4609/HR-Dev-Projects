const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    // Return error response
    res.status(status).json({ success: false, message, data });
  };

export default errorHandler;