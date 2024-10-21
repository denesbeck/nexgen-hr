'use client'
import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'

type Severity = 'error' | 'warning' | 'info' | 'success'

export interface IAlert {
  id: string
  severity: Severity
  message: string
}

const AlertBox = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([])

  useEffect(() => {
    function handleAlert(event: CustomEvent) {
      const alertEventDetail = event.detail as IAlert
      if (alerts.find((alert) => alert.id === alertEventDetail.id)) return
      setAlerts((prev) => {
        const arr = alerts.length >= 10 ? prev.slice(1) : prev
        return [...arr, alertEventDetail]
      })
    }
    function handleCloseAlert(event: CustomEvent) {
      const alertEventDetail = event.detail as IAlert
      setAlerts((prev) =>
        prev.filter((alert) => alert.id !== alertEventDetail.id)
      )
    }
    function handlePurgeAlerts() {
      setAlerts([])
    }
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
    window.addEventListener('alert-event', handleAlert)
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
    window.addEventListener('close-alert', handleCloseAlert)
    window.addEventListener('purge-alerts', handlePurgeAlerts)
    return () => {
      // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
      window.removeEventListener('alert-event', handleAlert)
      // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
      window.removeEventListener('close-alert', handleCloseAlert)
      window.removeEventListener('purge-alerts', handlePurgeAlerts)
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
