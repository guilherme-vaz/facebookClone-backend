/* eslint-disable prettier/prettier */
// Definindo estratégia de nomeação globalmente, esse arquivo vai ser carregado quando o projeto iniciar.
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'

BaseModel.namingStrategy.serializedName = (_model, key) => {
  return string.camelCase(key)
}
