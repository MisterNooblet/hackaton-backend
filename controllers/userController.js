import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const RegisterUserController = async (req, res, next) => {
    const { fullname, email, password } = req.body
    try {
        //check for dublicate users
        const userFound = await User.findOne({ email })
        if (userFound) {
            next(new Error("User Already exist"))
            return
        }
        //check if fields are empty
        if (!email || !password || !fullname) {
            res.json({ message: "All Feilds Are Required" })
            return
        }
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
        console.log('error')
    }
}

export const UserLoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email })
        if (!userFound) {
            res.json({ message: "Invalid Login Credentials" })
            return
        }
        const passwordDoesMatch = await bcrypt.compare(password, userFound.password)
        if (!passwordDoesMatch) {
            res.json({ message: "Invalid Login Credentials" })
        }

        export const GetUsersController = async (req, res) => {
            try {
                const users = await User.find({})
                if (!users) {
                    res.json({ message: "Something went wrong :(" })
                    return
                }
                res.json({
                    status: 'Success',
                    data: users
                })
            } catch (error) {
                console.log(error)
            }
        }