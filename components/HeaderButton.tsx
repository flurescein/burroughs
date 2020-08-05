interface HeaderButtonProps {
  src: string
  alt?: string
  title?: string
  height?: number
  onClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

export default function HeaderButton({
  src,
  alt,
  title,
  onClick,
  height = 20
}: HeaderButtonProps) {
  return (
    <>
      <img {...{ src, alt, title, onClick }} />
      <style jsx>{`
        img {
          height: ${height}px;
          vertical-align: middle;
          padding: 8px;
          cursor: pointer;
        }

        img:hover {
          background: #e9e9e9;
        }

        img:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        img:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }

        img:active {
          filter: invert();
        }
      `}</style>
    </>
  )
}
