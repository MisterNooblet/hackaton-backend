import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { Error } from 'mongoose'
import { AppError, appErr } from '../utils/AppErrors.js'

export const RegisterUserController = async (req, res, next) => {
    const { fullname, email, password } = req.body
    try {
        //check for dublicate users
        const userFound = await User.findOne({ email })
        if (userFound) {
            next(appErr("User Already exist", 400))
            return
        }
        //check if fields are empty
        // if (!email || !password || !fullname) {
        //     res.json({ message: "All Feilds Are Required" })
        //     return
        // }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //createuser
        const user = User.create({
            fullname,
            email,
            password: hashedPassword
        })
        res.json({
            status: 'Success',
            fullname: user.fullname,
            email: user.email,
            id: user._id
        })
    } catch (error) {
        next(new Error(error))
    }
}

export const UserLoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email })
        if (!userFound) {
            next(new AppError("Invalid Login Credentials", 400))
            return
        }
        const passwordDoesMatch = await bcrypt.compare(password, userFound.password)
        if (!passwordDoesMatch) {
            next(new AppError("Invalid Login Credentials", 400))
        }
        res.json({
            status: 'Login route',
            fullname: userFound.fullname,
            id: userFound._id
        })
    } catch (error) {
        next(new AppError("something went wrong"))
    }
}
export const GetUsersController = async (req, res, next) => {
    try {
        const users = await User.find({})
        if (!users) {
            next(new AppError("Something went wrong :(", 404))
            return
        }
        res.json({
            status: 'Success',
            data: users
        })
    } catch (error) {
        next(new Error(error))
    }
}