import { useRef, useEffect } from 'react'

interface TextInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  autofocus?: boolean
}

export default function TextInput({
  value,
  onChange,
  autofocus = false,
  placeholder
}: TextInputProps) {
  const ref = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    if (autofocus) {
      ref.current.focus()
    }
  }, [])

  return (
    <>
      <textarea {...{ ref, value, onChange, placeholder }} />
      <style jsx>{`
        textarea {
          border: none;
          outline: none;
          font-size: 20px;
          resize: none;
          height: 100%;
          padding-bottom: 150px;
        }

        textarea::placeholder {
          color: #7e7e7e;
        }
      `}</style>
    </>
  )
}
