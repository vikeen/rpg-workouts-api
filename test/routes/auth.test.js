import axios from 'axios'
import {expect} from "chai"


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
    })
})
