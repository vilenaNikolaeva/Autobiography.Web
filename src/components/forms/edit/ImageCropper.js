import React from "react";
import "cropperjs/dist/cropper.min.css";
import Cropper from "react-cropper";
import "./../../../Styles/imagecropper.css"
import { Button, Container, Figure, Form } from 'react-bootstrap';
import defaultImageSrc from './../../../images/blank-profile-picture.png'
import Error from './../../errorMessage/Error';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      imageSrc: "",
      image: "",
      cropData: "",
      cropper: "",
      imageFile: "",
      showBtn: false,
      checked: false,
      error: "",
    };
    this.imageElement = React.createRef();
  }
  handleShowBtn = () => {
    this.setState({ showBtn: true });
  }
  handleHideBtn = () => {
    this.setState({ showBtn: false });
  }
  base64StringtoFile = (base64String, filename) => {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  handleFileUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ image: reader.result, showBtn: true });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  getCropData = () => {
    if (typeof this.state.cropper !== "undefined") {
      let imageBase64 = this.state.cropper.getCroppedCanvas().toDataURL();
      let file = this.base64StringtoFile(imageBase64, "file_for_upload");
      if (file.size > "10485760") {
        return this.setState({ error: "Maximum allowed file size is 100 000 bytes." })
      }

      this.setState({ cropData: this.state.cropper.getCroppedCanvas().toDataURL(), error: "" });
      this.props.onSetImageFileState(file);
    }
    else {
      return <Error>Please, first choose photo.</Error>
    }
  };
  resetState = () => {
    this.setState({
      imageSrc: "",
      image: "",
      cropData: "",
      cropper: "",
      imageFile: "",
      showBtn: false,
      checked: false,
      error: ""
    });
    this.props.onSetImageFileState(null);
  }
  render() {
    return (
      <Container as="div" className="image_crooper_container">
        <label>Choose your profile picture : </label>
        <Cropper
          className="cropper"
          zoomTo={0.1}
          aspectRatio={1}
          initialAspectRatio={1}
          preview=".img-preview"
          src={this.state.image}
          viewMode={1}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            this.setState({ cropper: instance, showBtn: false });
          }}
          guides={true}
        />
        <div className="cropped_image_container">
          <Figure.Image className="cropped_image" src={this.state.cropData ? this.state.cropData : defaultImageSrc} alt="cropped" roundedCircle />
          <div className="input_file_container">
            <input type="file" className="input_file" onChange={this.handleFileUpload} />
          </div>
          <div>
            <Form.Check
              name="defaultPicture"
              className="defaultImg_checkbox"
              checked={this.state.checked ? "checked" : null}
              onClick={() => this.setState({ cropData: defaultImageSrc })}
              onChange={this.resetState}
              label="Click HERE if you don't want to upload image." />
          </div>
        </div>
        <div className="cropper_button">
          {this.state.showBtn ? <Button onClick={this.getCropData}> Crop Image</Button> : null}
        </div>
        <Error error={this.state.error}></Error>
      </Container>
    );
  }
}

export default ImageCropper;
