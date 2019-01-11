import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import WorkList from './WorkList';
import Home from './Home';
import './Dashboard.css'


class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: "Status",
      showStatus: true,
      works: [],
      index: false,
    }
  }

  refreshList = () => {
    const GET_ALL_WORKS_URL = "http://127.0.0.1:8000/api/work/works/";
    axios.get(GET_ALL_WORKS_URL)
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
            <button className="button">
              <Link className="link" to="/search/" >Search</Link>
            </button>
            <div className={this.state.showStatus ? "status-bar" : "status-bar--hide"}>
                <p className="status-bar__text">{this.state.message}</p>
              </div>
          </nav>

          <Route path="/" exact component={Home}/>
          <Route path="/map/"
            render={() => <p>Map</p>}/>
          <Route path="/listings/"
            render={() => <WorkList works={this.state.works}/>} />
          <Route path="/search/" render={() => <p>Search</p>} />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
