import React from 'react';
import PropTypes from 'prop-types';
import './WorkItem.css';

class WorkDetail extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return(
      <div className='backdrop' style={{backdropStyle}}>
        <div className='modal' style={{modalStyle}}>
          <img src={this.props.image} alt=''/>
          <h2>{this.props.image}</h2>
          <p>by {this.props.artist}</p>
          <p>{this.props.category}</p>
          <p>{this.props.location}</p>
          <p>{this.props.about}</p>
          <div className="footer">
            <button onClick={this.props.OnClose}>
            Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

WorkDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
}



export default WorkDetail;
