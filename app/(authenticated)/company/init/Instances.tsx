'use client'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import { Header, Info, Instance } from '.'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { InitCompanyContext } from '@/_contexts'
import { ILayer } from '@/_hooks/useLayers'
import { useInstances } from '@/_hooks'

const Instances = () => {
  const { back, next } = useContext(InitCompanyContext)
  const {
    layers,
    handleAddInstance,
    handleUpdateInstanceName,
    handleUpdateInstanceParent,
    handleRemoveInstance,
  } = useInstances()

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-max w-[40rem] min-w-[calc(50vw-3rem)] max-w-[90vw] animate-slideInFromBottom">
      <Header
        title="Instances"
        icon={ViewModuleIcon}
        backgroundColor="bg-sky-300"
      />
      <Info text="You can create multiple instances of a company layer to represent different units of your company." />
      <div className="grid gap-4 mt-4">
        {layers.map((layer: ILayer, layerIndex: number) => {
          const LUuid = layer.uuid
          return (
            <div key={LUuid} className="relative p-4 rounded-md border">
              <span className="absolute left-2 -top-3 px-2 bg-white">
                {layer.name}
              </span>
              <div className="flex items-center mb-2 space-x-4">
                <Button
                  color="primary"
                  variant="text"
                  onClick={() => handleAddInstance(LUuid)}
                >
                  Add Instance
                </Button>
                {layerIndex !== 0 &&
                  layers[layerIndex - 1].instances.length !== 0 && (
                    <>
                      <span className="mr-4 text-xs text-gray-500 whitespace-nowrap">
                        Filter by parent:
                      </span>
                      <select className="py-1 px-2 bg-white rounded-md border">
                        <option value="">Show all</option>
                        {layers[layerIndex - 1].instances.map((instance) => (
                          <option key={instance.uuid} value={instance.uuid}>
                            {instance.name}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
              </div>
              <div className="grid gap-4">
                {layers[layerIndex].instances.map((instance) => {
                  const IUuid = instance.uuid

                  return (
                    <Instance
                      key={instance.uuid}
                      value={instance.name}
                      parent={instance.parent}
                      hasParent={layerIndex !== 0}
                      parentInstances={
                        layerIndex !== 0 ? layers[layerIndex - 1].instances : []
                      }
                      updateName={(value: string) =>
                        handleUpdateInstanceName(LUuid, IUuid, value)
                      }
                      updateParent={(value: string | null) =>
                        handleUpdateInstanceParent(LUuid, IUuid, value)
                      }
                      remove={() => handleRemoveInstance(LUuid, IUuid)}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-end mt-2 space-x-4 w-full">
        <Button onClick={() => back()} variant="outlined" color="primary">
          Back
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem('layers', JSON.stringify(layers))
            next()
          }}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Instances
