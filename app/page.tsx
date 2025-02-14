import FlowEditorWrapper from '../components/FlowEditorWrapper';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">Tetra AI Flow Editor</h1>
      </header>
      <main className="flex-1 p-4">
        <FlowEditorWrapper />
      </main>
    </div>
  );
}
