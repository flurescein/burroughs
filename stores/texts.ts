import { createStore, createEffect, combine, createEvent } from 'effector'

import Text from '../lib/Text'
import { createConnection } from '../lib/database'
import { $selected } from './selected'

export const $texts = createStore<Text[]>([])

export const fetchTextsFx = createEffect({
  async handler() {
    const db = await createConnection()
    return db.getAll('texts')
  }
})

$texts.on(fetchTextsFx.done, (_, { result }) => result)

export const putTextFx = createEffect({
  async handler(text: Text) {
    const db = await createConnection()
    await db.put('texts', text)
  }
})

export const deleteTextFx = createEffect({
  async handler(id: number) {
    const db = await createConnection()
    await db.delete('texts', id)
  }
})

export const deleteSelectedFx = createEffect({
  async handler() {
    $selected.getState().map(id => deleteTextFx(id))
  }
})
