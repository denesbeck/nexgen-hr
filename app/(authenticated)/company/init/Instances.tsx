'use client'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import { Header, Info, Instance } from '.'
import { Button, Tab, Tabs } from '@mui/material'
import { useContext, useState } from 'react'
import { InitCompanyContext } from '@/_contexts'
import { useInstances } from '@/_hooks'

const Instances = () => {
  const { back, next } = useContext(InitCompanyContext)
  const [tabIndex, setTabIndex] = useState(0)
  const {
    layers,
    handleAddInstance,
    handleUpdateInstanceName,
    handleUpdateInstanceParent,
    handleRemoveInstance,
  } = useInstances()

  if (!layers.length) return
  return (
    <div className="p-8 w-screen bg-white shadow-md h-max min-w-[calc(50vw-3rem)] animate-slideInFromBottom lg:w-[40rem] lg:rounded-[3rem]">
      <Header
        title="Instances"
        icon={ViewModuleIcon}
        backgroundColor="bg-sky-300"
      />
      <Info text="You can create multiple instances of a company layer to represent different units of your company." />
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {layers.map((layer) => (
          <Tab key={layer.uuid} label={layer.name} />
        ))}
      </Tabs>
      <div className="grid gap-8 mt-4">
        <div key={layers[tabIndex].uuid} className="relative">
          <div className="flex items-center mb-2 space-x-4">
            <Button
              color="primary"
              variant="text"
              onClick={() => handleAddInstance(layers[tabIndex].uuid)}
            >
              Add Instance
            </Button>
            {tabIndex !== 0 && layers[tabIndex - 1].instances.length !== 0 && (
              <>
                <span className="mr-4 text-xs text-gray-500 whitespace-nowrap">
                  Filter by parent:
                </span>
                <select className="py-1 px-2 bg-white rounded-md border">
                  <option value="">Show all</option>
                  {layers[tabIndex - 1].instances.map((instance) => (
                    <option key={instance.uuid} value={instance.uuid}>
                      {instance.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div className="grid overflow-y-auto gap-4 p-1 lg:max-h-[35vh]">
            {layers[tabIndex].instances.map((instance) => {
              const IUuid = instance.uuid

              return (
                <Instance
                  key={instance.uuid}
                  value={instance.name}
                  parent={instance.parent}
                  hasParent={tabIndex !== 0}
                  parentInstances={
                    tabIndex !== 0 ? layers[tabIndex - 1].instances : []
                  }
                  updateName={(value: string) =>
                    handleUpdateInstanceName(
                      layers[tabIndex].uuid,
                      IUuid,
                      value
                    )
                  }
                  updateParent={(value: string | null) =>
                    handleUpdateInstanceParent(
                      layers[tabIndex].uuid,
                      IUuid,
                      value
                    )
                  }
                  remove={() =>
                    handleRemoveInstance(layers[tabIndex].uuid, IUuid)
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-4 w-full">
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
