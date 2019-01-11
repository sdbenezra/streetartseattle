import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  onInputChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value;

    this.setState(newState)
    console.log(this.state.query);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.searchCallback(this.state);
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="search-form">
        <button className="button link">Search</button>
        <input name="query" value={this.state.query} onChange={this.onInputChange} placeholder="Enter search terms" type="text"/>
      </form>

    )
  }
}

SearchForm.propTypes = {
  searchCallback: PropTypes.func.isRequired,
};


export default SearchForm;
