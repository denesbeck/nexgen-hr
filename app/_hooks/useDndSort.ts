'use client'
import { Dispatch, useRef } from 'react'

const useDndSort = <T>(list: T[]) => {
  const dragElem = useRef<number>(0)
  const draggedOverElem = useRef<number>(0)

  const handleSort = (update: Dispatch<T[]>) => {
    const listClone: T[] = [...list]
    const temp = listClone[dragElem.current]
    listClone[dragElem.current] = listClone[draggedOverElem.current]
    listClone[draggedOverElem.current] = temp
    update(listClone)
  }
  return { dragElem, draggedOverElem, handleSort }
}

export default useDndSort
