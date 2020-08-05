import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStore } from 'effector-react'

import {
  $editedText,
  setTitle,
  setText,
  cutupText,
  fetchTextFx
} from '../stores/editedText'
import { withAlt } from '../lib/keyPressed'

import TextInput from '../components/Editor/TextInput'
import IconedButton from '../components/Editor/IconedButton'
import HeaderButton from '../components/HeaderButton'
import Messenger from '../components/Messenger'
import { clearMessages } from '../stores/messages'
import useSaveAndResave from '../lib/useSaveAndResave'

interface EditorProps {
  id?: number
}

const Editor: NextPage<EditorProps> = ({ id }) => {
  const { push } = useRouter()

  useEffect(() => {
    fetchTextFx(id)
  }, [])

  useEffect(() => {
    const cutupOnAltR = withAlt(82, () => cutupText())

    document.addEventListener('keydown', cutupOnAltR)
    return () => removeEventListener('keydown', cutupOnAltR)
  }, [])

  useEffect(() => () => clearMessages(), [])

  const { title, text } = useStore($editedText)

  const { save, resave } = useSaveAndResave(title, text, id)

  return (
    <div className="editor">
      <header>
        <input
          type="text"
          placeholder="Берроуз"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <nav>
          <HeaderButton src="icons/save.svg" title="Save" onClick={save} />
          {id && (
            <HeaderButton
              src="icons/resave.svg"
              title="Resave"
              onClick={resave}
            />
          )}
          <HeaderButton
            src="icons/archive.svg"
            title="Go to saved"
            onClick={() => push('/')}
          />
        </nav>
      </header>
      <TextInput
        placeholder="Текст для нарезки"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        autofocus
      />
      <IconedButton
        src="icons/cut.svg"
        title="Alt+R"
        onClick={() => cutupText()}
        style={{ position: 'fixed', bottom: '50px', alignSelf: 'flex-end' }}
      />
      <Messenger
        style={{ alignSelf: 'center', position: 'fixed', bottom: '15px' }}
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

        nav {
          white-space: nowrap;
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

Editor.getInitialProps = async ({ query: { id: idQuery } }) => {
  const id = Number(idQuery) || undefined

  return { id }
}

export default Editor
