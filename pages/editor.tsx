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
import { clearMessages } from '../stores/messages'
import useSaveAndResave from '../lib/useSaveAndResave'

import MainLayout from '../components/MainLayout'
import Header from '../components/Header'
import TextInput from '../components/Editor/TextInput'
import IconedButton from '../components/Editor/IconedButton'
import HeaderButton from '../components/Header/HeaderButton'
import Messenger from '../components/Messenger'
import HeaderButtonsContaiter from '../components/Header/HeaderButtonsContaiter'

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
    <MainLayout>
      <Header>
        <input
          type="text"
          placeholder="Берроуз"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <HeaderButtonsContaiter>
          <HeaderButton src="icons/save.svg" title="Сохранить" onClick={save} />
          {id && (
            <HeaderButton
              src="icons/resave.svg"
              title="Перезаписать"
              onClick={resave}
            />
          )}
          <HeaderButton
            src="icons/archive.svg"
            title="К списку нарезок"
            onClick={() => push('/')}
          />
        </HeaderButtonsContaiter>
      </Header>
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
    </MainLayout>
  )
}

Editor.getInitialProps = async ({ query: { id: idQuery } }) => {
  const id = Number(idQuery) || undefined

  return { id }
}

export default Editor
