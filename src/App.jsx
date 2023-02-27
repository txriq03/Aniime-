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
      <Route path="/home/trending" element={<Trending/>}/>
      <Route path="/home/updated" element={<Updated/>}/>
      <Route path="/home/categories" element={<Categories/>}/>
      <Route path="/home/calendar" element={<Calendar/>}/>

    </Routes>
  )
}

export default App