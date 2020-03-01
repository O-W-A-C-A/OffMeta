import React, { Component } from 'react';
import axios from 'axios';
import DefaultImg from './default-img.jpg';

// base api url being used
const API_URL = "http://localhost:5000";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multerImage: DefaultImg
    }
  }

  setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: DefaultImg
      });
    } 
  }

  // function to upload image once it has been captured
  uploadImage(e, method) {
    let imageObj = {};

    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded");
            this.setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image");
          this.setDefaultImage("multer");
        });
    }
  }

  render() {
    return (
      <div className="main-container">
        <h3 className="main-heading">Upload Image</h3>

        <div className="image-container">
          <div className="process">
            <h4 className="process__heading">Upload your profile image</h4>
            <p className="process__details">Upload image here</p>

            <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
            <img src={this.state.multerImage} alt="upload-image" className="process__image" />
          </div>

        </div>
      </div>
    );
  }
}