import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Launch extends React.Component {
  
  constructor(props) {
    super(props);
    const urlParam = this.props.params;
    this.state = {
      isLoaded: false,
      error: null,
      id: urlParam.id,
      launch: null
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
          launch: result
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
    const { isLoaded, error, launch } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement en cours …</div>;
    } else {
      return (
        <>
        <br></br>
        <img width="100" alt="mission" src={launch.links.mission_patch_small}></img>
        <p>Nom : {launch.mission_name}</p>
        <p>Lanceur : {launch.rocket.rocket_name}</p>
        <p>Date : {new Date(launch.launch_date_utc).toLocaleString()}</p>
        <p>{launch.launch_success === true ? "Lancement réussi" : "Lancement raté"}</p>
        <p>#First Stage ID : <Link to={"/missions/" + launch.id}>{launch.rocket.first_stage.cores[0].core.id}</Link></p>
        </>
      );
    }
  }
}

export default withParams(Launch);