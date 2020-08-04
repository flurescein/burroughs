import { NextPage } from 'next'
import { useStore } from 'effector-react'

import {
  $editedText,
  setTitle,
  setText,
  cutupText,
  fetchTextFx
} from '../stores/editedText'

import TextInput from '../components/Editor/TextInput'
import IconedButton from '../components/Editor/IconedButton'
import { useEffect } from 'react'

interface EditorProps {
  id?: number
}

const editor: NextPage<EditorProps> = ({ id }) => {
  useEffect(() => {
    fetchTextFx(id)
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

editor.getInitialProps = async ({ query: { id: idQuery } }) => {
  const id = Number(idQuery) || undefined

  return { id }
}

export default editor
