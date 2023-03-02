import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Trending from './pages/Trending'
import Updated from './pages/Updated'
import Categories from './pages/Categories'
import Calendar from './pages/Calendar'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/trending" element={<Trending/>}/>
      <Route path="/updated" element={<Updated/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/calendar" element={<Calendar/>}/>

    </Routes>
  )
}

export default App