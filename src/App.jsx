import { useState } from 'react'
import Nav from "./components/Nav"
import './App.css'
import WebGiViewer from './components/WebGiViewer'
import Skills from './components/skills'
import Home from './components/Home'
import Projects from './components/Projects'
import Webgi from './components/Webgi'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Nav/>
      <Home/>
      <Skills/>
      <Projects/>
      <WebGiViewer/>
    </div>
  )
}

export default App
