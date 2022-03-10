/* eslint-disable prettier/prettier */
import 'reflect-metadata'
import { join } from 'path'
import execa from 'execa'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'

process.env.NODE_ENV = 'testing'
process.env.MYSQL_DB_NAME = 'testing'
// A linha de baixo serve para parar de exibir coisas não necessárias no terminal durante testes
process.env.LOG_LEVEL = 'fatal'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

// Function to run migrations on our test DB
async function runMigrations() {
  await execa.node('ace', ['migration:run']) //node ace migration:run
}

// Function to run a rollback on our test DB migrations 
async function rollbackMigrations() {
  await execa.node('ace', ['migration:rollback']) //node ace migration:run
}

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

/**
 * Configure test runner
 */
configure({
  files: ['test/specs/**/*.spec.ts'],
  before: [runMigrations, startHttpServer],
  after: [rollbackMigrations]
})
