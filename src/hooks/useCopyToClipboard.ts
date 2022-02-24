import { RefObject, useCallback, useState } from 'react'

interface IUseClipboardParams {
  textRef: RefObject<HTMLDivElement>
}

const useCopyToClipboard = ({
  textRef,
}: IUseClipboardParams): [copied: boolean, handleCopy: () => void] => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = useCallback(() => {
    setCopied(true)

    // Removes any error if connection is not https on safari
    if (!navigator.clipboard) return

    navigator.clipboard
      .writeText(textRef?.current?.textContent || '')
      .then(() => {
        return
      })
      .catch(() => {
        alert('something went wrong')
      })
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }, [textRef])

  return [copied, handleCopy]
}

export default useCopyToClipboard
