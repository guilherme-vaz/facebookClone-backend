/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.put('/reactions', 'Reaction/Main.update').middleware('auth')
Route.delete('/reactions/:id', 'Reaction/Main.destroy').middleware('auth')
