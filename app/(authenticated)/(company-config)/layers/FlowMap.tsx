'use client'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback } from 'react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Org:Finance' },
  },
  {
    id: '2',
    position: { x: 0, y: 0 },
    data: { label: 'Org:Human_Resources' },
  },
  {
    id: '3',
    position: { x: 0, y: 0 },
    data: { label: 'Org:Information Technology' },
  },
  { id: '4', position: { x: 0, y: 100 }, data: { label: 'Org:Sales' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'step' }]

const FlowMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )
  return (
    <ReactFlow
      height={100}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Controls />
    </ReactFlow>
  )
}

export default FlowMap
