import express from 'express'
import { GetLeaders } from '../controllers/userController.js'
import { StoreFoods } from '../controllers/userController.js'
import { GetUsersController, RegisterUserController, UserLoginController } from '../controllers/userController.js'
const UserRoute = express.Router()


UserRoute.post('/register', RegisterUserController)

UserRoute.post('/Login', UserLoginController)
UserRoute.get('/Leaders', GetLeaders)

UserRoute.get('/', GetUsersController)

// UserRoute.get('/:id', GetUserController)

// UserRoute.delete('/:id', DeleteUserController)

UserRoute.put('/:id', StoreFoods)


export default UserRoute