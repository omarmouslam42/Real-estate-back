import userModel from "../../DB/model/auth.model.js";
import { verifyToken } from "../utlis/GenerateAndVerifyToken.js";
import { ErrorClass } from "../utlis/errorClass.js";

 const auth = ()=>{
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization?.startsWith(process.env.BEARER_KEY)) {
                return next(new ErrorClass("In-valid bearer key",400))
                // return res.json({ message: "In-valid bearer key" })
            }
            const token = authorization.split(process.env.BEARER_KEY)[1]
            // console.log(token);
            if (!token) {
                return next(new ErrorClass("In-valid token",400))
                // return res.json({ message: "In-valid token" })
            } 
            const decoded = verifyToken({token})
            if (!decoded?.id) {
                return next(new ErrorClass("In-valid token payload",400))
                // return res.json({ message: "In-valid token payload" }) 
            }
            const authUser = await userModel.findById(decoded.id).select('-password')
            if (!authUser) {
                return next( new ErrorClass("Not register account",400))

            }
            req.user = authUser;
            return next();
        } catch (error) {
            return next( new ErrorClass(error,400))
        }
    }
}

export default auth
