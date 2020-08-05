import { useCallback } from 'react'

import { addMessageFx } from '../stores/messages'
import { putTextFx } from '../stores/texts'

const titleSliceLenght = 20

const prepareToSave = (title: string, text: string) => ({
  title: title || text.slice(0, titleSliceLenght),
  text,
  changed: new Date()
})

export default function useSaveAndResave(
  title: string,
  text: string,
  id: number
) {
  const save = useCallback(() => {
    if (text === '') {
      addMessageFx({ text: 'Зачем сохранять то, чего нет?' })
    } else {
      putTextFx(prepareToSave(title, text))
      addMessageFx({ text: 'Сохранено' })
    }
  }, [title, text])

  const resave = useCallback(() => {
    if (text === '') {
      addMessageFx({ text: 'Ты уничтожил нарезку. Я не буду это сохранять.' })
    } else {
      putTextFx({
        id,
        ...prepareToSave(title, text)
      })
      addMessageFx({ text: 'Изменения сохранены' })
    }
  }, [title, text])

  return { save, resave }
}
