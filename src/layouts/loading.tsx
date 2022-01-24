import React from 'react'
import { PongSpinner } from 'react-spinners-kit'

const LoadingLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-bg">
      <PongSpinner size={6} color={'#eaeaea'} sizeUnit="rem" />
    </div>
  )
}

export default LoadingLayout
