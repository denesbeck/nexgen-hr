import { createContext } from 'react'

export interface InitCompanyContextProps {
  next: () => void
  back: () => void
}

const InitCompanyContext = createContext<InitCompanyContextProps>({
  next: () => {},
  back: () => {},
})

export default InitCompanyContext
