import React from 'react'
import { PongSpinner } from 'react-spinners-kit'

const LoadingLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-feldgray-400 dark:bg-bg-600">
      <PongSpinner size={6} color={'#eaeaea'} sizeUnit="rem" />
    </div>
  )
}

export default LoadingLayout
