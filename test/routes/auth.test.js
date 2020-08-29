import axios from 'axios'
import {expect} from "chai"
import User from "../../src/models/User";


describe('routes.auth', () => {
    describe('register', () => {
        it('should handle validation errors', async () => {
            const payload = {}

            try {
                await axios.post('/auth/register', payload)
                expect.fail()
            } catch (e) {
                expect(e.response.status).to.equal(400)
                expect(e.response.data.errors.password.message).to.equal('Path `password` is required.')
                expect(e.response.data.errors.email.message).to.equal('Path `email` is required.')
                expect(e.response.data.errors.lastName.message).to.equal('Path `lastName` is required.')
                expect(e.response.data.errors.firstName.message).to.equal('Path `firstName` is required.')
                expect(e.response.data.errors.username.message).to.equal('Path `username` is required.')
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
})
