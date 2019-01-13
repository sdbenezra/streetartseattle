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
      filter: false,
    }
    this.filterList = this.filterList.bind(this);
  }

  GET_ALL_WORKS_URL = "http://127.0.0.1:8000/api/work/works/";

  refreshList = () => {
    axios.get(this.GET_ALL_WORKS_URL)
    .then((response) => {
      this.setState({
        works: response.data,
      });
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

  componentDidUpdate(){
    this.toggleFilter();
  }

  filterList = (newWorkList) => {
    let newState = this.state;
    newState.works = newWorkList;
    newState.filter = true;
    this.setState(newState);
  }

  toggleFilter = () => {
    if (this.state.filter) {
      this.setState({filter: false});
    }
  }

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
            <SearchForm className="search-form" url={this.GET_ALL_WORKS_URL} filter={this.filterList}/>
          </nav>

          <div className={this.state.showStatus ? "status-bar" : "status-bar--hide"}>
              <p className="status-bar__text">{this.state.message}</p>
          </div>

          <Route exact path="/" render={() => (
              this.state.filter ? (
                <Redirect to="/listings/" />
              ) : (
                <Home />
              ))}/>

          <Route path="/map/"
            render={() => (
                this.state.filter ? (
                  <Redirect to="/listings/" />
                ) : (
                  <h2>Map</h2>
                ))}/>

          <Route path="/listings/"
            render={() => <WorkList works={this.state.works} toggleFilter={this.toggleFilter}
                filter={this.state.filter}/>} />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
