import { isValidObjectId } from "mongoose";

// checking for Mongoose bad ObjectId. Assume if u are trying to get a single product using postman tool and you would use the
// url like this /api/products/:id. So if you sent the url without an existing ObjectId it will throw an error in an html format with statusCode
// 500 and saying internal server error. So to change that we are using the below setup!
//  So mongoose has an inbuilt function for checking the id is valid or not 
function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectId;
