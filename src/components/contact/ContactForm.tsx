import { Icon } from '@iconify/react'
import { LoadingIcon } from '@icons'
import useContactForm from 'hooks/useContactForm'

const ContactForm = () => {
  const { bindName, bindEmail, bindMessage, loading, handleSubmit } =
    useContactForm()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      className="w-full space-y-12 md:max-w-[85%] lg:max-w-lg md:mt-10 lg:mt-24 md:p-0 lg:mr-10 "
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
          value={bindName.value}
          onChange={bindName.onChange}
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
          value={bindEmail.value}
          onChange={bindEmail.onChange}
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
          value={bindMessage.value}
          onChange={bindMessage.onChange}
        />
      </div>
      <div className="flex min-w-full">
        {!loading ? (
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
              loading ? 'disabled' : ''
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
