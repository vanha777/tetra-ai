'use client';

import dynamic from 'next/dynamic';

const FlowEditor = dynamic(() => import('./FlowEditor'), {
  ssr: false,
});

export default function FlowEditorWrapper() {
  return <FlowEditor />;
} 