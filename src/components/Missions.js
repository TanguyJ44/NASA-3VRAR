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
      return <div><br></br><br></br>Chargement en cours …</div>;
    } else {
      const core = missions.cores[0].core;
      return (
        <>
        <br></br>
        <h1>Missions rattaché</h1>
        <br></br>
        <p><b>Premier vol : </b>{new Date(core.original_launch).toLocaleString()}</p>
        <p><b>Atterrissage sous la pluie : </b>{core.water_landing === true ? "Oui" : "Non"}</p>
        <p><b>Nombre de réutilisations : </b>{core.reuse_count}</p>
        <br></br>
        <div className="card" style={{ width: '60rem' }}>
          <ul className="list-group list-group-flush">
            {core.missions.map(mission => (
              <li key={mission.flight} className="list-group-item">[{mission.flight}] {mission.name}</li>
            ))}
          </ul>
        </div>
        </>
      );
    }
  }
}

export default withParams(Missions);