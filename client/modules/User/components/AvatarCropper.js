import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import LoginForm from 'grommet/components/LoginForm';
import Dropzone from 'react-dropzone';
import Notification from 'grommet/components/Notification';
import AvatarEditor from 'react-avatar-editor';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';

export class AvatarCropper extends Component {

    constructor(props) {
        super(props);

        this.state = {
          error: null,
          notification: null,
          blob: null,
          picture: null,
          avatar: null,
          scale: 1,
          showDropzone: true,
        };
    }

    showCropper() {
      this.setState({ shouldClose: false })
    }

    // hideCropper() {
    //   this.setState({ picture: null })
    // }

    render() {

        const hideCropper = () => {
          this.setState({ picture: null })
        }

        let mainNotification = "";

        const maxSize = 2000000;


        if(this.state.error) {
          mainNotification = <Notification message="Oops!"
                                    state={this.state.error}
                                    status="critical" />
        } else if(this.state.notification) {
          mainNotification = <Notification message="Hurray!"
                                    state={this.state.notification}
                                    status="ok" />
        }

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        const onDrop = (acceptedFiles, rejectedFiles) => {
          if(acceptedFiles[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onerror = function (error) {
              this.setState({error: error});
            };
            reader.onload = () => {
              this.setState({
                blob: reader.result,
                picture: acceptedFiles[0],
              });
            };
            console.log('Rejected files: ', rejectedFiles);
            this.setState({
              notification: "Image uploaded successfully!",
              error: null,
            });
          } else {
            this.setState({error: "Sorry, only image files under 2MB are allowed.."});
          }
        }

        let dropzone

        if (this.state.showDropzone) {
          dropzone = (
                    <Dropzone
                      multiple={false}
                      accept="image/*"
                      maxSize={maxSize}
                      onDrop={onDrop}>
                      <div>Drop an image under 2MB here. You can also click me to select one!</div>
                    </Dropzone>
          );
        } else {
          dropzone = (
            <img src={this.state.avatar} />
          )
        }


        const handleScale = (e) => {
          const scale = parseFloat(e.target.value)
          this.setState({ scale })
        }

        const handleSave = () => {
          const img = this.editor.getImage().toDataURL()
          this.setState({
            avatar: img,
            showDropzone: false
          })
          hideCropper();
          this.props.saveImage(img);
        }

        const handleClose = () => {
          this.props.saveImage(null);
          hideCropper();
        }

        const setEditorRef = (editor) => {
          if (editor) this.editor = editor
        }

        let cropper = ""

        if (this.state.picture) {
          cropper = (

            <Layer align='center'
              flush={false}
              closer={true}
              onClose={handleClose}>
              <div>
                <AvatarEditor
                  ref={setEditorRef}
                  image={this.state.picture.preview}
                  width={250}
                  height={250}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1.2}
                  borderRadius={250}
                  scale={parseFloat(this.state.scale)}
                />
                <input
                  name="scale"
                  type="range"
                  onChange={handleScale}
                  min="1"
                  max="2"
                  step="0.01"
                  defaultValue="1"
                />
                <Button label="Submit"
                  primary={true}
                  onClick={handleSave}
                />
              </div>
            </Layer>
          )

        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Upload Profile Picture"}/>

                <div style={styles.wrapper}>
                  {mainNotification}
                  {dropzone}
                  {cropper}
                </div>


            </div>
        );
    }

}

export default AvatarCropper;
