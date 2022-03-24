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
        <p id="title">🚀 National Aeronautics and Supinfo Administration</p>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="" id="a-link">1️⃣ Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/launches" id="a-link">2️⃣ Lancements</Link>
            </li>
            <li className="nav-item">
              <Link to="page3" id="a-link">3️⃣ Page 3</Link>
            </li>
            <li className="nav-item">
              <Link to="page4" id="a-link">4️⃣ Page 4</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <p id="about">Supinfo</p>
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
