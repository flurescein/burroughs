import { useRouter } from 'next/router'
import { useList } from 'effector-react'

import Item from './Item'
import { $textsWithSelection } from '../../stores/textsWithSelection'
import { select, deselect } from '../../stores/selected'

export default function Selector() {
  const { push } = useRouter()

  return (
    <div className="selector">
      <header>
        <span className="logo">Берроуз</span>
      </header>
      <div className="selection-items">
        {useList($textsWithSelection, ({ id, title, text, selected }) => (
          <Item
            {...{ id, selected }}
            title={title.length > 20 ? `${title.slice(0, 20)}...` : title}
            onClick={() => (selected ? deselect(id) : select(id))}
            onDoubleClick={() => push(`/editor?id=${id}`)}
          />
        ))}
        <Item title="+" dashed onClick={() => push('/editor')} />
      </div>
      <style jsx>{`
        .selector {
          display: flex;
          flex-direction: column;
          max-width: 800px;
          margin: auto;
          padding: 0 20px;
        }

        header {
          margin-top: 25px;
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
