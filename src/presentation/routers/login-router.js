const HttpResponse = require('../helpers/http-response')
const httpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
    constructor(authUseCase) {
        this.authUseCase = authUseCase
    }

    route(httpRequest) {
        if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
            return httpResponse.serverError()
        }

        const { email, password } = httpRequest.body
        if (!email) {
            return httpResponse.badRequest('email')
        }
        if (!password) {
            return httpResponse.badRequest('password')
        }
        const acessToken = this.authUseCase.auth(email, password)

        if (!acessToken)
            return httpResponse.unauthorizedError()

        return HttpResponse.ok()
    }
}