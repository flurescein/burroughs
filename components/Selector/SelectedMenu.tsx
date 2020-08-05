interface SelectedMenuProps {
  appearanceDuration?: number
  style?: React.CSSProperties
}

export default (function SelectedMenu({
  appearanceDuration = 0.4,
  style,
  children
}) {
  return (
    <div style={style}>
      {children}
      <style jsx>{`
        div {
          box-shadow: 0px 9px 21px rgba(0, 0, 0, 0.25);
          border-radius: 16px;
          animation: appear ${appearanceDuration}s;
          background: white;
          cursor: pointer;
        }

        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
        }
      `}</style>
    </div>
  )
} as React.FC<SelectedMenuProps>)
