import ViewModuleIcon from '@mui/icons-material/ViewModule'
import { Header } from '.'

const Review = () => {
  return (
    <div className="h-max w-[40rem] min-w-[calc(50vw-3rem)] max-w-[90vw] animate-slideInFromBottom rounded-lg bg-white p-4 shadow-md">
      <Header
        title="Instances"
        icon={ViewModuleIcon}
        backgroundColor="bg-sky-300"
      />
    </div>
  )
}

export default Review
