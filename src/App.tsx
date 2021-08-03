import React from 'react'
import { SocketProvider } from './context/SocketContext';
import { UIProvider } from './context/UIContext'
import { RouterPage } from './pages/RouterPage'

const App = () => {
  return (
    <AppState>
      <RouterPage />
    </AppState>
  )
}

const AppState: React.FC = ({ children }) => {
  return (
    <SocketProvider>
      <UIProvider>
        { children }
      </UIProvider>
    </SocketProvider>
  )
}

export default App;