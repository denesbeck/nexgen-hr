'use client'
import { Button } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import AddIcon from '@mui/icons-material/Add'
import { useContext } from 'react'
import { Header, Info, Layer } from '.'
import { InitCompanyContext } from '@/_contexts'
import { useAlert, useDndSort, useLayers, useValidate } from '@/_hooks'
import { ILayer } from '@/_hooks/useLayers'
import { MAX_LAYERS } from '@/_config/max-items'

const Layers = () => {
  const { next } = useContext(InitCompanyContext)
  const {
    layers,
    setLayers,
    handleAddLayer,
    handleRemoveLayer,
    handleUpdateLayer,
    handleMoveUp,
    handleMoveDown,
  } = useLayers()
  const { alert, purgeAlerts } = useAlert()
  const { validate } = useValidate(layers)
  const { dragElem, draggedOverElem, handleSort } = useDndSort<ILayer>(layers)

  const handleNext = () => {
    purgeAlerts()
    const error = validate()
    if (error) {
      return alert({
        id: 'layers',
        message: error.map((el) => el.message).join(' '),
        severity: 'error',
      })
    }
    // INFO: Set the parent for each layer. The first layer should always have a value of `null`, indicating that it is the top layer in the hierarchy. This step is crucial for defining the company's organizational structure.
    layers.forEach((layer: ILayer, index: number) => {
      if (index === 0) {
        layer.parent = null
        // INFO: In the first layer, all instances should have a parent value of `null` to indicate that they are at the top of the hierarchy.
        layer.instances.forEach((instance) => {
          instance.parent = null
        })
      }
      if (index > 0) layer.parent = layers[index - 1].uuid
    })
    // INFO: Save layers to local storage and proceed to the next step
    localStorage.setItem('layers', JSON.stringify(layers))
    next()
  }

  return (
    <div className="p-8 w-screen bg-white shadow-md lg:w-max h-max animate-slideInFromBottom lg:min-w-[calc(60vw-3rem)] lg:rounded-[2rem]">
      <Header
        title="Layers"
        icon={LayersIcon}
        backgroundColor="bg-indigo-400"
      />
      <Info text="Layers are used to model a company's organizational structure." />
      <div className="flex justify-start my-2">
        <Button
          disabled={layers.length >= MAX_LAYERS}
          color="primary"
          variant="text"
          onClick={handleAddLayer}
        >
          <AddIcon className="mr-1 text-base" />
          Add Layer
        </Button>
      </div>
      <div className="grid overflow-y-auto gap-4 p-2 max-h-[40vh]">
        <div className="flex items-center py-1 px-4 bg-gray-100 rounded-md border-2 min-h-11">
          <span className="mr-4 text-xs text-gray-500">Layer 1:</span>
          <span className="font-semibold">Arcade Lab Inc</span>
        </div>
        {layers.length === 0 ? (
          <div className="text-center text-gray-500">No layers added yet</div>
        ) : (
          layers.map((layer, index) => {
            const LUuid = layer.uuid
            return (
              <Layer
                key={index}
                index={index}
                value={layer.name}
                update={(value) => handleUpdateLayer(LUuid, value)}
                remove={() => handleRemoveLayer(LUuid)}
                moveUp={() => handleMoveUp(index)}
                moveDown={() => handleMoveDown(index)}
                dragElem={dragElem}
                draggedOverElem={draggedOverElem}
                handleSort={() => handleSort(setLayers)}
              />
            )
          })
        )}
      </div>
      <div className="flex justify-end px-2 mt-4 w-full">
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Layers
