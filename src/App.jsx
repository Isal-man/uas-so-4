import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"

const App = () => {
  return(
    <div className="app-wrapper">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="content-wrapper">
        <Outlet />
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  )
}

export default App