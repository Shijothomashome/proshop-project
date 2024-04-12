const notFound = (req, res, next) => {
    const error = console.log(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error); 
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
     
    res.status(statusCode).json({ // THIS IS NOT TAKEN INSIDE CATCH BLOCK, INSTEAD CHECK IT AS (SERVER RESPOSE VARIABLE).error.data.message eg:- check the UserListScreen.jsx's deleteHandler function
        message, //same as message:message
        stack: process.env.NODE_ENV === 'production' ? err : err.stack
    })
}

export {notFound, errorHandler}