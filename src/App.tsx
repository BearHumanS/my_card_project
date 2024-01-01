import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/Home'
import CardPage from '@pages/Card'
import ScrollToTop from '@common/ScrollToTop'
import SigninPage from '@pages/Signin'
import SignupPage from '@pages/Signup'
import Private from '@components/auth/Private'
import ApplyPage from '@pages/Apply'
import ApplyDone from './pages/ApplyDone'
import PageLoader from './components/common/PageLoader'
import MyPage from './pages/My'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" Component={HomePage} />
          <Route path="/card/:id" Component={CardPage} />
          <Route path="/signin" Component={SigninPage} />
          <Route path="/signup" Component={SignupPage} />
          <Route
            path="/apply/:id"
            element={
              <Private>
                <Suspense fallback={<PageLoader />}>
                  <ApplyPage />
                </Suspense>
              </Private>
            }
          />
          <Route
            path="/apply/done"
            element={
              <Private>
                <ApplyDone />
              </Private>
            }
          />
          <Route
            path="/mypage"
            element={
              <Private>
                <MyPage />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
