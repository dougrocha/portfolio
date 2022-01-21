import { LoadingIcon, SendIcon } from '@icons'

const ContactFormButton = ({ loading }: { loading: boolean }) => {
  return (
    <div className="flex">
      {/* Change Highlight Feature for Buttons */}
      <button
        type="submit"
        className="flex items-center justify-center px-6 py-2 font-bold text-whitetext disabled:hover:scale-100 disabled:brightness-50 hover:brightness-90 hover:scale-95 bg-windowred rounded-xl sm:ml-auto"
        disabled={loading}
      >
        {loading ? (
          <>
            Sending...
            <LoadingIcon height={25} className="ml-2" />
          </>
        ) : (
          <>
            Send
            <SendIcon height={25} className="ml-2" />
          </>
        )}
      </button>
    </div>
  )
}

export default ContactFormButton
