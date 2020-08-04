import { createStore, createApi, createEffect } from 'effector'

import Text from '../lib/Text'
import cutup from '../lib/cutup'
import { createConnection } from '../lib/database'

export const $editedText = createStore<Text>({
  title: '',
  text: ''
})

export const { setTitle, setText, cutupText } = createApi($editedText, {
  setTitle: (state, title: string) => ({ ...state, title }),
  setText: (state, text: string) => ({ ...state, text }),
  cutupText: state => ({ ...state, text: cutup(state.text) })
})

export const fetchTextFx = createEffect({
  async handler(id: number) {
    const db = await createConnection()
    return await db.get('texts', id)
  }
})

$editedText
  .on(fetchTextFx.done, (_, { result }) => result)
  .on(fetchTextFx.fail, () => ({ title: '', text: '' }))
