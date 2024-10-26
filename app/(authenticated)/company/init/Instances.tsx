import ViewModuleIcon from '@mui/icons-material/ViewModule'
import { Header } from '.'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { InitCompanyContext } from '@/_contexts'

const Instances = () => {
  const { back, next } = useContext(InitCompanyContext)
  return (
    <div className="h-max w-[40rem] min-w-[calc(50vw-3rem)] max-w-[90vw] animate-slideInFromBottom rounded-lg bg-white p-4 shadow-md">
      <Header
        title="Instances"
        icon={ViewModuleIcon}
        backgroundColor="bg-sky-300"
      />
      <div className="flex justify-end mt-2 space-x-4 w-full">
        <Button onClick={() => back()} variant="outlined" color="primary">
          Back
        </Button>
        <Button onClick={() => next()} variant="contained" color="primary">
          Next
        </Button>
      </div>
    </div>
  )
}

export default Instances
