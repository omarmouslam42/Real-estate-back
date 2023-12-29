import joi from 'joi'
import { Types } from 'mongoose'
import { ErrorClass } from '../utlis/errorClass.js'
const dataMethods = ["body", 'params', 'query', 'headers', 'file']

const validateObjectId = (value, helper) => {
    // console.log({ value });
    // console.log(helper);
    return Types.ObjectId.isValid(value) ? true : helper.message('In-valid objectId')
}
export const generalFields = {
    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ['com', 'net'] }
    }),
    password:joi.string().min(4),
    cPassword:joi.string().valid(joi.ref("password")),
    id: joi.string().custom(validateObjectId),
    name: joi.string().min(4),
    phone:joi.string().pattern(new RegExp(`^01[0-2,5]{1}[0-9]{8}$`)).max(11),
    date: joi.string().pattern(new RegExp(/^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/)),
    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required()
    })
}

export const validation = (schema) => {
    return (req, res, next) => {
        // console.log({ body: req.body });
        const validationErr = []
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationErr.push(validationResult.error.details)
                }
            }
        });

        if (validationErr.length) {
            return res.json({ message: "Validation Err", validationErr })
        }
        return next()
    }
}