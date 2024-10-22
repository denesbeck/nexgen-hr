import { Header } from '@/_components'
import LayersIcon from '@mui/icons-material/Layers'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import AccountTreeIcon from '@mui/icons-material/AccountTree'

const Layers = () => {
  return (
    <>
      <div className="flex justify-start px-8 pt-6 w-full">
        <Header />
      </div>
      <div className="flex flex-col gap-8 p-8 w-screen h-screen lg:flex-row">
        <div className="flex flex-col gap-8">
          <div className="h-full min-h-max w-full min-w-[calc(50vw-3rem)] rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-3 w-max bg-teal-400 rounded-full">
                <LayersIcon className="text-white min-h-8 min-w-8" />
              </div>
              <h1 className="text-2xl text-slate-800">Layers</h1>
            </div>
          </div>
          <div className="h-full min-h-max w-full min-w-[calc(50vw-3rem)] rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-3 w-max rounded-full bg-sky-300">
                <ViewModuleIcon className="text-white min-h-8 min-w-8" />
              </div>
              <h1 className="text-2xl text-slate-800">Instances</h1>
            </div>
          </div>
        </div>
        <div className="h-full min-w-[calc(50vw-3rem)] rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-3 w-max bg-indigo-400 rounded-full">
              <AccountTreeIcon className="text-white min-h-8 min-w-8" />
            </div>
            <h1 className="text-2xl text-slate-800">Flow Map</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layers
