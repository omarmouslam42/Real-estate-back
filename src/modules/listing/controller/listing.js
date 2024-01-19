import listingModel from "../../../../DB/model/Listing.model.js";
import { ApiFeatures } from "../../../utlis/apiFeatures.js";
import { ErrorClass } from "../../../utlis/errorClass.js";
import { asyncHandler } from "../../../utlis/errorHandling.js";
import { sendEmail } from "../../../utlis/email.js";
import userModel from "../../../../DB/model/auth.model.js";
// FxjnoByqr5vLqGnW

export const getListing = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
   
    const listing = await listingModel.findById(id).select('-createdAt -__v -updatedAt -_id')
    if (!listing) {
        return next(new ErrorClass("Not Found", 404))
    }
    if (req.user._id.toString() !== listing.createdBy.toString()) {
        return next(new ErrorClass("owner only can delete a listing", 400))
    }
    return res.status(200).json({ message: "Done", listing })
})

export const getUserListing = asyncHandler(async (req, res, next) => {
    const listing = await listingModel.find({ createdBy: req.user._id }).select("name images _id")
    if (!listing) {
        return next(new ErrorClass("Not Found", 404))
    }
    return res.status(200).json({ message: "Done", listing })
})

export const searchListing = asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(listingModel.find(), req.query)
        .pagination()
        .sort()
        .search();
    const listing = await apiFeatures?.mongooseQuery
    return res.status(200).json({ message: "Done", listing })
}
)

export const getListingById = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const listing = await listingModel.findById(id)
    if (!listing) {
        return next(new ErrorClass("not found", 404))
    }
    return res.status(200).json({ message: "Done", listing })
}
)

export const create = asyncHandler(async (req, res, next) => {
    if (req.body.discountPrice) {
        // console.log(req.body.discountPrice, req.body.regularPrice);
        if (Number(req.body.discountPrice) >= Number(req.body.regularPrice)) {
            return next(new ErrorClass("discountPrice must be less than regular", 400))
        }
        req.body.regularPrice = Number(req.body.regularPrice - req.body.discountPrice)
        // console.log(req.body.regularPrice);
    }
    const listing = await listingModel.create({ ...req.body, createdBy: req.user._id })
    return res.status(200).json({ message: "Done", listing })
})




export const deleteUserListing = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const checkListing = await listingModel.findById(id)
    if (!checkListing) {
        return next(new ErrorClass("Not Found", 404))
    }
    // console.log(req.user);
    // console.log(checkListing);
    if (req.user._id.toString() !== checkListing.createdBy.toString()) {
        return next(new ErrorClass("owner only can delete a listing", 400))
    }
    await listingModel.deleteOne({ _id: id })

    return res.status(200).json({ message: "Done" })
})


export const updateListing = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const listing = await listingModel.findById(id)
    if (!listing) {
        return next(new ErrorClass("Not Found", 404))
    }
    if (req.user._id.toString() !== listing.createdBy.toString()) {
        return next(new ErrorClass("owner only can upate a listing", 400))
    }
    if (req.body.discountPrice) {
        if (Number(req.body.discountPrice) >= Number(req.body.regularPrice)) {
            return next(new ErrorClass("discountPrice must be less than regular", 400))
        }
        req.body.regularPrice = Number(req.body.regularPrice - req.body.discountPrice)

    }
    const updatUser = await listingModel.updateOne({ _id: id }, req.body)
    return res.status(200).json({ message: "Done", updatUser })
})




export const resiveEmail = asyncHandler(async (req, res, next) => {
    const { message } = req.body;
    const id = req.user._id
    const user = await userModel.findById(id).select("email userName")
    if (!user) {
        return next(new ErrorClass("user is not found ", 404))
    }
    sendEmail({ from: user.email, name: user.userName, html: message })
    return res.status(200).json({ message: "Done" })
})



