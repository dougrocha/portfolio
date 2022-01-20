/* eslint-disable no-unused-vars */
import { ChangeEvent, useState } from 'react'

const useInput = (
  initialValue: string,
): [
  string,
  {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  },
  () => void,
] => {
  const [value, setValue] = useState(initialValue)

  const clearInput = () => {
    setValue(initialValue)
  }

  const bindInput = {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
  }

  return [value, bindInput, clearInput]
}

export default useInput
