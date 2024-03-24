<!-- FRONTEND -->

# Create project with a name --#proshop--
# Setup the front end environment using create-react-app

  1. npx create-react-app frontend
      Try to run using npm start which will start the frontend server in localhost:3000 port
  2. Remove App.css, App.test.js, logo.svg and also clear codes inside App.js
  3. You can see a .git file which is the git repository and a .gitignore file inside the frontend folder. Using bash terminal you can see .git by typing 'ls -a' , delete the .git file using bash by typing 'rm rf .git'. Go to .gitignore and remove the slash before node_modules so that it can detect node_modules from all the folders including frontend and backend. Add .env to .gitignore file. Then put the .gitignore to the root of the project from frontend folder. And from the root of the project create a git repository by typing 'git init'.
  Now push this to the git repo by creating a new git repo
  from the terminal, 
   >> git add .
   >> git commit -m "initial commit"
   >> [paste the git repo link] git remote add origin https://  github.com/Shijothomashome/proshop-project.git
   >> git branch -M main
   >> git push -u origin main

<!-- Header & footer components -->
 1. From the frontend root install 'npm i react-bootstrap bootstrap react-icons react-router-bootstrap'  react-router-bootstrap is used for accessing the LinkContainer for providing link thereby you can avoid hard reload, you can use Link component from react-router-dom as well 
 2. Go to the index.js entry file and import the booststrap over there "import 'bootstrap/dist/css/bootstrap.min.css' "
 3. Create components folder in the src folder and start creating required components.
 4. Create screens folder in the src and add required screens like home screen product screen etc
 5. You can add custom styles and custom bootstrap styles in a folder called styles inside the assets folder which is kept inside src folder. And you need to replace the bootstrap default import in the entry file of frontend which is index.js with this by importing -->" import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css'; "<-- here a custom style also imported.
 6. you have to setup the router. For that install react-router-dom and from there import --> " import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'; "<--
 And then use it as always does also dont forget to create the main applayout page App.js by adding Outlet and all stuffs


<!-- BACKEND -->

  1. Run 'npm init' in the root, entry point is set to server.js from index.js (optional)
  2. The entry point is set to server.js in the package.json and the entry point server.js is to be put on a folder called backend. So create a folder called backend and create a file called server.js
  3. Now add script into package.json(root) --> "  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js" -- npm i -D nodemon
  } " <-- You can start the server by 'npm run server' or 'npm start'
  4. Now install the express module and setup the server.
  5. To run our backend server and frontend react dev server simultaneously we need a package called 'concurrently'
  'npm i -D concurrently'
  We know that out react dev server is running on localhost:3000 and our backend is running on localhost:5000
  So to make our frontend server running from our root terminal we need to add a script command inside the package.json file of root folder. So for that we can add a filed called client and here it is
  to start the frontend only add -- "client": "npm start --prefix frontend" and run 'npm run client'
  to start the frontend and backend concurrently add -- "dev":"concurrently \"npm run server\" npm run client\"". Now run 'npm run dev' to start concurrently

  Here is the complete script
    "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }

  6. Now the next thing to do is to create .env file. For that install 'npm i -D dotenv'. Now create .env file on the root folder and put the values of PORT, NODE_ENV, MONGO_URI, etc. Also dont forget to import dotenv and call the config method  in the server 
 --> " import dotenv from 'dotenv';
dotenv.config() " <-- // should call config method before ontop of using any env variable.
Set this --> const port = process.env.PORT || 5000; in the server.js Here a fallback port 5000 is provided after OR statement incase any abnormality happens in the .env PORT variable
NOTE:- If you change anything in the .env then the nodemon will not be restarted. You have to restart the server manually
 


<!-- FRONTEND -->
How to use Axios?
"npm i axios" in the frontend
Assume if are using fetch or axios, whatever then we need to do like this
fetch('http://localhost:5000/api/products') but we can fix this into fetch('/api/products') simply by adding a proxy into the frontend package.json  "proxy":"http://localhost:5000"

