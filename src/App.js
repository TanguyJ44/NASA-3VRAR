import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";
import Home from "./components/Home"
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <p id="title">🚀 National Aeronautics and Supinfo Administration</p>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="">1️⃣ Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="page2">2️⃣ Page 2</Link>
            </li>
            <li className="nav-item">
              <Link to="page3">3️⃣ Page 3</Link>
            </li>
            <li className="nav-item">
              <Link to="page4">4️⃣ Page 4</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <p id="about">Supinfo</p>
          </form>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={ <Home/> } />
      </Routes>

    </div>
  );
}

export default App;
