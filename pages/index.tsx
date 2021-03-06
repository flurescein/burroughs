import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'

import { deselectAll, $selected } from '../stores/selected'
import {
  fetchTextsFx,
  deleteSelectedFx,
  $textsCount,
  $isTextsFetced
} from '../stores/texts'

import MainLayout from '../components/MainLayout'
import Header from '../components/Header'
import HeaderButtonsContaiter from '../components/Header/HeaderButtonsContaiter'
import Texts from '../components/Selector/Texts'
import SelectedMenu from '../components/Selector/SelectedMenu'
import SelectedMenuItem from '../components/Selector/SelectedMenuItem'
import HeaderButton from '../components/Header/HeaderButton'
import Description from '../components/Description'
import Logo from '../components/Logo'

export default function Index() {
  useEffect(() => {
    fetchTextsFx()
  }, [])

  const { push } = useRouter()

  const selected = useStore($selected)
  const isTextsFetched = useStore($isTextsFetced)
  const textsCount = useStore($textsCount)

  return (
    <MainLayout>
      <Header>
        <Logo />
        <HeaderButtonsContaiter>
          <HeaderButton
            src="icons/add.svg"
            onClick={() => {
              deselectAll()
              push('/editor')
            }}
            title="Создать новую нарезку"
          />
        </HeaderButtonsContaiter>
      </Header>
      {isTextsFetched ? textsCount > 0 ? <Texts /> : <Description /> : null}
      {selected.count() > 0 && (
        <SelectedMenu
          style={{ position: 'fixed', alignSelf: 'center', bottom: '50px' }}
        >
          <SelectedMenuItem
            active={selected.count() === 1}
            title="Редактировать"
            onClick={() => {
              push(`/editor?id=${selected.first()}`)
              deselectAll()
            }}
            src="icons/edit.svg"
          />
          <SelectedMenuItem
            active={selected.count() > 1}
            src="icons/cut.svg"
            title="Нарезать несколько"
            onClick={() => {
              push(`/multitext?ids=[${selected.toArray()}]`)
            }}
          />
          <SelectedMenuItem
            src="icons/trash.svg"
            title="Удалить"
            onClick={() => {
              deleteSelectedFx()
              deselectAll()
              fetchTextsFx()
            }}
          />
        </SelectedMenu>
      )}
    </MainLayout>
  )
}
