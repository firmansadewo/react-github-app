import './App.css'

import NavBar from './components/moleculs/navbar/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/moleculs/footer/footer';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="app-header">
          <NavBar />
        </div>

        <section className="main-content">
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
          </Switch>
        </section>

        <div className="footer">
          <Footer />
        </div>

      </div>
    </Router>
  )
}

export default App