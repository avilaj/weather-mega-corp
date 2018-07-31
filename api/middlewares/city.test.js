const { getClientIp } = require('request-ip');
const middleware = require('./city');
const { getLocationByIp } = require('../endpoints');

jest.mock('request-ip', () => ({ getClientIp: jest.fn() }));
jest.mock('../endpoints', () => ({ getLocationByIp: jest.fn() }));

describe('city middleware', () => {
    const next = jest.fn();
    const res = {
        locals: {},
        status: jest.fn(),
        json: jest.fn()
    };
    
    it('passes to error handler when an error occurs', async () => {
        const req = {};
        await middleware(req, res, next);
        expect(next).toBeCalledWith(expect.any(Error));
    });

    it('replaces dashes from city param', async () => {
        const req = {
            params: {},
            query: {
                city: 'some-dashes'
            }
        };
        const _res = {
            locals: {},
        }
        await middleware(req, _res, next);
        expect(_res.locals.city).toEqual('some dashes');
    });

    it('gets ip from header when city is not sent', async () => {
        const ip = '192.168.0.1';
        getClientIp.mockReturnValueOnce(ip);
        getLocationByIp.mockReturnValueOnce(Promise.resolve({ city: 'stockholm' }));

        const req = {
            params: {},
            query: {}
        };
        const _res = {
            locals: {},
        }

        await middleware(req, _res, next);
        expect(getLocationByIp).toBeCalledWith(ip);
        expect(_res.locals.city).toEqual('stockholm');
    });
});