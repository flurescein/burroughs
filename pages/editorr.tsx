import { useRouter } from 'next/router'
import { useStore } from 'effector-react'

import { $texts } from '../stores/texts'
import {
  $editedText,
  setTitle,
  setText,
  cutupText,
  openText,
  newText
} from '../stores/editedText'

import TextInput from '../components/Editor/TextInput'
import IconedButton from '../components/Editor/IconedButton'
import { useEffect } from 'react'

export default function editor() {
  const {
    query: { id: idQuery }
  } = useRouter()

  const id = Number(idQuery)

  const texts = useStore($texts)

  useEffect(() => {
    const textWithId = texts.find(text => text.id === id)
    console.log(id, textWithId)

    if (textWithId !== undefined) {
      openText(textWithId)
    } else {
      newText()
    }
  }, [])

  const { title, text } = useStore($editedText)

  return (
    <div className="editor">
      <header>
        <input
          type="text"
          placeholder="Берроуз"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <nav>Hey</nav>
      </header>
      <TextInput
        placeholder="Текст для нарезки"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        autofocus
      />
      <IconedButton
        src="cut.svg"
        title="Cut-up"
        onClick={() => cutupText()}
        style={{ position: 'fixed', bottom: '50px', alignSelf: 'flex-end' }}
      />
      <style jsx>{`
        .editor {
          display: flex;
          flex-direction: column;
          margin: auto;
          padding: 0 20px;
          max-width: 800px;
          height: 100%;
        }

        header {
          margin-top: 25px;
          margin-bottom: 15px;
          display: flex;
          width: 100%;
        }

        input {
          border: none;
          outline: none;
          font-size: 30px;
          font-weight: 500;
          width: 100%;
          padding: 0;
        }

        input::placeholder {
          color: #7e7e7e;
        }
      `}</style>
    </div>
  )
}
