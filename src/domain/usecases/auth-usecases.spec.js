const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
    async auth(email) {
        if (!email) {
            return new MissingParamError('email')
        }
    }
}

describe('Auth Usecase', () => {
    test('Should throw if no email is provided', async () => {
        const sut = new AuthUseCase()
        const promisse = sut.auth()
        expect(promisse).rejects.toThrow(new MissingParamError('email'))
    })
})
