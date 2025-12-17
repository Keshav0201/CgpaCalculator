import { Route, Routes } from 'react-router-dom'
import './App.css'
import Attendence from './pages/Attendence'
import Home from './pages/Home'
import CgpaCalc from './pages/CgpaCalc'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='cgpa' element={<CgpaCalc/>}></Route>
        <Route path='attendence' element={<Attendence/>}/>
      </Routes>
    </div>
  )
}

export default App
