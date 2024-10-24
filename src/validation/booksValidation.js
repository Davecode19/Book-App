import Joi from "joi";

export const bookValidationSchema = Joi.object({
    bookCover:Joi.string().required(),
    title:Joi.string().required(),
    
})