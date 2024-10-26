import { IPassword } from '@/_components/forms/RegisterCompany/Password'
import { createContext } from 'react'

export interface RegisterCompanyContextProps {
  companyName: string
  setCompanyName: React.Dispatch<React.SetStateAction<string>>
  domain: string
  setDomain: React.Dispatch<React.SetStateAction<string>>
  rootEmail: string
  setRootEmail: React.Dispatch<React.SetStateAction<string>>
  password: IPassword
  setPassword: React.Dispatch<React.SetStateAction<IPassword>>
  confirmationCode: string
  setConfirmationCode: React.Dispatch<React.SetStateAction<string>>
}

const RegisterCompanyContext = createContext<RegisterCompanyContextProps>({
  companyName: '',
  setCompanyName: () => {},
  domain: '',
  setDomain: () => {},
  rootEmail: '',
  setRootEmail: () => {},
  password: {
    password: '',
    confirmPassword: '',
  },
  setPassword: () => {},
  confirmationCode: '',
  setConfirmationCode: () => {},
})

export default RegisterCompanyContext
