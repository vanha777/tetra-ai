'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'parent-agent',
    type: 'default',
    data: { label: 'AI Parent Agent' },
    position: { x: 50, y: 200 },
    style: {
      width: 300,
      height: 100,
      backgroundColor: '#ffffff',
      border: '2px solid #2196f3',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'query-processor',
    type: 'default',
    data: { label: 'Query Processor' },
    position: { x: 400, y: 150 },
    style: {
      width: 150,
      height: 60,
      backgroundColor: '#fff8e1',
      border: '2px solid #ffc107',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'task-breakdown',
    type: 'default',
    data: { label: 'Task Breakdown' },
    position: { x: 400, y: 250 },
    style: {
      width: 150,
      height: 60,
      backgroundColor: '#e8f5e9',
      border: '2px solid #4caf50',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'llm-1',
    type: 'default',
    data: { label: 'GPT-4\n(Complex Reasoning)' },
    position: { x: 600, y: 150 },
    style: {
      width: 120,
      height: 60,
      backgroundColor: '#e3f2fd',
      border: '2px solid #2196f3',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'llm-2',
    type: 'default',
    data: { label: 'Claude\n(Analysis)' },
    position: { x: 600, y: 250 },
    style: {
      width: 120,
      height: 60,
      backgroundColor: '#e3f2fd',
      border: '2px solid #2196f3',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'llm-3',
    type: 'default',
    data: { label: 'PaLM\n(Generation)' },
    position: { x: 600, y: 350 },
    style: {
      width: 120,
      height: 60,
      backgroundColor: '#e3f2fd',
      border: '2px solid #2196f3',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'response-controller',
    type: 'default',
    data: { label: 'Response Controller' },
    position: { x: 800, y: 250 },
    style: {
      width: 200,
      height: 60,
      backgroundColor: '#f3e5f5',
      border: '2px solid #9c27b0',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
];

const initialEdges: Edge[] = [
  // Parent to processors
  { id: 'e1', source: 'parent-agent', target: 'query-processor', type: 'smoothstep' },
  { id: 'e2', source: 'parent-agent', target: 'task-breakdown', type: 'smoothstep' },
  
  // Processors to LLMs
  { id: 'e3', source: 'query-processor', target: 'llm-1', type: 'smoothstep' },
  { id: 'e4', source: 'task-breakdown', target: 'llm-1', type: 'smoothstep' },
  { id: 'e5', source: 'task-breakdown', target: 'llm-2', type: 'smoothstep' },
  { id: 'e6', source: 'task-breakdown', target: 'llm-3', type: 'smoothstep' },
  
  // LLMs to Response Controller
  { id: 'e7', source: 'llm-1', target: 'response-controller', type: 'smoothstep' },
  { id: 'e8', source: 'llm-2', target: 'response-controller', type: 'smoothstep' },
  { id: 'e9', source: 'llm-3', target: 'response-controller', type: 'smoothstep' },
];

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      console.log("connected", params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  return (
    <div className="w-full h-[800px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color='#000000' variant={BackgroundVariant.Dots} gap={12} size={1} className='bg-white' />
      </ReactFlow>
    </div>
  );
} 