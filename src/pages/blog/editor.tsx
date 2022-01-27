import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'

import LoadingLayout from 'layouts/loading'

const EditorWindow = dynamic(() => import('components/editor/EditorWindow'), {
  loading: () => <LoadingLayout />,
  ssr: false,
})
const PreviewWindow = dynamic(() => import('components/editor/PreviewWindow'), {
  loading: () => <LoadingLayout />,
  ssr: false,
})

const Editor: React.FC = () => {
  const [markDown, setMarkDown] = useState<string>('Welcome to Markdown!')

  const handleNewMarkdown = useCallback((newMD: string) => {
    setMarkDown(newMD)
  }, [])

  return (
    <div className="w-screen h-screen bg-secondary-red">
      <div className="flex justify-center w-full space-x-2 h-2/3">
        <EditorWindow
          markDown={markDown}
          handleNewMarkdown={handleNewMarkdown}
        />
        <PreviewWindow markDown={markDown} />
      </div>
      <div className="flex flex-col items-center justify-center h-1/3">
        <p className="font-bold text-7xl">CURRENTLY IN DEVELOPMENT!</p>
        <p className="w-1/3 text-4xl">
          This will be a live editor for me to make my blog posts and upload
          them. I would rather not hand write and have to use a git commit to
          update it.
        </p>
      </div>
    </div>
  )
}

export default Editor
