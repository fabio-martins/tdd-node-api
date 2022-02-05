const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
    async auth(email, password) {
        if (!email) {
            throw new MissingParamError('email')
        }
        if (!password) {
            throw new MissingParamError('password')
        }
    }
}

describe('Auth Usecase', () => {
    test('Should throw if no email is provided', async () => {
        const sut = new AuthUseCase()
        const promisse = sut.auth()
        expect(promisse).rejects.toThrow(new MissingParamError('email'))
    })

    test('Should throw if no password is provided', async () => {
        const sut = new AuthUseCase()
        const promisse = sut.auth('any_email@mail.com')
        expect(promisse).rejects.toThrow(new MissingParamError('password'))
    })

    test('Should throw if no password is provided', async () => {
        const sut = new AuthUseCase()
        const promisse = sut.auth('any_email@mail.com')
        expect(promisse).rejects.toThrow(new MissingParamError('password'))
    })
})    
