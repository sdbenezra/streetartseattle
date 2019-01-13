import React from 'react';
import PropTypes from 'prop-types';
import './WorkDetail.css';

class WorkDetail extends React.Component{

  WorkImage = (props) => {
    if (this.props.workDetail.image) {
      return <img src={this.props.workDetail.image} alt=''width={250} height={150} mode='fit'/>
    }
    else {
      return <p>No Image Available</p>
    }
  }

  render() {
    if(!this.props.showDetail){
      return null;
    }
    const {image, title, artist, category, about, media, measurements, date, address} = this.props.workDetail;

    return (
      <div>
        <div className="modal">
          <section className="modal-main">
            <this.WorkImage image={image}/>
            <h2>{title}</h2>
            <p>by {artist}</p>
            <p>{category}</p>
            <p>{address}</p>
            <p><strong>About:</strong> {about}</p>
            <p><strong>Media:</strong> {media}</p>
            <p><strong>Measurements:</strong> {measurements}</p>
            <p>{date}</p>
            <button onClick={this.props.handleClose}>close</button>
          </section>
        </div>
      </div>
    );
  }
};

WorkDetail.propTypes = {
  handleClose: PropTypes.func.isRequired,
  showDetail: PropTypes.bool,
}



export default WorkDetail;
