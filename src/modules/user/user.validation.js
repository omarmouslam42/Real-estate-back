import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const updateUserVal = {
    body: Joi.object().keys({
        userName: generalFields.name,
        email: generalFields.email,
        password: generalFields.password,
        avatar: Joi.string()
    }).required(),
    params: Joi.object().required().keys({
        id: generalFields.id.required()
    }),
    query: Joi.object().required().keys({})
}

export const deleteUserVal = {
    body: Joi.object().keys({}).required(),
    params: Joi.object().required().keys({
        id: generalFields.id.required()
    }),
    query: Joi.object().required().keys({})
}


