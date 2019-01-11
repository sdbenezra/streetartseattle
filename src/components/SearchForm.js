import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      works: [],
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }

  changeQuery(event) {
    this.setState({query: event.target.value});
    console.log(this.state.query);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log("Search form submitted");
    let query = this.state.query
    const url = `${this.props.url}?search=${query}`
    console.log(url);
    axios.get(url)
    .then((response) => {
      console.log(this.state);
      console.log(`Response data is ${response.data[0].title}`);
      this.setState({ works: response.data })
      console.log(this.state);
      this.props.filter(this.state.works);
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });
    console.log(this.state.works);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="search-form">
          <button className="button link">Search</button>
          <input name="query" onChange={this.changeQuery} placeholder="Enter search terms" type="text"/>
        </form>
      </div>
    );
  }
}


export default SearchForm;
