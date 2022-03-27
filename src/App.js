import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Launch from "./components/Launch";
import Missions from "./components/Missions";
import Launches from "./components/Launches";
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <p id="title"><b>🔭 National Aeronautics and Supinfo Administration</b></p>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="" id="a-link">🏠 Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/launches" id="a-link">🚀 Lancements</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <p id="about">Données fournies par <b>Spacex Land</b></p>
          </form>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/launches" element={ <Launches/> } />
        <Route path="/launch/:id" element={ <Launch/> } />
        <Route path="/missions/:id" element={ <Missions/> } />
      </Routes>

    </div>
  );
}

export default App;
