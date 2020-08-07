interface TitleInputProps {
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TitleInput({
  placeholder = 'Берроуз',
  value,
  onChange
}: TitleInputProps) {
  return (
    <>
      <input type="text" {...{ placeholder, value, onChange }} />
      <style jsx>{`
        input {
          border: none;
          outline: none;
          font-size: 30px;
          font-weight: 500;
          width: 100%;
          padding: 0;
        }

        input::placeholder {
          color: #7e7e7e;
        }
      `}</style>
    </>
  )
}
