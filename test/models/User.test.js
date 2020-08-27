import {expect} from "chai"
import User from "../../src/models/User";
import {UserFactory} from "../factories";
import {validate_presence_of} from "../assertions";


describe('models.user', function () {
    it('should require username', () => validate_presence_of(User, "username"))
    it('should require email', () => validate_presence_of(User, "email"))
    it('should require firstName', () => validate_presence_of(User, "firstName"))
    it('should require lastName', () => validate_presence_of(User, "lastName"))
    it('should require password', () => validate_presence_of(User, "password"))

    it ('should add a combined name fields', async function() {
        const user = await UserFactory.create({firstName: "John", lastName: "Doe"})
        expect(user.name).to.equal("John Doe")
    })
})
