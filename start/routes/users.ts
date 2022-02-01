/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')
Route.put('/users/register', 'Users/Register.update')

// Como o USUÁRIO pode recuperar a senha as rotas de recuperação vão aqui nas rotas de users
Route.post('/users/forgot-password', 'Users/ForgotPassword.store')
Route.get('/users/forgot-password/:key', 'Users/ForgotPassword.show')
Route.put('/users/forgot-password', 'Users/Register.update')


Route.get('/users', 'Users/Main.show').middleware('auth')
Route.put('/users', 'Users/Main.update').middleware('auth')

Route.put('/users/avatar', 'Users/Avatar.update').middleware('auth')
Route.delete('/users/avatar', 'Users/Avatar.destroy').middleware('auth')

Route.get('/users/search', 'Users/Search.index')