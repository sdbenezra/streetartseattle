import React, { Component } from 'react';
import axios from 'axios';
import WorkList from './WorkList';


class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      showStatus: false,
      works: [],
    }
  }

  componentDidMount() {
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


  render() {
    return (
      <WorkList works={this.state.works}/>
    );
  }
}






export default Dashboard;
