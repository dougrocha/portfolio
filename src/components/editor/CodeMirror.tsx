import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter'
import { history, historyKeymap } from '@codemirror/history'
import { indentOnInput } from '@codemirror/language'
import { bracketMatching } from '@codemirror/matchbrackets'
import { EditorState } from '@codemirror/state'
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view'
import { useEffect, useRef, useState } from 'react'

const useCodeMirror = <T extends Element>({
  onChange,
  initialMD,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (state: any) => void
  initialMD: string
}): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()

  useEffect(() => {
    if (!refContainer.current) return

    const startState = EditorState.create({
      doc: initialMD,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap, ...closeBracketsKeymap]),
        history(),
        highlightActiveLine(),
        bracketMatching(),
        indentOnInput(),
        closeBrackets(),
        highlightActiveLineGutter(),
        lineNumbers(),
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
      ],
    })

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    })
    setEditorView(view)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refContainer])

  return [refContainer, editorView]
}

export default useCodeMirror
