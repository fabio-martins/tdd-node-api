const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase
    }

    async route(httpRequest) {
        try {
            const { email, password } = httpRequest.body
            if (!email) {
                return httpResponse.badRequest(new MissingParamError('email'))
            }
            if (!password) {
                return httpResponse.badRequest(new MissingParamError('password'))
            }
            const acessToken = await this.authUseCase.auth(email, password)

            if (!acessToken) {
                return httpResponse.unauthorizedError()
            }

            return HttpResponse.ok({ acessToken })
        }
        catch (error) {
            return HttpResponse.serverError()
        }
    }
}