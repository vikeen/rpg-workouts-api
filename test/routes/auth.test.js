import axios from 'axios'
import {expect} from "chai"
import User from "../../src/models/User";
import UserFactory from "../factories/UserFactory";


describe('routes.auth', () => {
    describe('register', () => {
        it('should handle validation errors', async () => {
            const payload = {}

            try {
                await axios.post('/auth/register', payload)
                expect.fail()
            } catch (e) {
                expect(e.response.status).to.equal(400)
                expect(e.response.data.errors.password.message).to.equal('`password` can\'t be blank')
                expect(e.response.data.errors.email.message).to.equal('`email` can\'t be blank')
                expect(e.response.data.errors.lastName.message).to.equal('`lastName` can\'t be blank')
                expect(e.response.data.errors.firstName.message).to.equal('`firstName` can\'t be blank')
                expect(e.response.data.errors.username.message).to.equal('`username` can\'t be blank')
            }
        })

        it('should create a new user', async () => {
            const payload = {
                username: "john.doe",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@gmail.com",
                password: "password"
            }

            const response = await axios.post('/auth/register', payload)

            expect(response.status).to.equal(200)
            expect(response.data.username).to.equal("john.doe")
            expect(response.data.firstName).to.equal("John")
            expect(response.data.lastName).to.equal("Doe")
            expect(response.data.email).to.equal("john.doe@gmail.com")
        })
    })
    describe('login', () => {
        it('should handle validation errors', async () => {
            const payload = {}

            try {
                await axios.post('/auth/login', payload)
                expect.fail()
            } catch (e) {
                expect(e.response.status).to.equal(400)
                expect(e.response.data.errors.username.message).to.equal('`username` can\'t be blank')
                expect(e.response.data.errors.password.message).to.equal('`password` can\'t be blank')
            }
        })

        it('should log a user in', async () => {
            const user = await UserFactory.create({password: "11aaAAaa"})
            const payload = {
                username: user.username,
                password: "11aaAAaa"
            }

            const response = await axios.post('/auth/login', payload)
            expect(response.status).to.equal(200)
            expect(response.data.username).to.equal(user.username)
            expect(response.data.password).to.equal(undefined)
        })

        it('should not log in user with wrong username', async () => {
            const user = await UserFactory.create()
            const payload = {
                username: "Nope",
                password: user.password
            }

            try {
                await axios.post('/auth/login', payload)
                expect.fail()
            } catch (e) {
                expect(e.response.status).to.equal(400)
                expect(e.response.data.message).to.equal("Invalid login attempt")
            }
        })

        it('should not log in user with wrong password', async () => {
            const user = await UserFactory.create()
            const payload = {
                username: user.username,
                password: "double-nope"
            }

            try {
                await axios.post('/auth/login', payload)
                expect.fail()
            } catch (e) {
                expect(e.response.status).to.equal(400)
                expect(e.response.data.message).to.equal("Invalid login attempt")
            }
        })

        it('should log in user with case insensitive username ', async () => {
            await UserFactory.create({username: "BIG_USERNAME"})
            const payload = {
                username: "big_username",
                password: "password"
            }

            const response = await axios.post('/auth/login', payload)
            expect(response.status).to.equal(200)
            expect(response.data.username).to.equal("BIG_USERNAME")
        })
    })
})
