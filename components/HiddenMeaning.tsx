import { useState } from 'react'

interface HiddenMeaningProps {
  trueMeaning: string
  titles?: { true: string; false: string }
}

export default (function HiddenMeaning({
  children,
  trueMeaning,
  titles = { true: 'Скрыть правду', false: 'Показать правду' }
}) {
  const [showMeaning, setShowMeaning] = useState(false)

  return (
    <>
      <span
        className={showMeaning ? 'real-meaning' : 'hidden-meaning'}
        onClick={() => setShowMeaning(!showMeaning)}
        title={showMeaning ? titles.true : titles.false}
      >
        {showMeaning ? trueMeaning : children}
      </span>
      <style jsx>{`
        span {
          cursor: pointer;
        }

        .hidden-meaning {
          border-bottom: 1px #515a5a dashed;
          text-decoration: none;
          color: #626567;
        }

        .real-meaning {
          background: black;
          color: white;
          padding: 0 4px;
        }
      `}</style>
    </>
  )
} as React.FC<HiddenMeaningProps>)
