import HeaderButton from './HeaderButton'
import { addMessageFx } from '../../stores/messages'
import { useEffect } from 'react'
import { withAlt } from '../../lib/keyPressed'

interface CopyToClipboardButtonProps {
  text: string
}

export default function CopyToClipboardButton({
  text
}: CopyToClipboardButtonProps) {
  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      addMessageFx({ text: 'Скопировано' })
    } catch {
      addMessageFx({ text: 'Не могу скопировать этот текст' })
    }
  }

  useEffect(() => {
    const copyOnAltC = withAlt(67, () => {
      copyTextToClipboard()
    })

    document.addEventListener('keydown', copyOnAltC)
    return () => document.removeEventListener('keydown', copyOnAltC)
  })

  return (
    <HeaderButton
      src="icons/copy.svg"
      title="Копировать в буфер обмена (Alt+C)"
      onClick={copyTextToClipboard}
    />
  )
}
