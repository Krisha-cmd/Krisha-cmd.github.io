import { useState } from 'react'
import Nav from "./components/Nav"
import './App.css'
import WebGiViewer from './components/WebGiViewer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Nav/>
      <WebGiViewer/>
    </div>
  )
}

export default App
