import React, { useCallback, useEffect } from 'react'

import useCodeMirror from './CodeMirror'

const EditorWindow = ({
  markDown,
  handleNewMarkdown,
}: {
  markDown: string
  handleNewMarkdown: (newMD: string) => void
}) => {
  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => handleNewMarkdown(state.doc.toString()),
    [handleNewMarkdown],
  )

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialMD: markDown,
    onChange: handleChange,
  })

  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (editorView) {
    }
  }, [editorView])

  return (
    <div
      className="w-1/2 h-full p-4 prose rounded-md resize-none dark:prose-invert text-primary-white bg-bg-600"
      ref={refContainer}
    ></div>
  )
}

export default EditorWindow
