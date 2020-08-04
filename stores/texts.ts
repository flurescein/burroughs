import { createStore, createEffect, combine } from 'effector'

import Text from '../lib/Text'
import { createConnection } from '../lib/database'

export const $texts = createStore<Text[]>([])

export const fetchTextsFx = createEffect({
  async handler() {
    const db = await createConnection()
    return db.getAll('texts')
  }
})

$texts
  .on(fetchTextsFx.done, (_, { result }) => result)
  .on(fetchTextsFx.fail, console.log)

export const putTextFx = createEffect({
  async handler(text: Text) {
    const db = await createConnection()
    await db.put('texts', text)
  }
})
