import useContactForm from 'hooks/useContactForm'
import { DominoSpinner } from 'react-spinners-kit'
import TextAreaAutosize from 'react-textarea-autosize'

const ContactModal = () => {
  const { bindName, bindEmail, bindMessage, loading, handleSubmit } =
    useContactForm()

  // TODO! STYLE THIS and finish it, contact will stay at bottom but will only be there if user scrolls down
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      className="space-y-10 md:w-96"
    >
      <div className="relative">
        <input
          required
          type="text"
          name="name"
          id="name"
          value={bindName.value}
          onChange={bindName.onChange}
          className="w-full h-10 px-2 py-2 text-lg placeholder-transparent border-2 border-gray-500 text-whitetext peer focus:outline-none focus:border-windowyellow bg-inherit"
          autoComplete="off"
          placeholder="Name"
        />
        <label
          htmlFor="name"
          className="ml-1 absolute left-0 -top-3.5 text-white bg-onyx px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-graytext peer-focus:text-sm"
        >
          Name
        </label>
      </div>
      <div className="relative">
        <input
          id="email"
          name="email"
          type="text"
          value={bindEmail.value}
          onChange={bindEmail.onChange}
          className="w-full h-10 px-2 py-2 text-lg placeholder-transparent whitespace-normal border-2 border-gray-500 text-whitetext peer focus:outline-none focus:border-windowyellow bg-inherit"
          placeholder="john@doe.com"
        />
        <label
          htmlFor="email"
          className="ml-1 absolute left-0 -top-3.5 bg-onyx px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:bg-onyx peer-focus:text-graytext peer-focus:text-sm"
        >
          Email address
        </label>
      </div>

      <div className="relative">
        <TextAreaAutosize
          required
          name="message"
          id="message"
          value={bindMessage.value}
          onChange={bindMessage.onChange}
          maxRows={5}
          className="w-full h-10 px-2 py-1 text-lg placeholder-transparent whitespace-normal border-2 border-gray-500 resize-none text-whitetext peer focus:outline-none focus:border-windowyellow bg-inherit"
          placeholder="Message"
        />

        <label
          htmlFor="message"
          className="ml-1 absolute left-0 -top-3.5 bg-onyx px-2 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-graytext peer-focus:text-sm"
        >
          Message
        </label>
      </div>
      <div className="flex">
        <button
          type="submit"
          className="px-4 py-1 ml-auto border-2 rounded-sm bg-windowred/5 border-windowyellow group"
          disabled={loading}
        >
          {loading ? (
            <DominoSpinner />
          ) : (
            <p className="group-hover:brightness-75">Send</p>
          )}
        </button>
      </div>
    </form>
  )
}

export default ContactModal
