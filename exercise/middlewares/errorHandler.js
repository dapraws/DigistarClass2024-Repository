const errorHandler = (error, req, res, next)=> {
    res.status(error.statusCode).send(error.statusCode);
}


module.exports = errorHandler;