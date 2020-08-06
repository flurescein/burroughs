export default (function MainLayout({ children }) {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          max-width: 880px;
          margin: auto;
          padding: 25px 20px;
          min-height: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
} as React.FC)
