'use strict';

const supertest = require('supertest');
const {app} = require('../server');
const req = supertest(app);

describe('Server test', () => {
    it('Handel not found pages', async () => {
    const res = await req.get('/items');
    expect(res.status).toEqual(404);
    });

    it('Handle the root path', async () => {
    const res = await req.get('/');
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Welcome to Home page')
    })

    it('Handle errors', async () => {
    const res = await req.get('/bad');
    expect(res.status).toEqual(500);
    expect(res.body.route).toEqual('/bad');
    })
})