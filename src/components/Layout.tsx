import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import Navbar from '@common/Navbar'

function Layout() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  )
}
const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 480px;
  padding: 20px;
`

export default Layout
