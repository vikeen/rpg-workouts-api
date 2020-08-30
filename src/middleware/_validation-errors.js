export const FieldRequiredError = (path) => {
    return {
        name: 'ValidatorError',
        message: `\`${path}\` can't be blank`,
        properties: {
            message: `\`${path}\` can't be blank`,
            type: 'required',
            path
        },
        kind: 'required',
        path
    }
}
