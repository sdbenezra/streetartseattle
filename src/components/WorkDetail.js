import React from 'react';
import PropTypes from 'prop-types';
import './WorkDetail.css';

class WorkDetail extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
    };
  }

  WorkImage = (props) => {
    if (this.props.workDetail.image) {
      return <img src={this.props.workDetail.image} alt=''width={250} height={150} mode='fit'/>
    }
    else {
      return <p>No Image Available</p>
    }
  }

  onInputChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value;

    this.setState(newState)
    console.log(this.state.query);
  };

  showForm = () => {
    this.setState ({ showEdit: true });
  }

  hideForm = () => {
    this.setState({ showEdit: false });
  }

  render() {
    if(!this.props.showDetail){
      return null;
    }
    const {image, title, artist, category, about, media, measurements, date, address} = this.props.workDetail;

    return (
      <div className="modal">
        <div className={this.state.showEdit ? "display-none" : "display-block"}>
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
            <div>
              <span><button onClick={this.props.handleClose}>close</button></span>
              <span><button className={this.state.showEdit ? "display-none" : "display-block"} onClick={this.showForm}>edit</button></span>
            </div>
          </section>
        </div>

        <section className={this.state.showEdit ? "display-block" : "display-none"}>
          <form className="modal-main">
            <div className="edit-form">
              <label className="label">
                <strong>Image:</strong>
                <input name="image" type="file" accept="image/*" className="value" />
              </label>
              <label className="label">
                <strong>Title:</strong>
                <input name="title" placeholder="Title" type="text" className="value" />
              </label>
              <label className="label">
                <strong>Artist:</strong>
                <input name="artist" placeholder="Artist" type="text" className="value" />
              </label>
              <label className="label">
                <strong>Category:</strong>
                <input name="category" placeholder="Category" type="text"  className="value" />
              </label>
              <label className="label">
                <strong>Adresss/Location:</strong>
                <input name="address" placeholder="Address" type="text" className="value">
                </input>
              </label>
              <label className="label">
                <strong>About:</strong>
                <input name="about" placeholder="Information about the work" type="textarea"
                       className="value">
                </input>
              </label>
              <label className="label">
                <strong>Media:</strong>
                <input name="media" placeholder="What is is made of?" type="text"
                       className="value">
                </input>
              </label>
              <label className="label">
                <strong>Measurements:</strong>
                <input name="measurements" placeholder="Measurements" type="text"
                       className="value">
                </input>
              </label>
              <label className="label">
                <strong>Date:</strong>
                <input name="date" placeholder="Date of creation" type="text"
                       className="value">
                </input>
              </label>
              <div className="label">
                <input type="submit" value="Submit" className="label"/>
                <button onClick={this.props.handleClose} className="label">Exit without saving</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }
};

WorkDetail.propTypes = {
  handleClose: PropTypes.func.isRequired,
  showDetail: PropTypes.bool,
}



export default WorkDetail;
