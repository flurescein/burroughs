export default (function HeaderButtonsContainer({ children }) {
  return (
    <>
      <nav>{children}</nav>
      <style jsx>{`
        nav {
          white-space: nowrap;
          margin-left: 8px;
        }
      `}</style>
    </>
  )
} as React.FC)
