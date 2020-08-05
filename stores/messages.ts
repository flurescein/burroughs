import { createStore, createApi, createEffect, combine } from 'effector'
import { OrderedMap } from 'immutable'

let nextID = 0

const getUniqueId = () => nextID++

const $messagesMap = createStore<OrderedMap<number, string>>(OrderedMap())

export const { addMessage, deleteMessage, clearMessages } = createApi(
  $messagesMap,
  {
    addMessage: (messages, { id, text }: { id: number; text: string }) =>
      messages.set(id, text),
    deleteMessage: (messages, id: number) => messages.delete(id),
    clearMessages: messages => messages.clear()
  }
)

export const addMessageFx = createEffect({
  handler({ text, lifetame = 5000 }) {
    const id = getUniqueId()
    addMessage({ id, text })
    setInterval(() => deleteMessage(id), lifetame)
  }
})

export const $messages = combine($messagesMap, messages =>
  messages.toArray().map(([_, message]) => message)
)
