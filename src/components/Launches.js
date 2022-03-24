import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Launches extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      limit: 10,
      launches: null,
      sortDate: 0,
      sortDateValue: "Non",
      btnMore: false
    };
  }

  // https://api.spacex.land/rest/launches?find={%22mission_name%22:%22test%22}

  componentDidMount() {
    this.updateLimit();
  }

  updateLimit() {
    this.setState({
      limit: this.state.limit + 10
    });

    this.getMoreLaunches();
  }

  getMoreLaunches() {
    const {limit} = this.state;

    this.setState({
      btnMore: false
    });

    let linkSortDate = "";

    if (this.state.sortDate) {
      linkSortDate = "";
    } else {
      linkSortDate = "&sort=launch_date_local";
    }

    fetch("https://api.spacex.land/rest/launches?limit=" + limit + linkSortDate)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          launches: result,
          btnMore: true
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

  sortDateResult() {
    switch (this.state.sortDate) {
      case 0:
        this.setState({
          sortDate: 1,
          sortDateValue: "Oui"
        });
        break;
      case 1:
        this.setState({
          sortDate: 0,
          sortDateValue: "Non"
        });
        break;
      default:
        break;
    }
    this.getMoreLaunches();
  }

  render() {
    const { isLoaded, error, launches, sortDateValue, btnMore } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement en cours …</div>;
    } else {
      return (
        <>
        <br></br>
        <h1>Tous les lancements :</h1>
        <br></br>
        {btnMore ? (
          <button onClick={() => this.sortDateResult()}> Trie par DATE : {sortDateValue}</button>
        ) : (
          null
        )}
        <br></br>
        <br></br>
        {launches.map(launch => (
            <div key={launch.id}>
                <Link to={"/launch/" + launch.id}>{launch.mission_name}</Link>
                <br></br>
            </div>
        ))}

        <br></br>
        {btnMore ? <button onClick={() => this.updateLimit()}> Afficher plus</button> : "Chargement ..."}
        </>
      );
    }
  }
}

export default withParams(Launches);