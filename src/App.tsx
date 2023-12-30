import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/Home'
import CardPage from './pages/Card'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
