import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signUpVal = {
    body: Joi.object().required().keys({
        userName: generalFields.name.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
    }),
    params: Joi.object().required().keys({}),
    query: Joi.object().required().keys({})
}

export const signInVal = {
    body: Joi.object().required().keys({
        email: generalFields.email.required(),
        password: generalFields.password.required(),
    }),
    params: Joi.object().required().keys({}),
    query: Joi.object().required().keys({})
}
