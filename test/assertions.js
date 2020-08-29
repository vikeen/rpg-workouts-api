import {expect} from "chai";

export const validate_presence_of = async (model, key) => {
    try {
        await model.create({});
        expect.fail(`Expected '${model.modelName}' model to require field '${key}', but could not confirm`);
    } catch (e) {
        expect(e.errors[key].message).to.equal(`\`${key}\` can't be blank`)
    }
}
