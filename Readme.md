1. Command to make folder as Node project:

=> npm init

=============================================================================

2. Command to install Express in our project:

=> npm i express

* After this the package folder called 'node_modules' will be generated.
  And we can se express with its version in the 'package.json' file.

=============================================================================

3. Run these commands also:

=> npm i nodemon         : To updated the changes automatically.

=> npm i body-parser     : Convert the raw data into the JS-Object, 
                           so that express can understand the data.

=> npm i mongoose        : ODM for mongoDB, Use to connect Node.js 
                           with MongoDB server.

=> npm i dotenv          : To save secret keys.

=> npm i lodash          : Use to filter the array values.

=============================================================================

4. To create the server, we will create the server.js file.

=> server.js file

=============================================================================

5. Now we need to connect the Node.js server to the database server, 
   for this we will create the 'db.js' file and write the code in it.

Path: Project => src => config => db.js 

=============================================================================

6. Now create .env file and write the code:

Path: Project => .env

=============================================================================

7. Now we will create Model and Schema in it:

# User
# ----
=> Create user Model
=> User Routes
=> User Controller

=============================================================================

8. Now we will use bcrypt library for password hashing:

command:
--------
npm i bcrypt --save

* Now write the code inside the User model file.

* Also do some change in the userController's 'login' method.

=============================================================================

9. Now we will Install and use JWT Token:

Command:
--------
npm install jsonwebtoken

2 alag files banao:
-------------------
middleware/
└── jwtAuth.js             ← token verify karna (protect routes)

utils/
└── generateToken.js       ← token banana (login ke time)     

<---------------------------------------------------------------->

* Then we will add the secret key the the '.env' file. 

<---------------------------------------------------------------->

* Now we will apply the JWT in the login controller.

<---------------------------------------------------------------->

* Now protect the routes by using JWT Middleware.

=============================================================================

10. Now we will create new folder:

=> Project => src => scripts => seedAdmin.js

* Now we have to create Admin as first time so we will create by
  writing and executing the code of this file.

<---------------------------------------------------------------->

* Executing the seed code by applying this command:

=> node src/scripts/seedAdmin.js

OUTPUT
------
DB Connected
Admin created : {
  name        : 'Admin',
  email       : 'admin@gmail.com',
  username    : 'admin',
  password    : '$2b$10$HgDjiKyXv/znsIGufRPSdOTRWDe6jubWfjb0M/MW8zqR9fYb7G4E2',
  role        : 'admin',
  _id         : new ObjectId('69ef358513c1657561857aad'),
  __v         : 0
}

<---------------------------------------------------------------->

* Now open postman and send POST request for Admin:

=> Postman => POST => http://localhost:3000/user/login => BODY => raw => JSON

=> 

{
    "username": "admin",
    "password": "admin123"
}

=> Send

OUTPUT:
-------
{
    "message": "Login successful",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWYzNTg1MTNjMTY1NzU2MTg1N2FhZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NzI4ODExMywiZXhwIjoxNzc3ODkyOTEzfQ.bg9Ikq0RcWYUgHG0_LhaOAqprkV1L6fsH9SAroE0HGA"
}

<---------------------------------------------------------------->

* Creating new user:

=> Postman => POST => http://localhost:3000/user/signup => BODY => raw => JSON

=> 

{
    "name": "Ishan",
    "email": "ishan@gmail.com",
    "username": "ishan",
    "password": "ishan123"
}

