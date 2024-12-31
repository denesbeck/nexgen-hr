'use client'
import { Backdrop, CloseButton } from '.'
import { useClickOutside } from '@/_hooks'

interface IModal {
  children: React.ReactNode
  close: () => void
}

const Modal = ({ children, close }: IModal) => {
  const ref = useClickOutside<HTMLDivElement>(() => close())

  return (
    <Backdrop>
      <div
        ref={ref}
        className="flex relative flex-col p-8 bg-white rounded-md w-[30rem] max-w-[90vw] animate-slideInFromBottom text-slate-700"
      >
        <div className="absolute top-0 right-0 p-2">
          <CloseButton close={close} size="md" />
        </div>
        {children}
      </div>
    </Backdrop>
  )
}

export default Modal
