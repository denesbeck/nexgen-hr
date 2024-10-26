'use client'
import { Button } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import { useContext, useState } from 'react'
import { Header, Info, Layer } from '.'
import { InitCompanyContext } from '@/_contexts'

const Layers = () => {
  const { next } = useContext(InitCompanyContext)
  const [layers, setLayers] = useState<string[]>([])

  const handleAddLayer = () => {
    setLayers((prev) => [...prev, ''])
  }
  const handleRemoveLayer = (index: number) => {
    setLayers((prev) => prev.filter((_, i) => i !== index))
  }
  const handleUpdateLayer = (index: number, value: string) => {
    const newLayers = [...layers]
    newLayers[index] = value
    setLayers(newLayers)
  }

  return (
    <div className="h-max w-[40rem] min-w-[calc(50vw-3rem)] max-w-[90vw] animate-slideInFromBottom rounded-lg bg-white p-4 shadow-md">
      <Header title="Layers" icon={LayersIcon} backgroundColor="bg-teal-400" />
      <Info text="Layers are used to model a company's organizational structure." />
      <div className="flex justify-start my-2">
        <Button color="primary" variant="text" onClick={handleAddLayer}>
          Add Layer
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center py-1 px-4 bg-gray-100 rounded-md border-2 min-h-11">
          <span className="mr-4 text-xs text-gray-500">Layer 1:</span>
          <span className="font-semibold">Arcade Lab Inc</span>
        </div>
        {layers.map((_, index) => (
          <Layer
            key={index}
            index={index}
            value={layers[index]}
            update={(value) => handleUpdateLayer(index, value)}
            remove={() => handleRemoveLayer(index)}
          />
        ))}
      </div>
      <div className="flex justify-end my-2 w-full">
        <Button color="primary" variant="contained" onClick={next}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default Layers
