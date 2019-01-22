import React from 'react';
import PropTypes from 'prop-types';
import './WorkDetail.css';
import axios from 'axios';

class New extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        title: '',
        artist: '',
        address: '',
        about: '',
        media: '',
        measurements: '',
        date: '',
        tags: '',
        imagecredit: '',
      }
    };
    this.handleChange = this.onInputChange.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileInput = React.createRef();
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
    for (const key in this.state.formData){
      formData.append(key, this.state.formData[key])
    };
    if (this.state.formData.image){
      formData.append('image', image);
    }
    axios({
      method: 'post',
      url: this.props.url,
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    }).then((response) => {
      console.log('Uploaded New Work');
      this.props.close();
    })
    .catch((error) => {
      console.log('upload failed');
    })
  }

  render() {
    const list = this.props.categories.map((cat, i) => {
        return (
          <option key={i} value={this.props.categories[i].name}>{this.props.categories[i].name}</option>
          )
      });

    return (

            <form onSubmit={this.uploadHandler}>
              <div className="edit-form">
                <label className="label">
                  <h2>Add a New Work:</h2>
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
                  <select name="category" value={this.state.formData.category} onChange={this.handleChange} multiple={false} >
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
                  <strong>Upload New Image Here: </strong>
                  <input name="image" type="file" accept="image/*" className="value" ref={this.fileInput} />
                </label>
                <label className="label">
                  <strong>Image Credit: </strong>
                  <input name="imagecredit" placeholder="Image Credit" type="text"
                         className="value" value={this.state.formData.imagecredit} onChange={this.onInputChange} />
                </label>
                <div className="label">
                  <input type="submit" value="Submit" className="label small-button" />
                </div>
              </div>
            </form>

    );
  }
};

New.propTypes = {
  categories: PropTypes.array,
}



export default New;
