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

    setTimeout(() => {
      // TODO Handle Submit information with api
      fetch('localhost:3000/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo),
      })
        .then(() => {
          clearName()
          clearEmail()
          clearMessage()

          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          alert('Something went wrong, try again later.')
        })
    }, 1000)
  }

  return { bindName, bindEmail, bindMessage, loading, handleSubmit }
}

export default useContactForm
