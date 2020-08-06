import { createStore, createApi, createEffect, combine } from 'effector'
import { OrderedMap } from 'immutable'

interface Message {
  text: string
  shouldDisappear: boolean
}

let nextID = 0

const getUniqueId = () => nextID++

const $messagesMap = createStore<OrderedMap<number, Message>>(OrderedMap())

export const {
  addMessage,
  deleteMessage,
  disappearMessage,
  clearMessages
} = createApi($messagesMap, {
  addMessage: (messages, { id, text }: { id: number; text: string }) =>
    messages.set(id, { text, shouldDisappear: false }),
  deleteMessage: (messages, id: number) => messages.delete(id),
  disappearMessage: (messages, id: number) => {
    const message = messages.get(id)

    return message
      ? messages.set(id, {
          text: message.text,
          shouldDisappear: true
        })
      : messages
  },
  clearMessages: messages => messages.clear()
})

export const addMessageFx = createEffect({
  handler({ text, lifetame = 5000, disappear = 1000 }) {
    const id = getUniqueId()
    addMessage({ id, text })
    setTimeout(() => disappearMessage(id), lifetame - disappear)
    setTimeout(() => deleteMessage(id), lifetame)
  }
})

export const $messages = combine($messagesMap, messages =>
  messages.toArray().map(([_, message]) => message)
)
