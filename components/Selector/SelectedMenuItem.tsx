interface SelectedMenuItemProps {
  src: string
  active?: boolean
  onClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

export default function SelectedMenuItem({
  src,
  active = true,
  onClick
}: SelectedMenuItemProps) {
  return (
    <>
      <img src={src} onClick={active ? onClick : undefined} />
      <style jsx>{`
        img {
          user-select: none;
          height: 25px;
          padding: 20px;
          vertical-align: middle;
          background: white;
          user-drag: none;
          ${active || `opacity: 0.3;`}
          transition: opacity 0.2s;
        }

        img:first-child {
          border-radius: 16px 0 0 16px;
        }

        img:last-child {
          border-radius: 0 16px 16px 0;
        }

        img:hover {
          background: #e9e9e9;
        }

        img:active {
          filter: ${active ? 'invert()' : 'none'};
        }
      `}</style>
    </>
  )
}
