import './App.css'

import NavBar from './components/moleculs/navbar/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/moleculs/footer/footer';
import MainPage from './pages/MainPage';
import DetailPage from './pages/detailPage/detailPage';
import FilterPage from './pages/filterPage/filterPage';

function App() {
  return (
    <Router>
      <div>
        <div className="app-header">
          <NavBar />
        </div>

        <section className="main-content">
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/filter">
              <FilterPage />
            </Route>
            <Route path="/:id" >
              <DetailPage />
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