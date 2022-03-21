import React from "react";

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
          <h1>Prochain lancement :</h1>
          <p>Nom : {launchNext.mission_name}</p>
          <p>Lanceur : {launchNext.rocket.rocket_name}</p>
          <p>Date : {launchNext.launch_date_utc}</p>
          <img width="100" src={launchNext.links.mission_patch_small}></img>

          <h1>Derniers lancements :</h1>
          <ul>
            {launchPast.map(launch => (
              <li>
                {launch.mission_name}
              </li>
            ))}
          </ul>
          </>
        );
      }
    }
}

export default Home;