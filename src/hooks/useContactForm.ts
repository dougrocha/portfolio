import { ChangeEvent, useState } from 'react'

import useInput from './useInput'

interface BindObj {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

interface IUseContactForm {
  bindName: BindObj
  bindEmail: BindObj
  bindMessage: BindObj
  loading: boolean
  handleSubmit: () => void
}

const useContactForm = (): IUseContactForm => {
  const [name, bindName, clearName] = useInput('')
  const [email, bindEmail, clearEmail] = useInput('')
  const [message, bindMessage, clearMessage] = useInput('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)

    const contactInfo = { name, email, message }

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactInfo),
    })
      .then(res => {
        if (res.status === 200) {
          clearName()
          clearEmail()
          clearMessage()

          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
        alert('Something went wrong, try again later.')
      })
  }

  return { bindName, bindEmail, bindMessage, loading, handleSubmit }
}

export default useContactForm
