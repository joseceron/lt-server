import path from 'path'
import * as dotenv from 'dotenv'
import { LiteThinkingBackendApp } from './LiteThinkingBackendApp'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  new LiteThinkingBackendApp().start()
} catch (error) {
  console.log(error)
}
