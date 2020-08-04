import { CSSProperties } from 'react'

interface IconedButtonProps {
  title?: string
  src: string
  alt?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  height?: string
  padding?: string
  style?: CSSProperties
}

export default function IconedButton({
  title,
  src,
  alt,
  onClick,
  height = '25px',
  padding = '15px 20px',
  style
}: IconedButtonProps) {
  return (
    <>
      <button {...{ title, onClick, style }}>
        <img {...{ src, alt }} />
      </button>
      <style jsx>{`
        button {
          padding: ${padding};
          border: none;
          background: white;
          border-radius: 18px;
          box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.25);
          outline: 0;
          cursor: pointer;
        }

        button:active {
          box-shadow: none;
          transform: translateY(2px);
          box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        }

        img {
          user-select: none;
          height: ${height};
        }
      `}</style>
    </>
  )
}
