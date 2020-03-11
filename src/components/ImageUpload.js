import React, { Component } from "react";

import ImageUploadWrapper from "./ImageUploadWrapper";
import { storage } from "../firebase/index";

class ImageUpload extends Component {
  // state
  state = {
    image: null,
    url: "",
    progress: 0
  };

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    // uploadTask.on('state_changed', progess, error, complete);
    uploadTask.on(
      "state_changed",
      // progress function: for progress bar
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      // error function
      error => {
        console.log(error);
      },
      // complete function: for download URL or image and show image
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // console.log(url);
            this.setState({ url });
          });
      }
    );
  };

  render() {
    return (
      <ImageUploadWrapper>
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>
        <br />
        <progress value={this.state.progress} max="100"></progress>
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/300x300"}
          alt=""
          style={{ height: "300px", width: "300px" }}
        />
      </ImageUploadWrapper>
    );
  }
}

export default ImageUpload;
