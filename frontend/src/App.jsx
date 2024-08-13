import './App.css'
import { RouterProvider } from 'react-router'
import routes from './utils/router'

function App() {

  return (
    <RouterProvider router={routes} />
  )
}

export default App
