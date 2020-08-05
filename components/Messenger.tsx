import { useList } from 'effector-react'

import { $messages } from '../stores/messages'

interface MessengerProps {
  style?: React.CSSProperties
}

export default function Messenger({ style }: MessengerProps) {
  return (
    <>
      <ul style={style}>
        {useList($messages, message => (
          <li>{message}</li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          margin: 0;
          list-style-type: none;
          padding: 0;
          transition: height 1s;
          text-align: center;
        }

        li {
          transition: width 1s;
          display: block;
          background: black;
          color: white;
          margin: 10px 0;
          padding: 15px 20px;
          border-radius: 15px;
          animation: appear 1s;
        }

        li:first-child {
          margin-top: 0;
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
      `}</style>
    </>
  )
}