OUTPUT:
-------
{
    "response": {
        "name": "Ishan",
        "email": "ishan@gmail.com",
        "username": "ishan",
        "password": "$2b$10$UQijppL3VNvvQLz2uL1MDulOeIhukhdkGEcFjPeFTnPffCOBQQCsm",
        "role": "user",
        "_id": "69ef434ee6fd62982a130a20",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWY0MzRlZTZmZDYyOTgyYTEzMGEyMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc3Mjg4MDE0LCJleHAiOjE3Nzc4OTI4MTR9.3W2RtOpLEPK2sEXXyOTrJJiE6BWC3HBrkWF3rZr9V_I",
    "message": "Signup successful"
}

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

11. Now we will create React.js Project by using VITE:

=> Terminal => Path => MERN => 

Command:
--------
=> npm create vite@latest

Project name : mern-react
Framework    : React
Variant      : JavaScript

* Now we will see this URL('http://localhost:5173/') in the terminal:

=> click the URL 

=> React ka default page dikhega — matlab setup sahi hai! 🎉

=> ctrl+c      : Command to stop the server

=> npm run dev : Command to run the react server.

-----------------------------------------------------------------------------

* Now goto this path:

=> Desktop => MERN => Open the Directory => Now we will see both 'mern-node'
                                            folder and 'mern-react' folder in 
                                            VS-Code.

=============================================================================

***IMP***
---------
* Aage ke notes hum 'mern-react' project ki 'README.md' file mai likhte 
  jyenge.

* Niche waale steps 'mern-react' ke steps ke baad ke hai dhyan rakhna.

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

13. Fix — Backend mein CORS allow karo:

* Step 1 — Backend mein cors package install karo:

# mern_node folder mein jao:
----------------------------
=> cd mern_node
=> npm install cors

-----------------------------------------------------------------------------

* Step 2 — server.js mein add karo

CODE:
-----
const cors    = require('cors');  // ← import karo

app.use(cors({
  origin: 'http://localhost:5173'  // tumhara React app ka URL
}));

-----------------------------------------------------------------------------

* Phir backend restart karo

=> nodemon server.js

-----------------------------------------------------------------------------

* Ab wapus se 'mern-react' pr jaao or uski Readme.md file ko follow karo.

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

15. Ab Product Model banana shuru karte hain — Backend se shuru karenge!

. Product Model mein kya kya hoga?

* Ek product ke liye kya kya chahiye?

name        — Product ka naam
description — Details
price       — Kitne ka hai
category    — Electronics, Clothes etc
stock       — Kitne available hain
image       — Product ki photo

-----------------------------------------------------------------------------

* Backend mein ye files banani hain:

models/
└── Product.js            ← Model

controllers/
└── productController.js  ← CRUD

routes/
└── productRoutes.js      ← Routes

-----------------------------------------------------------------------------

# User model se kya alag hai — notice karo

// Naya concept — Reference

createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'    // ← User model se connected hai
}

// Matlab — Product, DB mein sirf User ka ID store karega
// Jab chahiye tab User ki details fetch kar lenge
// Isse populate() use karenge — baad mein dekhenge

=============================================================================

# Ab Controller banate hain?

* productController.js mein ye functions banenge —

createProduct   — Admin only
getAllProducts  — Sabhi dekh sakte hain
getProductById  — Ek product detail
updateProduct   — Admin only
deleteProduct   — Admin only

-----------------------------------------------------------------------------

* User Controller se kya alag hai — notice karo:

// Product mein password hashing nahi hai
// Isliye findByIdAndUpdate seedha use kar sakte hain ✅

// User mein password tha isliye —
// pehle findById kiya, phir save() kiya
// taaki bcrypt hook chale

=============================================================================

* Ab Routes banate hain ?
-------------------------

GET    /product          — getAllProducts — public
GET    /product/:id      — getProductById — public
POST   /product          — createProduct  — admin only
PUT    /product/:id      — updateProduct  — admin only
DELETE /product/:id      — deleteProduct  — admin only

-----------------------------------------------------------------------------

Postman se test karo
--------------------

* Product banao — Admin token chahiye:

POST => http://localhost:3000/product => Body => raw => JSON

     => Authorization => Bearer Token => Admin Token

{
    "name"       : "iPhone 15",
    "description": "Latest iPhone",
    "price"      : 79999,
    "category"   : "electronics",
    "stock"      : 10
}

=> OUTPUT:

{
    "message": "Product created",
    "product": {
        "name": "iPhone 15",
        "description": "Latest iPhone",
        "price": 79999,
        "category": "electronics",
        "stock": 10,
        "image": "default-product.png",
        "createdBy": "69ef358513c1657561857aad",
        "_id": "6a1494f8c4ba39d5cdea7fd5",
        "createdAt": "2026-05-25T18:29:12.293Z",
        "updatedAt": "2026-05-25T18:29:12.293Z",
        "__v": 0
    }
}

