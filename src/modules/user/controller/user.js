import { ErrorClass } from "../../../utlis/errorClass.js";
import { asyncHandler } from "../../../utlis/errorHandling.js";
import userModel from "../../../../DB/model/auth.model.js";
import { hash } from "../../../utlis/HashAndCompare.js";


export const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.user._id != id) {
        return next(new ErrorClass("you can only update your own account ",400))
    }
    if (req.body.password) {
        req.body.password = hash({plaintext: req.body.password})
    }
    const user = await userModel.findByIdAndUpdate(id,req.body,{new:true}).select("-password");
    if (!user) {
        return next(new ErrorClass("User not found", 404))
    }
    return res.status(200).json({message:"update is Done",user});
})

export const deleteUser =asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    if (req.user._id != id) {
        return next(new ErrorClass("you can only delete your own account ",400))
    }
    const user = await userModel.findByIdAndDelete(id).select("-password");
    if (!user) {
        return next(new ErrorClass("User not found", 404))
    }
    return res.status(200).json({message:"Done"});
})

