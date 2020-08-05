interface ItemProps {
  id?: number
  title?: string
  selected?: boolean
  dashed?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function Item({
  title,
  selected = false,
  dashed = false,
  onClick,
  onDoubleClick
}: ItemProps) {
  return (
    <div onClick={onClick} onDoubleClick={onDoubleClick}>
      {title}
      <style jsx>{`
        div {
          user-select: none;
          border: ${dashed ? 'dashed' : 'solid'} 2px
            ${selected ? 'black' : '#e9e9e9'};
          font-size: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          border-radius: 15px;
        }

        div:hover {
          border-color: ${selected ? 'black' : '#dadada'};
        }

        div:not(:only-child) {
          height: 100px;
          overflow: hidden;
          padding: 20px;
          box-sizing: border-box;
        }

        div:only-child {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}
