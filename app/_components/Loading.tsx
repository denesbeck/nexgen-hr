'use client'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

interface LoadingProps {
  id: string
  children: React.ReactNode
}

const Loading = ({ id, children }: LoadingProps) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    function startLoading() {
      setLoading(true)
    }
    function stopLoading() {
      setLoading(false)
    }
    window.addEventListener(`start-loading-${id}`, startLoading)
    window.addEventListener(`stop-loading-${id}`, stopLoading)
    return () => {
      window.removeEventListener(`start-loading-${id}`, startLoading)
      window.removeEventListener(`stop-loading-${id}`, stopLoading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex relative justify-center items-center">
      <div className={'w-full ' + (loading && 'blur-[2px] grayscale')}>
        {children}
      </div>
      {loading && (
        <CircularProgress
          className="absolute text-sky-300"
          size={30}
          thickness={6}
        />
      )}
    </div>
  )
}

export default Loading
