import axios, { HttpStatusCode } from 'axios'
import { Server } from 'http';
import supertest from 'supertest'

import app from '../src/server';

const MELIItemsEmptyResponse = require('../../__mocks__/meli-items-empty-response.json')
const MELIItemsNotFoundResponse = require('../../__mocks__/meli-items-not-found-response.json')
const MELIItemsSuccessResponse = require('../../__mocks__/meli-items-success-response.json')
const MELIItemNotFoundResponse = require('../../__mocks__/meli-item-not-found-response.json')
const MELIItemSuccessResponse = require('../../__mocks__/meli-item-success-response.json')
const MELIItemDescriptionNotFoundResponse = require('../../__mocks__/meli-item-description-not-found-response.json')
const MELIItemDescriptionSuccessResponse = require('../../__mocks__/meli-item-description-success-response.json')


describe('When endpoint is called', () => {
  let request: supertest.SuperAgentTest
  let server: Server
  
  beforeEach((done) => {
    server = app.listen(done)
    request = supertest.agent(server)
    jest.clearAllMocks()
  })

  afterEach((done) => {
    server.close(done)
  })

  test('and ROUTE does not exists it should response error', async () => {
    jest.spyOn(axios, 'get').mockImplementation(async () => await Promise.resolve({}))

    const response = await request.get('/abcd')
    expect(response.status).toEqual(HttpStatusCode.NotFound)
    expect(response.type).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('meta')
    expect(response.body).toHaveProperty('response')
    expect(response.body.meta.status).toEqual(HttpStatusCode.NotFound)
    expect(response.body.meta.message).toEqual('No data found. Please make sure your input is correct and try again.')
    expect(response.body.response.success).toBeFalsy()
    expect(response.body.response.data).toBeUndefined()
  })

  test('GET /api/items without query param should response error', async () => {
    jest.spyOn(axios, 'get').mockImplementation(async () => await Promise.resolve({ data: MELIItemsEmptyResponse }))

    const response = await request.get('/api/items?q=')
    expect(response.status).toEqual(HttpStatusCode.BadRequest)
    expect(response.type).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('meta')
    expect(response.body).toHaveProperty('response')
    expect(response.body.meta.status).toEqual(HttpStatusCode.BadRequest)
    expect(response.body.meta.message).toEqual('No results matching your search criteria. Please modify your search and try again.')
    expect(response.body.response.success).toBeFalsy()
    expect(response.body.response.data).toBeUndefined()
  })

  test('GET /api/items with query param should not found data and response error', async () => {
    jest.spyOn(axios, 'get').mockImplementation(async () => await Promise.resolve({data: MELIItemsNotFoundResponse}))

    const response = await request.get('/api/items?q=carrosespaciales')
    expect(response.status).toEqual(HttpStatusCode.NotFound)
    expect(response.type).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('meta')
    expect(response.body).toHaveProperty('response')
    expect(response.body.meta.status).toEqual(HttpStatusCode.NotFound)
    expect(response.body.meta.message).toEqual('No data found. Please make sure your input is correct and try again.')
    expect(response.body.response.success).toBeFalsy()
    expect(response.body.response.data).toBeUndefined()
  })

  test('GET /api/items with query param should response data', async () => {
    jest.spyOn(axios, 'get').mockImplementation(async () => await Promise.resolve({data: MELIItemsSuccessResponse}))

    const response = await request.get('/api/items?q=celular')
    expect(response.status).toEqual(HttpStatusCode.Ok)
    expect(response.type).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('meta')
    expect(response.body).toHaveProperty('response')
    expect(response.body.meta.status).toEqual(HttpStatusCode.Ok)
    expect(response.body.meta.message).toEqual('Data found')
    expect(response.body.response.success).toBeTruthy()
    expect(response.body.response.data.author).toBeDefined()
    expect(response.body.response.data.categories.length).toBe(2)
    expect(response.body.response.data.items.length).toBe(4)
  })

  test('GET /api/items/uid with an invalid item should not found data and response error', async () => {
    jest.spyOn(axios, 'get')
      .mockImplementation(async (url: string) => 
        await Promise.resolve({data: url.includes('description') ? MELIItemDescriptionNotFoundResponse : MELIItemNotFoundResponse}))

    const response = await request.get('/api/items/MLA1234567899')
    expect(response.status).toEqual(HttpStatusCode.NotFound)
    expect(response.type).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('meta')
    expect(response.body).toHaveProperty('response')
    expect(response.body.meta.status).toEqual(HttpStatusCode.NotFound)
    expect(response.body.meta.message).toEqual('No data found. Please make sure your input is correct and try again.')
    expect(response.body.response.success).toBeFalsy()
    expect(response.body.response.data).toBeUndefined()
  })

  test('GET /api/items/uid with a valid item should response data', async () => {
    jest.spyOn(axios, 'get')
      .mockImplementation(async (url: string) => 
        await Promise.resolve({data: url.includes('description') ? MELIItemDescriptionSuccessResponse : MELIItemSuccessResponse}))

    const response = await request.get('/api/items/MLA1184760504')
    expect(response.status).toEqual(HttpStatusCode.Ok)
    expect(response.type).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('meta')
    expect(response.body).toHaveProperty('response')
    expect(response.body.meta.status).toEqual(HttpStatusCode.Ok)
    expect(response.body.meta.message).toEqual('Data found')
    expect(response.body.response.success).toBeTruthy()
    expect(response.body.response.data.author).toBeDefined()
    expect(response.body.response.data.item.id).toBe('MLA1184760504')
  })
})
