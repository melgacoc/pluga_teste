import './App.css'
import ToolTable from './components/ui/table'
import { ToolTableSkeleton } from './components/ui/skeletonTable'
import Header from './components/ui/header'
import Footer from './components/ui/footer'
import { ToolProvider, useToolContext } from './context/context'
import ErrorComponent from './components/ui/error'
import React from 'react'

function AppContent() {
  const { loading, error } = useToolContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-auto flex justify-around">
        {error ? (
          <ErrorComponent message={error} />
        ) : loading ? (
          <ToolTableSkeleton />
        ) : (
          <ToolTable />
        )}
      </main>
      <Footer />
    </div>
  );
}


function App() {
  return (
    <ToolProvider>
      <AppContent />
    </ToolProvider>
  );
}

export default App;