In the HomeScreen I'm going to fetch the data 
--> " import axios from 'axios'
// and inside the HomeScreen Component,
const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const {data} = await axios.get('/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []); " <--


<!-- MONGOOSE SETUP -->
Create the database as in the videos and now we are going to connect our project to the mongodb database using mongoose
In the root of our application install "npm i mongoose"
After that create a folder called config in the backend, and create a file called db.js inside of it. And write the connection code, export it. Go to the server.js file and import it and call it connectDB() right above calling const app = express();
To check run --> npm run server


<!-- BACKEND -->
  In the backend, i removed the id from all the product docs
  and created 3 dummy users in the users.js file of data    
   folder
  Next is we are going to seed our data so for that create a file called seeder.js in the root of the backend folder
  In the seeder file i have created 2 functions importData and destroyData. So to choose any of the function from that file we setup procees.argv
  and in the package.json we will write the scripts for that individual functions. Look at the seeder.js file given below
  // seeder.js
  console.log(process.argv)

if you run 
PS D:\proshop project> node backend/seeder.js then you get this
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\proshop project\\backend\\seeder.js'
]
And if you run this 
PS D:\proshop project> node backend/seeder.js -d
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\proshop project\\backend\\seeder.js',
  '-d'
] 
what ever you provide as the argument next to seeder.js then it will come at the 2th index
So using this feature we can select the required function with the help of if block which is
shown below

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}

and in the package.json file of root we provide the script to access this easily which is shown below
"scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run 
      client\"",
    "data:import": "node backend/seeder.js",
    "data:destroy": "node backend/seeder.js -d"
  },

create middleware for asyncHandler
create mmiddleware for notFound and errorHandler and import it in server.js and place 
app.use(notFound);
app.use(errorHandler); at the bottom



<!-- FRONTEND -->
Setup redux
In the src of frontend create constants and put the constants like BASE_URL, PRODUCTS_URL, etc
# Asynchronous data fetching using redux toolkit - normally we use fetch or axios inside useEffect hook. It can be done using redux store slices 
Create the parent apiSlice and import it on the store, then create different api slices such as productsApiSlice, etc. we are doing this way is because we can fetch the data from backend asynchronously without using useEffect and fetch mechanisms like axios or fetch. 
Go to apiSlice and you will understand
Also create some normal slices like cartSlice using creatSlice and import it on store

# IMP POINT - Redux Toolkit (and Redux in general) promotes immutability for state updates.
state.cartItems = [...state.cartItems, action.payload] --> Preserves immutability
state.cartItems.push( action.payload) --> Directly mutating, which might work in smaller applications, but it will definitely create problems in complex state management applications



<!-- BACKEND AUTHENTICATION -->
Created userController.js and userRoutes.js and
wrote all the routes associated with users init, then checked all user routes using postman API.
Now started with login (auth) authentication route, Setup the express parsers in the server.js file
 then restructured the email and password from req.body and then it will check for the user in the database using the email given, for checking with the password we will write a matchPassword function inside the userSchema with bcrypt and will call it on this controller. And in a if condition we will check that if there is a user && if the passwords matches or not.if it not satisfies it will take to the else block which will throw a new error.

# Generate JSON Web Tokens
In the backend install jwt "npm i jsonwebtoken"
and then create a folder called utils, inside the utils folder create a file called generateTokens and write the code as a function which generates jwt and stores it into the httpOnly cookie. And then call the function inside the if block mentioned above by passing the response and userId

# Creation of Auth Middleware which will process the token
Now we have set the token in httpOnly cookie, to access private endpoints we need to check if the user is authenticated or not. So inorder to verify the token we need to set an Auth Middleware which will check the user is authenticated or not and will allow to next step if user is authenticated.
So from the backend install "npm i cookie-parser"
Import the cookie parser in the server.js file
"import cookieParser from 'cookie-parser';" and provide it as middleware in server.js below bodyparser middleware of express
Now create a file called authMiddleware.js inside the middleware folder of backend.
We will create 2 middleware functions one is protect middleware and other is admin middleware. After writing the code import those on to the userRoutes and use it as needed.
eg: "router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);"
the protect middleware will check if there is token in the req.cookies.jwt and if exists then it will verify with the secret and will fetch the user from the database and store it to req.user
You can check all these using postman API
Go to userRoutes and see which of the routes choosen different middlewares!
finally check the workflow using postman

