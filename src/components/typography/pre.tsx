import { useRef } from 'react'

import { ClipboardCheckIcon, ClipboardIcon } from '@icons'

import useCopyToClipboard from '../../hooks/useCopyToClipboard'

const CustomCodeBlock = ({ children }: { children: React.ReactNode }) => {
  const textInput = useRef<HTMLDivElement>(null)
  const [copied, handleCopy] = useCopyToClipboard({ textRef: textInput })

  return (
    <div ref={textInput} className="relative group">
      <button
        aria-label="Copy code"
        type="button"
        className={`absolute right-2 top-2 w-8 h-8 p-1 rounded border-2 group-hover:opacity-100 opacity-0 transition-opacity ease-out ${
          copied
            ? 'focus:outline-none focus:border-secondary-green border-secondary-green'
            : 'border-gray-300 dark:border-gray-700'
        }`}
        onClick={handleCopy}
      >
        <div className="flex items-center justify-between w-full h-full">
          {copied ? (
            <ClipboardCheckIcon color="#00CA4E" />
          ) : (
            <ClipboardIcon color="#ffffff" />
          )}
        </div>
      </button>

      {/* Do not remove this class name, it is for code block theme */}
      <pre className="language-ts">{children}</pre>
    </div>
  )
}

export default CustomCodeBlock
