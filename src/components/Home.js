import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isLoaded: false,
        error: null,
        launchNext: null,
        launchPast: [],
      };
    }
  
    componentDidMount() {
      // Next launch
      fetch("https://api.spacex.land/rest/launch-next")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            launchNext: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      // Last launch
      fetch("https://api.spacex.land/rest/launches-past?limit=3")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            launchPast: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
  
    render() {
      const { isLoaded, error, launchNext, launchPast } = this.state;
      if (error) {
        return <div>Erreur : {error.message}</div>;
      } else if (!isLoaded) {
        return <div><br></br><br></br>Chargement en cours …</div>;
      } else {
        return (
          <>
          <br></br>
          <h1>Prochain lancement</h1>
          <div className="card align-items-center" style={{ width: '18rem' }}>
            <img className="card-img-top" style={{ width: '150px' }} alt="mission" src={launchNext.links.mission_patch_small}></img>
            <div className="card-body">
              <h5 className="card-title">{launchNext.mission_name}</h5>
              <p className="card-text">Lanceur : {launchNext.rocket.rocket_name}<br></br>Date : {new Date(launchNext.launch_date_utc).toLocaleString()}</p>
              <Link className="btn btn-primary" to={"/launch/" + launchNext.id}>En savoir plus</Link>
            </div>
          </div>

          <br></br>
          <h1>Derniers lancements</h1>

          <div class="offset-sm-2 row col-sm-10">
            {launchPast.map(launch => (
              <div class="col-sm-3">
                <div class="card align-items-center">
                <img width="100" alt="mission" src={launch.links.mission_patch_small == null ? "https://graphiste.com/blog/wp-content/uploads/2019/08/1920px-NASA_logo.svg-e1567160347263.png" : launch.links.mission_patch_small}></img>
                  <div class="card-body">
                    <h5 className="card-title">{launch.mission_name}</h5>
                    <p className="card-text">Lanceur: {launch.rocket.rocket_name}<br></br>Date: {new Date(launch.launch_date_utc).toLocaleString()}<br></br>{launch.launch_success === true ? "Lancement ✅" : "Lancement ❌"}</p>
                    <Link className="btn btn-primary" to={"/launch/" + launch.id}>En savoir plus</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
        );
      }
    }
}

export default Home;