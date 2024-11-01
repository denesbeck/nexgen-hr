import { useEffect, useState } from 'react'
import { ILayer } from './useLayers'
import { v4 as uuidv4 } from 'uuid'

export type IInstance = {
  uuid: string
  name: string
  parent: string | null
}

const useInstances = () => {
  const [layers, setLayers] = useState<ILayer[]>([])

  useEffect(() => {
    const layers = JSON.parse(
      typeof window !== 'undefined'
        ? localStorage.getItem('layers') || '[]'
        : '[]'
    )
    setLayers(layers)
    // eslint-disable-next-line
  }, [])

  const handleAddInstance = (layerUuid: string) => {
    const tmpArr = [...layers]
    const layerIndex = tmpArr.findIndex((layer) => layer.uuid === layerUuid)
    tmpArr[layerIndex].instances.push({
      uuid: uuidv4(),
      name: '',
      parent: null,
    })
    setLayers(tmpArr)
    localStorage.setItem('layers', JSON.stringify(tmpArr))
  }

  const handleUpdateInstanceName = (
    layerUuid: string,
    instanceUuid: string,
    name: string
  ) => {
    const tmpArr = [...layers]
    const layerIndex = tmpArr.findIndex((layer) => layer.uuid === layerUuid)
    const instanceIndex = tmpArr[layerIndex].instances.findIndex(
      (instance) => instance.uuid === instanceUuid
    )
    tmpArr[layerIndex].instances[instanceIndex].name = name
    setLayers(tmpArr)
    localStorage.setItem('layers', JSON.stringify(tmpArr))
  }

  const handleUpdateInstanceParent = (
    layerUuid: string,
    instanceUuid: string,
    parent: string | null
  ) => {
    const tmpArr = [...layers]
    const layerIndex = tmpArr.findIndex((layer) => layer.uuid === layerUuid)
    const instanceIndex = tmpArr[layerIndex].instances.findIndex(
      (instance) => instance.uuid === instanceUuid
    )
    tmpArr[layerIndex].instances[instanceIndex].parent = parent
    setLayers(tmpArr)
    localStorage.setItem('layers', JSON.stringify(tmpArr))
  }

  const handleRemoveInstance = (layerUuid: string, instanceUuid: string) => {
    const tmpArr = [...layers]
    const layerIndex = tmpArr.findIndex((layer) => layer.uuid === layerUuid)
    const instanceIndex = tmpArr[layerIndex].instances.findIndex(
      (instance) => instance.uuid === instanceUuid
    )
    tmpArr[layerIndex].instances.splice(instanceIndex, 1)
    for (let i = layerIndex + 1; i < tmpArr.length; i++) {
      tmpArr[i].instances.forEach((instance) => {
        if (instance.parent === instanceUuid) {
          instance.parent = null
        }
      })
    }
    setLayers(tmpArr)
    localStorage.setItem('layers', JSON.stringify(tmpArr))
  }

  return {
    layers,
    handleAddInstance,
    handleUpdateInstanceName,
    handleUpdateInstanceParent,
    handleRemoveInstance,
  }
}

export default useInstances
