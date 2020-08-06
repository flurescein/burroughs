import { useRouter } from 'next/router'
import { useList } from 'effector-react'

import { $preparedTexts } from '../../stores/preparedTexts'
import { deselect, select, deselectAll } from '../../stores/selected'

import Item from './Item'

export default function Items() {
  const { push } = useRouter()

  return (
    <>
      <main>
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
      </main>
      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          grid-row-gap: 20px;
          grid-column-gap: 20px;
        }
      `}</style>
    </>
  )
}
