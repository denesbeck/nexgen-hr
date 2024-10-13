'use client'
import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { CloseButton } from '@/_components'

export interface IAlert {
  id: string
  severity: 'error' | 'warning' | 'info' | 'success'
  message: string
}

const AlertBox = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([])

  useEffect(() => {
    function handleAlert(event: CustomEvent) {
      const alertEventDetail = event.detail as IAlert
      if (alerts.find((alert) => alert.id === alertEventDetail.id)) return
      setAlerts((prev) => [...prev, alertEventDetail])
    }
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
    window.addEventListener('alert-event', handleAlert)
    return () => {
      // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
      window.removeEventListener('alert-event', handleAlert)
    }
  }, [alerts])

  return (
    <div className="grid fixed top-0 z-50 space-y-1 w-full">
      {alerts.map((el) => {
        return (
          <Alert
            key={el.id}
            className="text-black font-base animate-textFocus"
            severity={el.severity}
            variant="filled"
            onClose={() =>
              setAlerts((prev) => prev.filter((alert) => alert.id !== el.id))
            }
          >
            {el.message}
          </Alert>
        )
      })}
    </div>
  )
}

export default AlertBox
