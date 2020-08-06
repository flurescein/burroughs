import Link from 'next/link'
import { useState } from 'react'

interface HiddenMeaningProps {
  trueMeaning: string
  title?: string
}

const HiddenMeaning: React.FC<HiddenMeaningProps> = ({
  children,
  trueMeaning,
  title = 'Показать правду'
}) => {
  const [showMeaning, setShowMeaning] = useState(false)

  return (
    <>
      <span
        className={showMeaning ? 'real-meaning' : 'hidden-meaning'}
        onClick={() => setShowMeaning(!showMeaning)}
        title={title}
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
}

export default function Description() {
  return (
    <>
      <main>
        <p>
          Это инструмент для{' '}
          <a href="https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%BD%D0%B0%D1%80%D0%B5%D0%B7%D0%BE%D0%BA">
            нарезки текстов
          </a>{' '}
          методом Уильяма Берроуза. Он с новой стороны показывает привычные
          тексты, делает смелее и оригинальнее стихи и прозу.
        </p>
        <p>
          Нажмите на{' '}
          <Link href="/editor">
            <a className="link-icon">
              <img src="icons/add.svg" alt="«Добавить новую нарезку»" />
            </a>
          </Link>
          , чтобы начать. Нарезке поддаётся всё: от сообщений из ВК до
          произведений античных философов. Даже сквозь сухой канцелярский отчёт
          начнут проступать бесконечные потоки смыслов, скрываемые до этого{' '}
          <HiddenMeaning trueMeaning="фашистским">строгим</HiddenMeaning>{' '}
          порядком слов.
        </p>
        <p>
          Сохранённые нарезки будут появляться на этом экране. Их, в свою
          очередь, можно перемешивать между собой, получая ещё больше смыслов.
        </p>
        <p>
          Тайные знания и творческие прорывы ждут вас. Сделайте шаг им
          навстречу.
        </p>
      </main>
      <style jsx>{`
        main {
          line-height: 1.7em;
        }

        a:not(.link-icon) {
          border-bottom: 1px #d7dbdd solid;
          text-decoration: none;
          color: #626567;
        }

        a:not(.link-icon):hover {
          border-color: #dee2e3;
          color: #717d7e;
        }

        p {
          font-size: 20px;
          margin-top: 0;
        }

        .link-icon {
          height: 20px;
          border-radius: 5px;
          padding: 4px;
        }

        .link-icon > img {
          height: 20px;
          vertical-align: middle;
        }

        .link-icon:hover {
          background: #e9e9e9;
        }

        .link-icon:active {
          filter: invert();
        }
      `}</style>
    </>
  )
}
