// import { JwtTokenHandler } from '../JwtTokenHandler'
import { UuidV4Generator } from '../Uuidv4Generator'

describe('Uuid generator', () => {
  test('It should generate a uuidv4', () => {
    const uuidGenerator = new UuidV4Generator()
    const uuid = uuidGenerator.generate()
    const isUuid = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(uuid)
    expect(isUuid).toBe(true)
  })
})
