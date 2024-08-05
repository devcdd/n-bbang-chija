import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import MainPage from './pages/MainPage.tsx'
import Layout from './Layout.tsx'
import FairPay from './pages/FairPay.tsx'
import Members from './pages/Members.tsx'

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/members" element={<Members />} />
          <Route path="/fair-pay" element={<FairPay />} />
          <Route path="/one-basket-pay" element={<LandingPage />} />
          <Route path="/random-pay" element={<LandingPage />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
