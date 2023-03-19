import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Trending from './pages/Trending'
import Updated from './pages/Updated'
import Categories from './pages/Categories'
import Calendar from './pages/Calendar'
import Watch from './pages/Watch'
import Search from './pages/Search'

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
      <Route path="/watch/:id" element={<Watch/>}/>
      <Route path="/search/:query" element={<Search/>}/>
    </Routes>
  )
}

export default App