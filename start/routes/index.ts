import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './uploads'
import './posts'
import './reactions'
import './comments'
import './follows'
import './conversation'
import './profiles'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.on('/test').render('test')

// Route.get('/user-register', async ({ view }) => {
//   return view.render('emails/register')
// })
