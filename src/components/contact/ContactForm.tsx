import { Icon } from '@iconify/react'
import { LoadingIcon } from '@icons'
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
    fetch('localhost:3000/contact-form', {
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
      id="contact-form"
      className="w-full space-y-12 md:max-w-[85%] lg:max-w-lg md:mt-10 lg:mt-24 md:p-0 lg:mr-10 scroll-smooth"
    >
      <div className="flex flex-col w-full">
        <label className="mb-6 text-xl font-bold text-white " htmlFor="name">
          Name
        </label>
        <input
          required
          autoComplete="name"
          name="name"
          type="text"
          className="w-full px-4 py-4 border rounded-lg border-bg-light/25 shadow-form bg-bg brightness-110 "
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-6 text-xl font-bold text-white" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          required
          name="email"
          type="email"
          className="w-full px-4 py-4 border rounded-lg border-bg-light/25 shadow-form bg-bg brightness-110"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="mb-6 text-xl font-bold text-white" htmlFor="message">
          Message
        </label>
        <textarea
          required
          name="message"
          className="w-full h-56 p-4 border rounded-lg resize-none border-bg-light/25 shadow-form bg-bg brightness-110"
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
            className="flex items-center justify-between px-6 py-2 ml-0 font-bold text-white w-28 bg-windowred rounded-xl sm:ml-auto"
          >
            Send
            <Icon icon="akar-icons:send" color="#ffbd44" height="22" />
          </button>
        ) : (
          <button
            type="submit"
            className={`flex items-center justify-between px-6 py-2 ml-0 font-bold text-white bg-windowred rounded-xl sm:ml-auto ${
              isPending ? 'disabled' : ''
            }`}
          >
            {/* TODO Find a way to combine this div */}
            <div className="mr-2">
              <LoadingIcon height={20} />
            </div>
            Pending...
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm
