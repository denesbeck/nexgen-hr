import { IAlert } from '@/_components/AlertBox'

type AlertEventType = 'alert-event' | 'close-alert' | 'purge-alerts'

const useAlert = () => {
  const alert = ({ id, severity, message }: IAlert) => {
    if (window)
      window.dispatchEvent(
        new CustomEvent('alert-event' as AlertEventType, {
          detail: {
            id,
            severity,
            message,
          } as IAlert,
        })
      )
  }
  const closeAlert = (id: string) => {
    if (window)
      window.dispatchEvent(
        new CustomEvent('close-alert' as AlertEventType, {
          detail: {
            id,
          } as IAlert,
        })
      )
  }
  const purgeAlerts = () => {
    if (window)
      window.dispatchEvent(
        new CustomEvent('purge-alerts' as AlertEventType, {
          detail: {} as IAlert,
        })
      )
  }
  return { alert, closeAlert, purgeAlerts }
}

export default useAlert
