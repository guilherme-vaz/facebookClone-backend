/* eslint-disable prettier/prettier */
// import test from 'japa'
// import supertest from 'supertest'

// const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

// test.group('Example', () => {
//   test('ensure the root route works', async (assert) => {
//     const { body } = await supertest(BASE_URL).get('/')
//     assert.exists(body.hello)
//     assert.equal(body.hello, 'hello')
//   })
// })

import test from 'japa'
import { request } from 'Test/utils'
import { UserFactory, PostFactory } from 'Database/factories'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Example', (group) => {
  // Antes de cada teste
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  // Depois de cada teste faz um rollback
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  // Test for login/auth
  test('ensure the login works', async (assert) => {
    // Creating the user before testing
    const user = await UserFactory.merge({ password: 'secret' }).with('posts', 5).create()
   

    const { body, status } = await request.post('/auth').send({
      email: user.email,
      password: 'secret'
    })

    assert.equal(status, 200)
    assert.exists(body.token)
  })
})
