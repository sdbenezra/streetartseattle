import React from 'react';
import './WorkItem.css';
import WorkDetail from './WorkDetail';


class WorkItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetail: false,
    }
  }

  showWorkDetail = () => {
      this.setState({ showDetail: true });
    }

  hideWorkDetail = () => {
      this.setState({ showDetail: false });
    }

  WorkImage = (props) => {
    const image = props.image;
    if (image) {
      return <img src={image} alt=''width={250} height={150} mode='fit'/>
    }
    else {
      return <img src={'https://picsum.photos/250/150/?image=1025'} alt=''width={250} height={150} mode='fit'/>
    }
  }

  render() {
    return(
      <div>
        <div className='item' onClick={this.showWorkDetail}>
          <div className='item__details'>
            <this.WorkImage image={this.props.image}/>
          </div>
          <div className='item__details'>
            <h2>{this.props.title}</h2>
            <p>by {this.props.artist}</p>
            <p>{this.props.category}</p>
            <p>{this.props.location}</p>
          </div>
        </div>
        <WorkDetail show={this.showWorkDetail} handleClose={this.hideWorkDetail} workDetail={this.props}
            showDetail={this.state.showDetail}
            url={this.props.url}/>
      </div>
    );
  };
}



export default WorkItem;
