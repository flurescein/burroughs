import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'

import { fetchTextsFx } from '../stores/texts'
import { setSelected, deselectAll } from '../stores/selected'
import { $selectedTexts, cutupSelected } from '../stores/selectedTexts'
import { withAlt } from '../lib/keyPressed'
import { clearMessages } from '../stores/messages'

import MainLayout from '../components/MainLayout'
import Header from '../components/Header'
import HeaderButtonsContaiter from '../components/Header/HeaderButtonsContaiter'
import HeaderButton from '../components/Header/HeaderButton'
import IconedButton from '../components/Editor/IconedButton'
import useSaveAndResave from '../lib/useSaveAndResave'
import TitleInput from '../components/Editor/TitleInput'
import Messenger from '../components/Messenger'

interface MultitextProps {
  ids?: number[]
}

const Multitext: NextPage<MultitextProps> = ({ ids }) => {
  const { push } = useRouter()

  useEffect(() => {
    if (ids === null) {
      push('/')
    }
  }, [])

  useEffect(() => {
    fetchTextsFx()
    setSelected(ids)
  }, [])

  const selectedTexts = useStore($selectedTexts)

  useEffect(() => {
    const cutupOnAltR = withAlt(82, () => cutupSelected())

    document.addEventListener('keydown', cutupOnAltR)
    return () => removeEventListener('keydown', cutupOnAltR)
  }, [])

  useEffect(() => () => clearMessages(), [])

  const [title, setTitle] = useState('')

  const { save } = useSaveAndResave(title, selectedTexts, null)

  return (
    <>
      <MainLayout>
        <Header>
          <TitleInput
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
          <HeaderButtonsContaiter>
            <HeaderButton
              src="icons/save.svg"
              title="Сохранить"
              onClick={save}
            />
            <HeaderButton
              src="icons/archive.svg"
              title="К списку нарезок"
              onClick={() => {
                push('/')
                deselectAll()
              }}
            />
          </HeaderButtonsContaiter>
        </Header>
        <div className="text">
          {selectedTexts.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <IconedButton
          src="icons/cut.svg"
          title="Alt+R"
          onClick={() => cutupSelected()}
          style={{ position: 'fixed', bottom: '50px', alignSelf: 'flex-end' }}
        />
        <Messenger
          style={{ alignSelf: 'center', position: 'fixed', bottom: '15px' }}
        />
      </MainLayout>
      <style jsx>{`
        .text {
          font-size: 20px;
        }

        .text p {
          margin: 5px 0;
        }
      `}</style>
    </>
  )
}

Multitext.getInitialProps = async ({ query: { ids: idsString } }) => {
  try {
    const ids = JSON.parse(idsString as string) as number[]
    return { ids }
  } catch {
    return { ids: null }
  }
}

export default Multitext
