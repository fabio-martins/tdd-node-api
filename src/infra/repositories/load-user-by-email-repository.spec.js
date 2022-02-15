const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let connection, db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return { userModel, sut }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })

  test('should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBe(null)
  })

  test('should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    await userModel.insertOne({ email: 'valid_email@mail.com' })
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
  })
})
