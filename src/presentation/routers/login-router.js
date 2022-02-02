const HttpResponse = require('../helpers/http-response')
const httpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase
    }

    async route(httpRequest) {
        try {
            const { email, password } = httpRequest.body
            if (!email) {
                return httpResponse.badRequest('email')
            }
            if (!password) {
                return httpResponse.badRequest('password')
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