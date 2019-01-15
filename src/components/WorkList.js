import React from 'react';
import WorkItem from './WorkItem';
import './WorkList.css';
import axios from 'axios';


class WorkList extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: []
    }

  axios.get('http://127.0.0.1:8000/api/work/categories/')
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

  render(){
    const list = this.props.works.map((work, i) => {
      return (
        <WorkItem
          key={i}
          {...work}
          showDetail={this.props.showDetail}
          hideDetail={this.props.hideDetail}
          url={this.props.url}
          categories = {this.state.categories}
        />
      );
    });

    return(
      <div className='worklist'>
        {list}
      </div>
    );
  }
}



export default WorkList;
