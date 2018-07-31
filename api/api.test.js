/* global describe it beforeAll afterAll expect */
let request = require('supertest')
const api = require('./index.js')
const express = require('express')

describe.skip('Api V1', () => {
  const server = express()

  server.use('/api/v1', api)
  const job = server.listen(3001, (err) => {
    if (err) throw err
  })
//   let app // TODO: Remove unused code.
  beforeAll(() => {
    console.log('runs')
    request = request(server)
  })

  it('exposes location', async () => {
    const response = await request
            .get('/api/v1/location')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72')

    expect(response.body).toEqual({ city: 'Avellaneda', ip: '190.194.12.72' })
  })

  it('should return weather when city is not provided', async () => {
        // Set an Avellaneda's ip address
    const response = await request
            .get('/api/v1/city')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72')

    expect(response.body.city).toEqual('Avellaneda')
    expect(response.body.country).toEqual('AR')
    expect(response.body.weather).toEqual(expect.any(String))
  })

  it('should return weather for london', async () => {
        // Set an Avellaneda's ip address
    const response = await request
            .get('/api/v1/city/london')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72')
    expect(response.body.city).toEqual('London')
    expect(response.body.country).toEqual('GB')
    expect(response.body.weather).toEqual(expect.any(String))
  })

  it('should forecast weather when city is not provided', async () => {
    const response = await request
            .get('/api/v1/forecast')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72')
    expect(response.body.city).toEqual('Avellaneda')
    expect(response.body.country).toEqual('AR')
    expect(response.body.forecast).toEqual(expect.any(Array))
  })

  it('should forecast weather for london', async () => {
    const response = await request
            .get('/api/v1/forecast/london')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72')
    expect(response.body.city).toEqual('London')
    expect(response.body.country).toEqual('GB')
    expect(response.body.forecast).toEqual(expect.any(Array))
  })

  it('should return 404 when city is not valid', async () => {
    const response = await request
            .get('/api/v1/forecast/invalid')
            .set('Accept', 'application/json')
            .set('X-Forwarded-For', '190.194.12.72')

    expect(response.status).toEqual(404)
    expect(response.body).toEqual({ message: 'City not found' })
  })

  afterAll(() => job.close())
})
