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
      sortDateValue: "⬛️",
      search: "",
      btnMore: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.updateLimit();
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    this.getMoreLaunches();
    event.preventDefault();
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

    let searchData = "";

    if (this.state.search === "") {
      searchData = "";
    } else {
      searchData = "&find={%22mission_name%22:%22" + this.state.search + "%22}";
    }

    fetch("https://api.spacex.land/rest/launches?limit=" + limit + linkSortDate + searchData)
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
          sortDateValue: "⬜️"
        });
        break;
      case 1:
        this.setState({
          sortDate: 0,
          sortDateValue: "⬛️"
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
      return <div><br></br><br></br>Chargement en cours …</div>;
    } else {
      return (
        <>
        <br></br>
        <h1>Tous les lancements</h1>
        <br></br>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} placeholder="Nom de la mission" />
          {btnMore ? (
            <input type="submit" value="Rechercher" />
          ) : (
            null
          )}
        </form>
        <br></br>
        <br></br>
        {btnMore ? (
          <button onClick={() => this.sortDateResult()}> Trie par date : {sortDateValue}</button>
        ) : (
          null
        )}
        <br></br>
        <br></br>
        <div className="card" style={{ width: '60rem' }}>
          <ul className="list-group list-group-flush">
            {launches.map(launch => (
              <li key={launch.id} className="list-group-item">{launch.launch_success === true ? "✅" : "❌"} <Link to={"/launch/" + launch.id}>{launch.mission_name}</Link></li>
            ))}
          </ul>
        </div>

        <br></br>
        {btnMore ? <button onClick={() => this.updateLimit()}>⬇️ Afficher plus ⬇️</button> : "Chargement ..."}
        <br></br>
        <br></br>
        </>
      );
    }
  }
}

export default withParams(Launches);