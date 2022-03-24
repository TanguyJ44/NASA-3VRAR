import React from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Missions extends React.Component {
  
  constructor(props) {
    super(props);
    const urlParam = this.props.params;
    this.state = {
      isLoaded: false,
      error: null,
      id: urlParam.id,
      missions: null
    };
  }

  componentDidMount() {
    const { id } = this.state;
    fetch("https://api.spacex.land/rest/launch/" + id)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          missions: result.rocket.first_stage
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
    const { isLoaded, error, missions } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement en cours …</div>;
    } else {
      const core = missions.cores[0].core;
      console.log(missions);
      return (
        <>
        <br></br>
        <h1>Missions rattaché au First Stage #{core.id}</h1>
        <p>Premier vol : {new Date(core.original_launch).toLocaleString()}</p>
        <p>Atterrissage sous la pluie : {core.water_landing === true ? "Oui" : "Non"}</p>
        <p>Nombre de réutilisations : {core.reuse_count}</p>
        <br></br>
          <ul>
            {core.missions.map(mission => (
              <li key={mission.flight}>
                <p>[{mission.flight}] {mission.name}</p>
              </li>
            ))}
          </ul>
        </>
      );
    }
  }
}

export default withParams(Missions);