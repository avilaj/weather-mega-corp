/* global jest describe it expect */

const weather = require('./weather')
const { getWeatherByCity } = require('./endpoints')
jest.mock('./endpoints', () => ({ getWeatherByCity: jest.fn() }))

describe('weather', () => {
  const next = jest.fn()
  const res = {
    locals: {},
    status: jest.fn(),
    json: jest.fn()
  }

  it('fails when city is has not been resolved', async () => {
    const req = {
    }
    await weather(req, res, next)
    expect(res.status).toBeCalledWith(500)
  })

  it('fails with error 404 when getWeatherByCity fails', async () => {
    getWeatherByCity.mockReturnValueOnce(Promise.reject({ response: { status: 404 } }))
    const req = {
    }
    const _res = {
      ...res,
      locals: {
        city: 'Belen'
      }
    }
    await weather(req, _res, next)
    expect(res.status).toBeCalledWith(404)
  })

  it('returns whatever getWeatherByCity returns when city has been resolved', async () => {
    const data = { response: { status: 200 } }
    getWeatherByCity.mockReturnValueOnce(Promise.resolve(data))
    const req = {}
    const _res = {
      ...res,
      locals: {
        city: 'Belen'
      }
    }

    await weather(req, _res, next)
    expect(res.json).toBeCalledWith(data)
  })
})
