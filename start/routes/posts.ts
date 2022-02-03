/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.resource('/posts', 'Posts/Main')
  .apiOnly()
  .except(['show'])
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth']
  })

  Route.post('/posts/:id/media', 'Posts/Media.store').middleware('auth')
