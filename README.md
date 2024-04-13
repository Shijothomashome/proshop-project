# [Proshop](https://proshop-ecommerce-web.vercel.app/ ) Ecommerce - MERN 
This is an eCommerce shop developed using MERN stack along with Redux Toolkit.


## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- Product search by categories and brands
- Filter product
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)


## Concepts used
- Cloudinary for image storing
- React with functional components & hooks
- React router
- React-Bootstrap UI library
- How to structure components
- Component level state & props
- Managing global state with Redux (Actions & Reducers)
- Using Redux state in components (useDispatch & useSelector)
- useLocation & useNavigation
- Creating an extensive back end with Express
- Working with a MongoDB database and the Mongoose ODM
- JWT authentication (JSON web tokens) with HTTP-Only cookie
- Creating custom authentication middleware
- Custom error handler
- Integrating the PayPal API
- Environment variables
- And lot more..



## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = devleopment
PORT = 5000
MONGO_URI = ADD_YOUR_MONGO_URI
JWT_SECRET = ADD_YOUR_JWT_SECRET
PAYPAL_CLIENT_ID = ADD_YOUR_PAYPAL_CLIENT_ID
PAGINATION_LIMIT = ADD_YOUR_PAGINATION_LIMIT
PAYPAL_APP_SECRET= ADD_YOUR_PAYPAL_APP_SECRET
PAYPAL_API_URL= https://api-m.sandbox.paypal.com // when sandbox to live  https://api-m.paypal.com
CLOUDINARY_NAME = ADD_YOUR_CLOUDINARY_CLOUDNAME
CLOUDINARY_API_KEY = ADD_YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET = ADD_YOUR_CLOUDINARY_API_SECRET 
```
Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@gmail.com (Admin)
123456

john@gmail.com (Customer)
123456

```

---
