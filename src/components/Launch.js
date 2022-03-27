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
      return <div><br></br><br></br>Chargement en cours …</div>;
    } else {
      return (
        <>
        <br></br>
        <h1>Lancement</h1>
        <br></br>
        <div className="card align-items-center" style={{ width: '18rem' }}>
          <img className="card-img-top" style={{ width: '150px' }} alt="mission" src={launch.links.mission_patch_small == null ? "https://graphiste.com/blog/wp-content/uploads/2019/08/1920px-NASA_logo.svg-e1567160347263.png" : launch.links.mission_patch_small}></img>
          <div className="card-body">
            <h5 className="card-title">{launch.mission_name}</h5>
            <p className="card-text">Lanceur : {launch.rocket.rocket_name}<br></br>Date : {new Date(launch.launch_date_utc).toLocaleString()}<br></br>{launch.launch_success === true ? "Lancement ✅" : "Lancement ❌"}</p>
            <Link className="btn btn-primary" to={"/missions/" + launch.id}>Voir les missions</Link>
          </div>
        </div>
        </>
      );
    }
  }
}

export default withParams(Launch);