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

    it('should add a combined name fields', async () => {
        const user = await UserFactory.create({firstName: "John", lastName: "Doe"})
        expect(user.name).to.equal("John Doe")
    })

    it('should validate unique username', async () => {
        await UserFactory.create({username: "doggo"})
        try {
            await UserFactory.create({username: "doggo"})
            expect.fail()
        } catch (e) {
            expect(e.message).to.include("expected `username` to be unique")
        }
    })

    it('should validate unique email', async () => {
        await UserFactory.create({username: "username1", email: "john.doe@gmail.com"})
        try {
            await UserFactory.create({username: "username2", email: "john.doe@gmail.com"})
            expect.fail()
        } catch (e) {
            expect(e.message).to.include("expected `email` to be unique")
        }
    })

    it('should hide password from json serialization', async () => {
        const user = await UserFactory.create({password: "password"})
        expect(user.toJSON().password).to.equal(undefined)
    })
})
