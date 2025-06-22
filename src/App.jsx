import { BrowserRouter as Router } from 'react-router-dom'
import AllRoutes from '@/components/route/AllRoutes'
import useDarkMode from '@/hooks/useDarkMode'
import './styles/globals.css'

function App() {
  // Apply theme classes to document
  useDarkMode()

  return (
    <Router>
      <AllRoutes />
    </Router>
  )
}

export default App 