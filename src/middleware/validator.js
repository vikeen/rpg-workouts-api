import {FieldRequiredError} from "./_validation-errors";

export default (fields) => {
    return (req, res, next) => {
        const errors = {};

        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                checkRequiredValidation(req, fields, key, errors)
            }
        }

        if (Object.keys(errors).length) {
            return res.send(400, {errors})
        }

        next()
    }
}

const checkRequiredValidation = (req, fields, key, errors) => {
    const field = fields[key]
    const value = req.body[key]

    if (field.required && !value) {
        errors[key] = FieldRequiredError(key)
    }
}
