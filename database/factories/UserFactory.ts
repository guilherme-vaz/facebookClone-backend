/* eslint-disable prettier/prettier */
import { User } from 'App/Models'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { PostFactory } from './PostFactory'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})
  .relation('posts', () => PostFactory)
  .build()
