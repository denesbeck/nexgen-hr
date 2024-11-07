'use client'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Panel,
  Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from '@dagrejs/dagre'
import '@xyflow/react/dist/style.css'
import { ILayer } from '@/_hooks/useLayers'
import { IInstance } from '@/_hooks/useInstances'
import { Button } from '@mui/material'

interface IEdge {
  id: string
  source: string
  target: string
  position: string
  type: string
  animated: boolean
}

// get layers array from local storage
const layers = JSON.parse(
  typeof window !== 'undefined' ? localStorage.getItem('layers') || '[]' : '[]'
)

// get instances array from layers, flatten it
const instances = layers.map((layer: ILayer) => layer.instances).flat()

// define initial nodes and edges
const initialNodes = instances.map((instance: IInstance) => ({
  id: instance.uuid,
  position: { x: 0, y: 0 },
  data: { label: instance.name },
}))
const initialEdges = instances
  .map((instance: IInstance) => {
    if (instance.parent === null) return null
    return {
      id: `e-${instance.uuid}-${instance.parent}`,
      source: instance.uuid,
      target: instance.parent,
      type: 'smoothstep',
      animated: true,
    }
  })
  .filter((el: IEdge) => el !== null)

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: 'RL', ranksep: 70, nodesep: 50 })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: 'right',
      sourcePosition: 'left',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }

    return newNode
  })

  return { nodes: newNodes, edges }
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
)

type LayoutedNode = Node & {
  targetPosition: string
  sourcePosition: string
  position: { x: number; y: number }
}
const FlowMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    layoutedNodes as LayoutedNode[]
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges)

  const resetLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    )
    setNodes([...layoutedNodes] as LayoutedNode[])
    setEdges([...layoutedEdges])
  }
  return (
    <div className="h-screen max-h-[50vh] w-screen min-w-[50vw] max-w-[90%] rounded-md border bg-white p-4">
      <ReactFlow
        height={100}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodesConnectable={false}
      >
        <Panel position="top-right">
          <Button onClick={resetLayout} size="small">
            Reset
          </Button>
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default FlowMap
