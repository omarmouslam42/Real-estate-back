import userModel from "../../../../DB/model/auth.model.js";
import { generateToken } from "../../../utlis/GenerateAndVerifyToken.js";
import { compare, hash } from "../../../utlis/HashAndCompare.js";
import { ErrorClass } from "../../../utlis/errorClass.js";
import { asyncHandler } from "../../../utlis/errorHandling.js";

export const signup = asyncHandler(async (req, res, next) => {
    const { userName, email, password } = req.body
    const checkUser = await userModel.findOne({ email }).select(-password)
    if (checkUser) return next(new ErrorClass(`this email ${email} is already exist`, 403))

    const userPass = hash({ plaintext: password })
    try {
        await userModel.create({ userName, email, password: userPass })
    } catch (error) {
        return next(new ErrorClass(error.message, 400))
    }
    return res.status(200).json({ message: "Done" })
})

export const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) {
        return next(new ErrorClass("in-valid information", 400));
    }
    const match = compare({ plaintext: password, hashValue: checkUser.password })
    if (!match) {
        return next(new ErrorClass("in-valid information", 400));
    }
    // create token 
    const payload = {
        id: checkUser._id,
        email: checkUser.email,
        name: checkUser.userName
    }
    const token = generateToken({ payload })

    return res.
        cookie("access_token", token, { httpOnly: true }).
        status(200).
        json({ message: "Done", token, user: checkUser })
})


export const google = asyncHandler(async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email }).select("-password")
        if (user) {
            const payload = {
                id: user._id,
                email: user.email,
                userName: user.userName
            }
            const token = generateToken({ payload })
            return res.status(200).json({ message: "Done", user, token })
        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hasPassword = hash({ plaintext: generatePassword })
            const newUser = await userModel.create({ userName: req.body.userName, email: req.body.email, avatar: req.body.photo, password: hasPassword })
            const token = generateToken({ payload: { id: newUser._id } })
            const { password: pass, ...rest } = newUser._doc
            return res.status(200).json({ message: "Done", token, user: rest })
        }
    } catch (error) {
        return next(new ErrorClass(error, 400));
    }
})

