import React from 'react';
import PropTypes from 'prop-types';
import './WorkDetail.css';
import axios from 'axios';

class WorkDetail extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
      formData: {
        title: props.workDetail.title,
        artist: props.workDetail.artist,
        category: props.workDetail.category,
        address: props.workDetail.address,
        about: props.workDetail.about,
        media: props.workDetail.media,
        measurements: props.workDetail.measurements,
        date: props.workDetail.date,
        tags: props.workDetail.tags,
        imagecredit: props.workDetail.imagecredit,
      }
    };
    this.handleChange = this.onInputChange.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileInput = React.createRef();
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
    let name = event.target.name
    let value = event.target.value
    let formData = {...this.state.formData}
    if (name === "category"){
      value = [event.target.value];
    }

    formData[name] = value;
    this.setState({formData});
    console.log(this.state);
  };

  uploadHandler = (event) => {
    event.preventDefault();
    const URL = this.props.url;
    console.log(URL);
    let image = this.fileInput.current.files[0]
    let formData = new FormData();
    formData.append('image', image);
    axios.post(`${URL}${this.props.workDetail.id}/upload-image/`,
      formData,
    ).then((response) => {
      console.log(response.data);
      alert('Your image was uploaded!');
    })
    .catch((error) => {
      alert('Upload failed.');
    })
  }

  showForm = () => {
    this.setState ({ showEdit: true });
    console.log(this.state.formData);
  }

  hideForm = (event) => {
    event.preventDefault();
    this.setState({ showEdit: false });
  }

  saveEdits = (event) => {
    const URL = `${this.props.workDetail.url}${this.props.workDetail.id}/`;
    event.preventDefault();
    console.log("Save edits triggered");
    console.log(URL);
    let formData = this.state.formData;
    console.log(formData);

    axios.patch(URL,
      formData
    )
    .then((response) => {
      console.log(`response is ${(JSON.stringify(response.data))}`);
      this.setState({ showEdit: false });
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });
  };

  render() {
    if(!this.props.showDetail){
      return null;
    };

    console.log(`Hello ${this.props.categories}`);
    console.log(this.props.categories.length);

    const list = this.props.categories.map((cat, i) => {
        return (
          <option key={i} value={this.props.categories[i].name}>{this.props.categories[i].name}</option>
          )
      });

    const {image, title, artist, category, about, media, measurements, date, address, tags, imagecredit} = this.props.workDetail;

    return (
      <div className="modal">
        <div className={this.state.showEdit ? "display-none" : "display-block"}>
          <section className="modal-main detail">
            <this.WorkImage image={image}/>
            <p>{imagecredit}</p>
            <h2>{title}</h2>
            <p>by {artist}</p>
            <p>{category}</p>
            <p><strong>Location: </strong> {address}</p>
            <p><strong>About: </strong> {about}</p>
            <p><strong>Media: </strong> {media}</p>
            <p><strong>Measurements: </strong> {measurements}</p>
            <p>{date}</p>
            <p><strong>Tags: </strong> {tags}</p>
            <div>
              <p><button className="label small-button" onClick={this.showForm}>edit</button><span></span>
              <button onClick={this.props.handleClose} className="label small-button">close</button></p>
            </div>
          </section>
        </div>


        <section className={this.state.showEdit ? "display-block" : "display-none"}>
          <div className="modal-main">
            <form onSubmit={this.uploadHandler} className="picture-upload">
              <label className="label">
                <strong>Upload New Image Here: </strong>
                <input name="image" type="file" accept="image/*" className="value" ref={this.fileInput} />
              </label>
              <div className="label">
                <input type="submit" value="Submit" className="label small-button" />
                <button onClick={this.hideForm} className="label small-button">Exit</button>
              </div>
            </form>
            <form onSubmit={this.saveEdits}>
              <div className="edit-form">
                <label className="label">
                  <h2>Update Information Here:</h2>
                  <strong>Title: </strong>
                  <input name="title" placeholder="Title" type="text" className="value"
                   value={this.state.formData.title} onChange={this.onInputChange}/>
                </label>
                <label className="label">
                  <strong>Artist: </strong>
                  <input name="artist" placeholder="Artist" type="text" className="value"
                  value={this.state.formData.artist} onChange={this.onInputChange} />
                </label>
                <label className="label">
                  <strong>Category: </strong>
                  <select name="category" value={`${this.state.formData.category}`} onChange={this.handleChange} multiple={false} >
                    {list}
                  </select>
                </label>
                <label className="label">
                  <strong>Adresss/Location: </strong>
                  <input name="address" placeholder="Address" type="text" className="value"
                  value={this.state.formData.address} onChange={this.onInputChange} />
                </label>
                <label className="label">
                  <strong>About: </strong>
                  <input name="about" placeholder="Information about the work" type="textarea"
                         className="value" value={this.state.formData.about} onChange={this.onInputChange} />
                </label>
                <label className="label">
                  <strong>Media: </strong>
                  <input name="media" placeholder="What is is made of?" type="text"
                         className="value" value={this.state.formData.media} onChange={this.onInputChange} />
                </label>
                <label className="label">
                  <strong>Measurements: </strong>
                  <input name="measurements" placeholder="Measurements" type="text"
                         className="value" value={this.state.formData.measurements} onChange={this.onInputChange} />
                </label>
                <label className="label">
                  <strong>Date: </strong>
                  <input name="date" placeholder="Date of creation" type="text"
                         className="value" value={this.state.formData.date} onChange={this.onInputChange} />
                </label>
                <label className="label">
                  <strong>Tags: </strong>
                  <input name="tags" placeholder="Tags" type="text"
                         className="value" value={this.state.formData.tags} onChange={this.onInputChange} />
                </label>
                <label className="label">
                  <strong>Image Credit: </strong>
                  <input name="imagecredit" placeholder="Image Credit" type="text"
                         className="value" value={this.state.formData.imagecredit} onChange={this.onInputChange} />
                </label>
                <div className="label">
                  <input type="submit" value="Submit edit" className="label small-button" />
                  <button onClick={this.hideForm} className="label small-button">Exit without saving</button>
                </div>
              </div>
            </form>
          </div>
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
