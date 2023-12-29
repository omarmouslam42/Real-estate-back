import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createListingVal = {
    body: Joi.object().keys({
        name: generalFields.name.required(),
        description: generalFields.name.required(),
        address: generalFields.name.required(),
        type: Joi.string().required(),
        parking:Joi.boolean().required(),
        furnished:Joi.boolean().required(),
        offer: Joi.boolean().required(),
        bedrooms:Joi.number().required(),
        bathrooms:Joi.number().required(),
        regularPrice: Joi.number().required(),
        discountPrice: Joi.number().required(),
        images: Joi.array().min(1).required(),
    }).required(),
    params: Joi.object().required().keys({}),
    query: Joi.object().required().keys({})
}

export const UpdateListingVal = {
    body: Joi.object().keys({
        name: generalFields.name.required(),
        description: generalFields.name.required(),
        address: generalFields.name.required(),
        type: Joi.string().required(),
        parking:Joi.boolean().required(),
        furnished:Joi.boolean().required(),
        offer: Joi.boolean().required(),
        bedrooms:Joi.number().required(),
        bathrooms:Joi.number().required(),
        regularPrice: Joi.number().required(),
        discountPrice: Joi.number().required(),
        images: Joi.array().min(1).required(),
        createdBy:generalFields.id,

    }).required(),
    params: Joi.object().required().keys({
        id:generalFields.id.required(),
    }),
    query: Joi.object().required().keys({})
}
export const messageVal = {
    body: Joi.object().keys({
        message: generalFields.name.required(),

    }).required(),
    params: Joi.object().required().keys({}),
    query: Joi.object().required().keys({})
}



