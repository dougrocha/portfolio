import { Icon } from '@iconify/react'
import { useState } from 'react'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, setPending] = useState(false)

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()

    const contactInfo = { name, email, message }
    setPending(true)

    console.log(contactInfo)

    // TODO Handle Submit information with api
    fetch('localhost:3000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactInfo),
    })
      .then(() => {
        console.log('Added Form')
        setPending(false)
      })
      .catch(() => {
        setPending(false)
        alert('Something went wrong, try again later.')
      })
  }

  return (
    <form
      onSubmit={e => {
        handleSubmit(e)
      }}
      className="min-w-full space-y-12 shrink md:mt-24 md:p-0 md:mr-10 md:min-w-0 md:w-96"
    >
      <div>
        <label
          className="block mb-6 text-xl font-bold text-white lowercase"
          htmlFor="name"
        >
          Name
        </label>
        <input
          required
          autoComplete="name"
          name="name"
          type="text"
          className="w-full px-4 py-4 border rounded-lg border-bg-light/25 shadow-form bg-bg "
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
        />
      </div>
      <div>
        <label
          className="block mb-6 text-xl font-bold text-white lowercase"
          htmlFor="email"
        >
          Email
        </label>
        <input
          autoComplete="email"
          required
          name="email"
          type="email"
          className="w-full px-4 py-4 border rounded-lg border-bg-light/25 shadow-form bg-bg"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <div>
        <label
          className="block mb-6 text-xl font-bold text-white lowercase"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          required
          name="message"
          className="w-full h-56 p-4 border rounded-lg resize-none border-bg-light/25 shadow-form bg-bg"
          value={message}
          onChange={e => {
            setMessage(e.target.value)
          }}
        />
      </div>
      <div className="flex min-w-full">
        {!isPending ? (
          <button
            type="submit"
            className="flex items-center justify-between px-6 py-2 ml-0 font-bold text-white w-28 bg-windowred rounded-xl md:ml-auto"
          >
            Send
            <Icon icon="akar-icons:send" color="#ffbd44" height="22" />
          </button>
        ) : (
          <button
            type="submit"
            className="flex items-center justify-between px-6 py-2 ml-0 font-bold text-white w-28 bg-windowred rounded-xl md:ml-auto"
          >
            Loading...
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm
