import { IAlert } from '@/_components/AlertBox'
const useAlert = () => {
  const alert = ({ id, severity, message }: IAlert) => {
    if (window)
      window.dispatchEvent(
        new CustomEvent('alert-event', {
          detail: {
            id,
            severity,
            message,
          },
        })
      )
  }
  return { alert }
}

export default useAlert
