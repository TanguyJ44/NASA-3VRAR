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
        return <div>Chargement en cours …</div>;
      } else {
        return (
          <>
          <br></br>
          <h1>Prochain lancement :</h1>
          <img width="100" alt="mission" src={launchNext.links.mission_patch_small}></img>
          <br></br>
          <Link to={"/launch/" + launchNext.id}>{launchNext.mission_name}</Link>
          <p>Lanceur : {launchNext.rocket.rocket_name}</p>
          <p>Date : {new Date(launchNext.launch_date_utc).toLocaleString()}</p>

          <h1>Derniers lancements :</h1>
          <ul>
            {launchPast.map(launch => (
              <li key={launch.id}>
                <img width="100" alt="mission" src={launch.links.mission_patch_small}></img>
                <br></br>
                <Link to={"/launch/" + launch.id}>{launch.mission_name}</Link>
                <li>Lanceur: {launch.rocket.rocket_name}</li>
                <li>Date: {new Date(launch.launch_date_utc).toLocaleString()}</li>
                <li>{launch.launch_success === true ? "Lancement réussi" : "Lancement raté"}</li>
                <br></br>
              </li>
            ))}
          </ul>
          </>
        );
      }
    }
}

export default Home;