class Encrypter {
    async compare(passoword, hashedPassord) {
        return true
    }
}

describe('Encrypter', () => {
    test('should return true if bcrypt returns true', async () => {
        const sut = new Encrypter();
        const isValid = await sut.compare('any_passoword', 'hashed_password')
        expect(isValid).toBe(true)

    })
})