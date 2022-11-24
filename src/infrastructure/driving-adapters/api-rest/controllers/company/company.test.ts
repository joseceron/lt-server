import request from 'supertest'
import { Server } from '../../Server'

const PORT = process.env.PORT ?? '8000'
const server = new Server(PORT)
const app = server._app

let nit = ''
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY2OTI2NDY5NX0.2YsXu57zktRH1ivl_U4Ethv0g5mS73GboThQROgwckM'

describe.skip('Test GET /v1/companies', () => {
  test('It should response with 200 success', async () => {
    const response = await request(app)
      .get('/v1/companies')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    console.log(response)
    expect(Array.isArray(response.body)).toBe(true)
  })
})

describe.skip('Test POST /v1/companies', () => {
  const completeCompanyData = {
    nit: 'T-100',
    name: 'testint name',
    address: 'T address',
    phone: '+1 245 698'
  }

  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/v1/companies')
      .set('Authorization', `Bearer ${token}`)
      .send(completeCompanyData)
      .expect('Content-Type', /json/)
      .expect(201)

    const body = response.body
    nit = body.nit
    expect(Object.keys(body).length).toBe(4)
    expect(body).toMatchObject(completeCompanyData)
  })
})

describe.skip('Test PUT /movies', () => {
  const companyUpdateData = {
    name: 'testing name updated',
    address: 'T address updated',
    phone: '+1 245 698 11'
  }
  test('It should update the company', async () => {
    const response = await request(app)
      .put(`/v1/companies/${nit}`)
      .set('Authorization', `Bearer ${token}`)
      .send(companyUpdateData)
      .expect('Content-Type', /json/)
      .expect(200)

    const body = response.body
    expect(Object.keys(body).length).toBe(4)
  })
})

describe.skip('Test DELETE /v1/companies', () => {
  test('It should respond with 204', async () => {
    const response = await request(app)
      .delete(`/v1/companies/${nit}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    expect(response.noContent).toBe(true)
  })
})
