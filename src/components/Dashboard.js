import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import WorkList from './WorkList';
import Home from './Home';
import New from './New';
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
      categories: [],
      isShowing: false,
    }
    this.filterList = this.filterList.bind(this);
  }

  GET_ALL_WORKS_URL = "http://127.0.0.1:8000/api/work/works/";
  GET_CATEGORIES_URL = "http://127.0.0.1:8000/api/work/categories/"

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

  retrieveCategories = () => {
    axios.get(this.GET_CATEGORIES_URL)
    .then((response) => {
      let list = []
      console.log(`response ${response.data[0].id} ${response.data.length}`);
      let i;
      for(i = 0; i < response.data.length; i += 1){
        console.log(response.data[i]);
        list.push(response.data[i]);
      }
      this.setState({
        categories: list,
      });
      console.log(this.state.categories);
    })
    .catch((error) => {
      this.setState({
        error: error.message
      });
    });
  }


  componentDidMount() {
    this.refreshList();
    this.retrieveCategories();
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

  openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

  render() {
    return(
      <div>
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
                <Link className="link" to="/listings/" onClick={this.refreshList}>Listings</Link>
              </button>
              <button className="link small-button" onClick={this.openModalHandler} categories={this.state.categories}
                  url={this.GET_ALL_WORKS_URL}
                   >Add New Work
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
                  filter={this.state.filter}
                  url={this.GET_ALL_WORKS_URL}/>} />
          </div>
        </Router>
        <div className={this.state.isShowing? "display-block" : "display-none"}>
          <section className="modal">
            <div className="modal-main">
              <button onClick={this.closeModalHandler} className="label small-button">Exit</button>
              <New categories={this.state.categories} url={this.GET_ALL_WORKS_URL} close={this.closeModalHandler}/>
            </div>
          </section>
        </div>
      </div>


    );
  }
}

export default Dashboard;
