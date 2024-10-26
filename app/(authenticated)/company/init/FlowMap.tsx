'use client'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
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
    <div className="hidden h-screen min-w-[calc(50vw-3rem)] rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="p-2 w-max bg-indigo-400 rounded-full">
          <AccountTreeIcon className="text-white min-h-8 min-w-8" />
        </div>
        <h1 className="text-2xl text-slate-800">Flow Map</h1>
      </div>
      <div className="mt-4 h-[calc(100vh-104px)] rounded-md border">
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
      </div>
    </div>
  )
}

export default FlowMap
