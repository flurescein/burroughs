import { useRouter } from 'next/router'
import { useList, useStore } from 'effector-react'
import { useEffect } from 'react'

import { $preparedTexts } from '../stores/preparedTexts'
import { select, deselect, deselectAll, $selected } from '../stores/selected'
import { fetchTextsFx, deleteSelectedFx } from '../stores/texts'

import Item from '../components/Selector/Item'
import SelectedMenu from '../components/Selector/SelectedMenu'
import SelectedMenuItem from '../components/Selector/SelectedMenuItem'

export default function Index() {
  const { push } = useRouter()

  useEffect(() => {
    fetchTextsFx()
  }, [])

  const selected = useStore($selected)

  return (
    <div className="selector">
      <header>
        <span className="logo">Берроуз</span>
      </header>
      <div className="selection-items">
        {useList($preparedTexts, ({ id, title, selected }) => (
          <Item
            {...{ id, selected }}
            title={title.length > 20 ? `${title.slice(0, 20)}...` : title}
            onClick={() => (selected ? deselect(id) : select(id))}
            onDoubleClick={() => {
              deselectAll()
              push(`/editor?id=${id}`)
            }}
          />
        ))}
        <Item
          title="+"
          dashed
          onClick={() => {
            deselectAll()
            push('/editor')
          }}
        />
      </div>
      {selected.count() > 0 && (
        <SelectedMenu
          style={{ position: 'fixed', alignSelf: 'center', bottom: '50px' }}
        >
          <SelectedMenuItem
            active={selected.count() === 1}
            onClick={() => {
              push(`/editor?id=${selected.first()}`)
              deselectAll()
            }}
            src="icons/edit.svg"
          />
          <SelectedMenuItem
            src="icons/trash.svg"
            onClick={() => {
              deleteSelectedFx()
              deselectAll()
              fetchTextsFx()
            }}
          />
        </SelectedMenu>
      )}
      <style jsx>{`
        .selector {
          display: flex;
          flex-direction: column;
          max-width: 800px;
          margin: auto;
          padding: 25px 20px;
        }

        header {
          margin-bottom: 15px;
        }

        .logo {
          font-size: 30px;
          font-weight: 500;
        }

        .selection-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          grid-row-gap: 20px;
          grid-column-gap: 20px;
        }
      `}</style>
    </div>
  )
}