-----------------------------------------------------------------------------

# GET all products:

=> GET => http://localhost:3000/product => Send

* Toh hume sabhi products show ho jayenge.

=============================================================================

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

15. Ab hum ek naya route or controller banayenge jisse user khud ka account
    delete kar sake:

userRoutes.js: 
--------------
router.delete('/account' , jwtAuthMiddleware, userController.deleteOwnAccount);

userController.js file code:
----------------------------
* Fir hum iska controller method bhi likh denge.

# IMP
-----
* Or hum userController.js file ke 'deleteUser' method mai ek cheq laga denge
  ki Admin khud ko delete naa kar sake.

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

16. Ab hum "Cart" ka model, routes or controller banayenge:

=> Cart ke liye 3 files banani hain

models/
└── Cart.js              ← Model

controllers/
└── cartController.js    ← Logic

routes/
└── cartRoutes.js        ← Routes

-----------------------------------------------------------------------------

=> server.js mein add karo

const cartRoutes = require('./src/routes/cartRoutes');
app.use('/cart', cartRoutes);

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

17. Ab hum "Order" ka model, routes or controller banayenge:

=> Order ke liye 3 files banani hain

models/
└── Order.js              ← Model

controllers/
└── orderController.js    ← Logic

routes/
└── orderRoutes.js        ← Routes

-----------------------------------------------------------------------------

=> server.js mein add karo

const orderRoutes = require('./src/routes/orderRoutes');
app.use('/order', orderRoutes);

-----------------------------------------------------------------------------

# Models ke beech ka link:

User Model
└── _id: '111'  ← bas itna important hai

Product Model
└── _id: '222'  ← bas itna important hai

Cart Model
└── user   : '111'  ← User ka _id
└── items  : [
      product : '222'  ← Product ka _id
      quantity: 2
    ]

Order Model
└── user   : '111'  ← User ka _id
└── items  : [
      product : '222'  ← Product ka _id
      quantity: 2
      price   : 79999
    ]

-----------------------------------------------------------------------------
-----------------------------------------------------------------------------

# Poora Backend ab complete hai!

✅ User Module    — Auth, JWT, Bcrypt
✅ Product Module — CRUD, Admin Only
✅ Cart Module    — Add, Remove, Stock Management
✅ Order Module   — Place, Cancel, Status Update  

-----------------------------------------------------------------------------
-----------------------------------------------------------------------------

# Postman se poora flow test karo:

1. Signup/Login karo       → Token lo
2. Products dekho          → GET /product
3. Cart mein add karo      → POST /cart
4. Order place karo        → POST /order
5. Order dekho             → GET /order/my-orders
6. Order cancel karo       → PUT /order/cancel/:id

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

18. Populate in Orders

Goto => orderController.js => placeOrder method => Ab yaha hum populate ko
                                                   apply kar denge.

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

19. Input Validation — Zaroori hai

* Abhi kya ho sakta hai bina validation ke:

POST /product
{
    "name" : "",        // ← blank name
    "price": -999,      // ← negative price
    "category": "xyz"   // ← schema mein nahi hai
}

-----------------------------------------------------------------------------

a. express-validator install karo:

Command:
--------
=> npm install express-validator

<-------------------------------------------------->

b. middleware/validate.js banao:

. Or isme code likho

<-------------------------------------------------->

c. middleware/validators/productValidator.js banao:

. Isme code likho

<-------------------------------------------------->

d. productRoutes.js mein use karo:

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

20. Error Handling Middleware

* middleware/errorHandler.js banao:

* server.js mein sabse neeche add karo:

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

21. Search/Filter — Backend se kaise hoga

a. productController.js mein getAllProducts update karo:

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

# POSTMAN
# -------

* Ab hum postman se sabhi url's ko hit krenge:

#                                  Users
#                                  -----

***IMP***
NOTE: Ye waala step hum upr pehle hi apply kar chuke hai:

1. Create Admin
---------------

* 1st time Admin bananeke liye humne banayi ek file or isme humne insert
  kiya admin ka data:

=> mern-node => src => scripts => seedAdmin.js

. Ab hume admin ko create karna hai toh uske liye hume es file ko run krna 
  hoga or ye file poore project mai hume sirf ek baar hi chalani hai:

