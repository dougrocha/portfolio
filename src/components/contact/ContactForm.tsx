import SendButton from 'components/buttons/send'
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
      className="flex flex-col w-full space-y-12 lg:max-w-lg md:mt-10 lg:mt-24"
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
          className="w-full px-4 py-4 text-white border rounded-lg border-bg-500/25 shadow-form bg-bg-500/75 brightness-110"
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
          className="w-full px-4 py-4 text-white border rounded-lg border-bg-500/25 shadow-form bg-bg-500/75 brightness-110"
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
          className="w-full h-56 p-4 text-white border rounded-lg resize-none border-bg-500/25 shadow-form bg-bg-500/75 brightness-110"
          value={bindMessage.value}
          onChange={bindMessage.onChange}
        />
      </div>
      <SendButton loading={loading} />
    </form>
  )
}

export default ContactForm
