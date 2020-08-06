export default (function Header({ children }) {
  return (
    <>
      <header>{children}</header>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          width: 100%;
        }
      `}</style>
    </>
  )
} as React.FC)