Now we need to setup the LOGOUT route which is essentially destroying the JWT from the httpOnly cookie. So look at the code of destroying the token.

Now we need to setup the REGISTER route 
In the register setup we will hash the password but we will not put the code for hashing in the route itself, instead we will write the code as a pre-save hook inside the userModel. So pre save will perform operations before the operation that we plan to do inside the controller. Likewise there is post save hook which will work after the database operation like create, save that we write inside the controller.
Also we need to generate the jwt token if the user registration is successfull. So that user does not have to login again after the registration

Now we need to setup getUserProfile and updateUserProfile
check that!



<!--FRONTEND AUTHENTICATION  -->
productsApiSlice and cartSlice are the childs of apiSlice, so it does not need to be imported on to store.js  Now create authSlice.js with setCredentials and clearCredentials and import it on to store.js
Create usersApiSlice.js. write the "login" mutation  we will pass the form data while submitting the form as POST req through this mutation
Created a FormContainer component and then LoginScreen and now add the login route in the index.js file entry point of frontend
Basically from the login screen we want to do two main things we want to do is, first, call the login using useLoginMutation.
Because that will actually send the request to the backend and set the cookie.
Now, once we get the user data back, we then want to call from the auth slice set credentials.(user gets put in local storage)
So let's go into the login screen and we're also going to use a package called React Testify that will show a message if like we get the wrong email address or something like that.
from frontend "npm i react-toastify"
import ToastContainer  and css file in the App.js file shown below
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
and then use the ToastContainer element after footer or somewhere else, it doesnt matter. and to use it from Login screen import toast
import {toast} from 'react-toastify';
also imported lots of stuff in there check it!

in the cart page checkout button we wrote the checkoutHandler function like this
const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }
    so from the login page we should check if the redirect is there or not 
    so for that in the login screen import useLocation hook from react-router-dom. check the code for that, we will used useEffect hook also for this purpose.
    Dont forget to add redirect setup at the new customer link of form
    setup the header page with userInfo if signed in.
    Now setup the logout mutation and setup the header with logout functionality
    Now setup the register mutation and setup the register screen

<!-- Checkout proccess part 1 -->
In the cart slice add shippingAddress and paymentMethod to initial state as empty object and PayPal.
Now create saveShippingAddress reducer function 
Now create ShippingScreen
The shipping route should be protected means it should be allowed only if there is a user loggedIn.
So for that Let's create PRIVATE ROUTE COMPONENT SETUP
create PrivateRoute.jsx
Learn about "replace" attribute which is a property of the <Navigate> component in React Router.
After settingup the PrivateRoute.jsx using Outlet and Navigate import it on the index.js page. and wrap the private routes inside this PrivateRoute component
Now create CheckoutSteps.jsx and import it on pages like shipping and upcoming pages like payment and pass required props

Now lets setup payment method
In the cart slice add savePaymentMethod reducer
create PaymentScreen and import it on index.js and create route for it.
If user goes into the payment page without paymentAddress then user should be redirected into shipping. so check the code of it

<!-- BACKEND to setup orders -->
create orderRoutes and orderController files and setup the routes and controllers and import orderRoutes on the server file and add the app.use('/api/orders, orderRoutes). Now check if all the routes working or not using postman 
Now all the routes are working,so start implementing all order routes. So we setup the codes of these routes addOrderItems, getMyOrders, getOrderById. Now lets consume them in the front end

<!-- FRONTEND -->
created ordersApiSlice.js and then created PlaceOrderScreen and imported it on index.js file for protected route '/placeorder