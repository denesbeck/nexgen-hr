import { IInstance } from '@/(authenticated)/company/init/Instances'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type ILayer = {
  uuid: string
  name: string
  parent: string | null
  instances: IInstance[]
}

const useLayers = () => {
  const [layers, setLayers] = useState<ILayer[]>([])

  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem('layers') || '[]')
    if (storedValue.length) setLayers(storedValue)
  }, [])

  const handleAddLayer = () => {
    setLayers((prev) => [
      ...prev,
      {
        uuid: uuidv4(),
        name: '',
        parent: null,
        instances: [],
      },
    ])
  }

  const handleRemoveLayer = (layerUuid: string) => {
    setLayers((prev) => prev.filter((layer) => layer.uuid !== layerUuid))
  }

  const handleUpdateLayer = (layerUuid: string, value: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.uuid === layerUuid ? { ...layer, name: value } : layer
      )
    )
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const layersClone = [...layers]
    const temp = layersClone[index]
    layersClone[index] = layersClone[index - 1]
    layersClone[index - 1] = temp
    setLayers(layersClone)
  }

  const handleMoveDown = (index: number) => {
    if (index === layers.length - 1) return
    const layersClone = [...layers]
    const temp = layersClone[index]
    layersClone[index] = layersClone[index + 1]
    layersClone[index + 1] = temp
    setLayers(layersClone)
  }

  return {
    layers,
    setLayers,
    handleAddLayer,
    handleRemoveLayer,
    handleUpdateLayer,
    handleMoveUp,
    handleMoveDown,
  }
}

export default useLayers
