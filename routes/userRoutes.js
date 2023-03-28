import express from 'express'
import { RegisterUserController, UserLoginController } from '../controllers/userController.js'
const UserRoute = express.Router()


UserRoute.post('/register', RegisterUserController)

UserRoute.post('/Login', UserLoginController)

// UserRoute.get('/:id', GetUserController)

// UserRoute.delete('/:id', DeleteUserController)

// UserRoute.put('/:id', UpdateUserController)


export default UserRoute