# Assignment 2 - Order Management System

- technologies: TypeScript, Node.js, Express.js, MongoDB, Mongoose, Zod, Validator, Bcrypt

## How to run

- First, clone the repo and install the dependencies using `npm install` command.
- then, build the project using `npm run build` command.
- at last, run the project using `npm run start:dev` command.

### live link

- https://order-management-backend-kappa.vercel.app

### API endpoints and methods

- Create new user -> POST : /api/users
- Get all users -> GET : /api/users
- Get user by id -> GET : /api/users/:id
- Update user by id -> PUT : /api/users/:id
- Delete user by id -> DELETE : /api/users/:id
- Add order to user -> PUT : /api/users/:id/orders
- Get all orders of a user -> GET : /api/users/:id/orders
- Get Total price of all orders of a user -> GET : /api/users/:id/orders/total-price
- except these all, all routes will send a response with api not found message.
