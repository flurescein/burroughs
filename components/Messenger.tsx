import { useList } from 'effector-react'

import { $messages } from '../stores/messages'

interface MessengerProps {
  style?: React.CSSProperties
}

export default function Messenger({ style }: MessengerProps) {
  return (
    <>
      <ul style={style}>
        {useList($messages, ({ text, shouldDisappear }) => (
          <li className={shouldDisappear && 'disappear'}>{text}</li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          display: flex;
          margin: 0;
          padding: 0;
          list-style-type: none;
          flex-direction: column;
          align-items: center;
          transition: height 1s;
        }

        li {
          background: black;
          color: white;
          margin-bottom: 10px;
          padding: 15px 20px;
          border-radius: 15px;
          animation: appear 1s;
        }

        li.disappear {
          animation: disappear 1s forwards;
        }

        li:last-child {
          margin-bottom: 0;
        }

        @keyframes appear {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
        }

        @keyframes disappear {
          to {
            transform: translateY(-10px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
