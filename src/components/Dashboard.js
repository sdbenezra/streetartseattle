import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import WorkList from './WorkList';
import Home from './Home';
import './Dashboard.css';
import SearchForm from './SearchForm';
import { Redirect } from 'react-router';


class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: "Status",
      showStatus: false,
      works: [],
      index: false,
    }
  }

  GET_ALL_WORKS_URL = "http://127.0.0.1:8000/api/work/works/";

  refreshList = () => {
    axios.get(this.GET_ALL_WORKS_URL)
    .then((response) => {
      this.setState({
        works: response.data,
      });
      console.log(this.state.works);
    })
    .catch((error) => {
      this.setState({
        error: error.message
      });
    });
  }

  componentDidMount() {
    this.refreshList();
  }

  searchFilter = (queryString) => {
    const url = `${this.GET_ALL_WORKS_URL}?search=${queryString.query}`
    axios.get(url)
    .then((response) => {
      this.setState({
        works: response.data,
        filter: true,
      });
    console.log(this.state);
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });
    console.log(this.state.works);
  };

  render() {
    return(
      <Router>
        <div>
          <nav className="nav-list_container">
            <button className="button">
              <Link className="link" to="/" >Home</Link>
            </button>
            <button className="button">
              <Link className="link" to="/map/" >Map</Link>
            </button>
            <button className="button">
              <Link className="link" to="/listings/" onClick={this.refreshList} >Listings</Link>
            </button>
            <SearchForm searchCallback={this.searchFilter}/>
          </nav>
          <div className={this.state.showStatus ? "status-bar" : "status-bar--hide"}>
              <p className="status-bar__text">{this.state.message}</p>
          </div>

          <Route exact path="/" render={() => (
              this.state.filter === true ? (
                this.setState({ filter: false, }),
                <Redirect to="/listings"/>
              ) : (
                <Home />
              )
          )}/>
          <Route path="/map/"
            render={() => <p>Map</p>}/>
          <Route path="/listings/"
            render={() => <WorkList works={this.state.works}/>} />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
