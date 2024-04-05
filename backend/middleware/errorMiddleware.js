const notFound = (req, res, next) => {
    const error = console.log(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // checking for Mongoose bad ObjectId. Assume if u are trying to get a single product using postman tool and you would use the
    // url like this /api/products/:id. So if you sent the url without an existing ObjectId it will throw an error in an html format with statusCode
    // 500 and saying internal server error. So to change that we are using the below setup!
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Resource not found';
    }
 
    res.status(statusCode).json({ // THIS IS NOT TAKEN INSIDE CATCH BLOCK, INSTEAD CHECK IT AS (SERVER RESPOSE VARIABLE).error.data.message eg:- check the UserListScreen.jsx's deleteHandler function
        message, //same as message:message
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    })
}

export {notFound, errorHandler}