Command:
--------
=> node src/scripts/seedAdmin.js

-----------------------------------------------------------------------------

2. Login Admin
--------------

=> POST => http://localhost:3000/user/login => BODY => raw => JSON

=> 

{
    "username": "admin",
    "password": "admin123"
}

=> Send

OUTPUT:
-------
{
    "message": "Login successful",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWYzNTg1MTNjMTY1NzU2MTg1N2FhZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6
    MTc4MzQwNzY4NCwiZXhwIjoxNzg0MDEyNDg0fQ.aWYpB9g6LE1avMSVEzTg6_DXZ32bx99fF
    n2rDJZxUtQ"
}

-----------------------------------------------------------------------------

3. Create New Admin by using Token of existing Admin:
-----------------------------------------------------

=> POST => http://localhost:3000/user/createAdmin => BODY => raw => JSON

=> 

{
    "name": "Ishan",
    "email": "ishan@gmail.com",
    "username": "ishan",
    "password": "ishan123"
}

=> Authorization => Auth Type => Bearer Token => Paste Admin Token 

=> Send
    
OUTPUT:
-------
{
    "response": {
        "name": "Ishan",
        "email": "ishan@gmail.com",
        "username": "ishan",
        "password": "$2b$10$Kve.BP8GCtZoPfvWhn0grOVU.FUxZMjZKP3VYL65DnggOV6LVrPfy",
        "role": "admin",
        "_id": "6a4ca67f7ce634274614a345",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNGNhNjdmN2NlNjM0Mjc0NjE0YTM0NSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4Mz
    QwODI1NSwiZXhwIjoxNzg0MDEzMDU1fQ.96ErHThYvi6RqNCWefbLoBbcnpaIZbDpZZCWTcCUKyg",
    "message": "Admin created"
}

-----------------------------------------------------------------------------

4. User SignUp
--------------

=> POST => http://localhost:3000/user/signup => BODY => raw => JSON =>

{
    "name": "Deepak",
    "email": "deepak@gmail.com",
    "username": "deepak",
    "password": "deepak123"
}

=> Send

OUTPUT:
-------
{
    "response": {
        "name": "Deepak",
        "email": "deepak@gmail.com",
        "username": "deepak",
        "password": "$2b$10$vuIxxsdm9Xqi.MD72YnBV.i6G8cJdjyWXzUBdryLrQ/OsrXrmsbO.",
        "role": "user",
        "_id": "6a4cb0ce7ce634274614a346",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNGNiMGNlN2NlNjM0Mjc0NjE0YTM0NiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzgzND
    EwODk0LCJleHAiOjE3ODQwMTU2OTR9._X5RIgxUkSACodTW5ODHozeqSuc1cgtMxz__u3oSFIQ",
    "message": "Signup successful"
}

-----------------------------------------------------------------------------

5. User Login
-------------

=> POST => http://localhost:3000/user/signup => BODY => raw => JSON =>

{
    "username": "deepak",
    "password": "deepak123"
}

=> Send

OUTPUT:
-------
{
    "message": "Login successful",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNGNiMGNlN2NlNjM0Mjc0NjE0YTM0NiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxN
    zgzNDEwOTg3LCJleHAiOjE3ODQwMTU3ODd9.k327v1Lt75K2Dd-_ToZN604GxZzFwGoOoiwFj
    ChU9i0"
}

-----------------------------------------------------------------------------

6. Get All Users
----------------

=> GET => http://localhost:3000/user/ => BODY => raw => JSON =>

=> Send

-----------------------------------------------------------------------------

7. Delete User By Admin
-----------------------

=> DELETE => http://localhost:3000/user/user_id => Send

=============================================================================

#                                Product
#                                -------

1. Add product
--------------

=> POST => http://localhost:3000/product=> BODY => raw => JSON =>

{
    "name"       : "Earbuds",
    "description": "latest digital smart buds",
    "price"      : 1200,
    "category"   : "electronics",
    "stock"      : 40
}

=> Authorization => Auth Type => Bearer Token => Admin Token =>

=> Send

OUTPUT:
-------
{
    "message": "Product created",
    "product": {
        "name": "Earbuds",
        "description": "latest digital smart buds",
        "price": 1200,
        "category": "electronics",
        "stock": 40,
        "image": "default-product.png",
        "createdBy": "69ef358513c1657561857aad",
        "_id": "6a4cec7893843bcace72f60a",
        "createdAt": "2026-07-07T12:09:28.854Z",
        "updatedAt": "2026-07-07T12:09:28.854Z",
        "__v": 0
    }
}

-----------------------------------------------------------------------------

2. Show All Products
--------------------

=> GET => http://localhost:3000/product => Send

-----------------------------------------------------------------------------

3. Search Product
-----------------

// Sirf search
=> GET /product?search=iphone

// Sirf category
=> GET /product?category=electronics

// Search + category
=> GET /product?search=iphone&category=electronics

// Price range
=> GET /product?minPrice=1000&maxPrice=50000

// Sab saath
=> GET /product?search=iphone&category=electronics&minPrice=1000&maxPrice=80000

=============================================================================

#                                  Cart
#                                --------

1. Add product to cart
----------------------

=> POST => http://localhost:3000/cart => BODY => raw => JSON =>

{
    "productId": "6a4cec7893843bcace72f60a",
    "quantity" : 1
}

=> Authorization => Auth Type => Bearer Token => Token of tht user who wanna
                                                 added the product into the 
                                                 cart.

=> Send

OUTPUT:
-------
{
    "message": "Added to cart",
    "cart": {
        "user": "6a4cb0ce7ce634274614a346",
        "items": [
            {
                "product": "6a4cec7893843bcace72f60a",
                "quantity": 1,
                "_id": "6a4cf10fa6f2c9bdee5113bf"
            }
        ],
        "_id": "6a4cf10fa6f2c9bdee5113be",
        "createdAt": "2026-07-07T12:29:03.951Z",
        "updatedAt": "2026-07-07T12:29:03.951Z",
        "__v": 0
    }
}

-----------------------------------------------------------------------------

2. Add product to cart
----------------------

=> GET => http://localhost:3000/cart => 

=> Authorization => Auth Type => Bearer Token => We need to enter the token 
                                                 of the user who wants to 
                                                 view the items in their 
                                                 cart.
                                                 
=> Send

OUTPUT:
-------
{
    "_id": "6a4cf10fa6f2c9bdee5113be",
    "user": "6a4cb0ce7ce634274614a346",
    "items": [
        {
            "product": {
                "_id": "6a4cec7893843bcace72f60a",
                "name": "Earbuds",
                "price": 1200,
                "image": "default-product.png"
            },
            "quantity": 2,
            "_id": "6a4cf10fa6f2c9bdee5113bf"
        }
    ],
    "createdAt": "2026-07-07T12:29:03.951Z",
    "updatedAt": "2026-07-07T12:41:24.923Z",
    "__v": 0
}

=============================================================================

#                                  Orders
#                                ----------

1. Place order for that user
----------------------------

=> POST => http://localhost:3000/order => Authorization => Auth Type =>

=> Bearer Token => Token of that user who wants to placed their cart items.

=> Send

OUTPUT:
-------
{
    "message": "Order placed",
    "order": {
        "_id": "6a4cf55e1ce2298ec9711356",
        "user": {
            "_id": "6a4cb0ce7ce634274614a346",
            "name": "Deepak",
            "email": "deepak@gmail.com"
        },
        "items": [
            {
                "product": {
                    "_id": "6a4cec7893843bcace72f60a",
                    "name": "Earbuds",
                    "price": 1200,
                    "image": "default-product.png"
                },
                "quantity": 2,
                "price": 1200,
                "_id": "6a4cf55e1ce2298ec9711357"
            }
        ],
        "totalAmount": 2400,
        "address": "123, MG Road, Indore",
        "status": "pending",
        "paymentStatus": "unpaid",
        "createdAt": "2026-07-07T12:47:26.193Z",
        "updatedAt": "2026-07-07T12:47:26.193Z",
        "__v": 0
    }
}

-----------------------------------------------------------------------------

2. Get user's ordered products
------------------------------

=> GET => http://localhost:3000/order/myorders => Authorization 

=> Auth Type => Token of the user

Output:
-------
[
    {
        "_id": "6a4cf55e1ce2298ec9711356",
        "user": "6a4cb0ce7ce634274614a346",
        "items": [
            {
                "product": {
                    "_id": "6a4cec7893843bcace72f60a",
                    "name": "Earbuds",
                    "price": 1200,
                    "image": "default-product.png"
                },
                "quantity": 2,
                "price": 1200,
                "_id": "6a4cf55e1ce2298ec9711357"
            }
        ],
        "totalAmount": 2400,
        "address": "123, MG Road, Indore",
        "status": "pending",
        "paymentStatus": "unpaid",
        "createdAt": "2026-07-07T12:47:26.193Z",
        "updatedAt": "2026-07-07T12:47:26.193Z",
        "__v": 0
    }
]

-----------------------------------------------------------------------------

3. Updating Order Status
------------------------

=> PUT => http://localhost:3000/order/status/order_id => Body => raw 

=> JSON =>

{
    "status": "shipped"
}

=> Authorization => Auth Type => Bearer Token => Admin Token => Send

Output:
-------
{
    "message": "Order status updated",
    "order": {
        "_id": "6a4cf55e1ce2298ec9711356",
        "user": "6a4cb0ce7ce634274614a346",
        "items": [
            {
                "product": "6a4cec7893843bcace72f60a",
                "quantity": 2,
                "price": 1200,
                "_id": "6a4cf55e1ce2298ec9711357"
            }
        ],
        "totalAmount": 2400,
        "address": "123, MG Road, Indore",
        "status": "shipped",
        "paymentStatus": "unpaid",
        "createdAt": "2026-07-07T12:47:26.193Z",
        "updatedAt": "2026-07-07T12:56:15.017Z",
        "__v": 0
    }
}

<----------------------------------------------------->

* Ab hum ye do values ko body mai change karke send krenge:

{
    "status": "delivered",
    "paymentStatus": "paid"
}

=> Send

Output:
-------
{
    "message": "Order updated",
    "order": {
        "_id": "6a4cf55e1ce2298ec9711356",
        "user": "6a4cb0ce7ce634274614a346",
        "items": [
            {
                "product": "6a4cec7893843bcace72f60a",
                "quantity": 2,
                "price": 1200,
                "_id": "6a4cf55e1ce2298ec9711357"
            }
        ],
        "totalAmount": 2400,
        "address": "123, MG Road, Indore",
        "status": "delivered",
        "paymentStatus": "paid",
        "createdAt": "2026-07-07T12:47:26.193Z",
        "updatedAt": "2026-07-07T13:03:57.496Z",
        "__v": 0
    }
}

=============================================================================

* Ab hum Frontend pe Products dikhana shuru karenge! 🚀

Now goto 'mern-react' project.

=============================================================================
-----------------------------------------------------------------------------
=============================================================================

26. GitHub
----------

* Ab hum apne code ko github pr puch krenge:

* Yha se hum backend wala project push krenge.

---------------------------------------------------------------------------------

a. Ab hum apne es project ko git repo banayenge:

Commands:
---------

=> git init

=> git status

---------------------------------------------------------------------------------

b. Yaha pr hum .gitignore file banayenge or usme ye do files add kr denge:

node_modules
.env

---------------------------------------------------------------------------------

c. Ab GITHUB pr jaa kr new repo create krenge:

. Ab local git repo ko remote se kaise connect kare GitHub se ??

. kyuki hume hmara code ab online kahi par rakhna hai or uske liye 
  GitHub ek free hoisting service provide krta hai code ko save or 
  manage karne ke liye:
   
STEPS:
------
=> google => github => signin => email
                                 password

* Ab hum ek new repo banayenge:
-------------------------------

=> new repository => Repository name => mern-node

=> public => create repository

Command:
--------
git remote add origin https://github.com/IshanYadav1008/mern-node.git

* Ab hmri local repo, remote repo se connect ho chuki hai.

---------------------------------------------------------------------------------

d. Ab hum apni local repo ko push krenge:

Commands:
---------

=> git status

=> git add .

=> git commit -m "Commit Message"

=> git push origin master