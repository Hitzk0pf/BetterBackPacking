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

export class UploadProfilePicture extends Component {

    constructor(props) {
        super(props);

        this.state = {
          avatar: null,
        };
    }

    render() {

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }
        };

        let cropper

        if(!this.props.user.avatar) {
          cropper = (
              <AvatarCropper saveImage={(avatar) => this.setState({ avatar })} />
          )
        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Initial Page Wizard"}/>

                <div style={styles.wrapper}>
                  {cropper}
                </div>


            </div>
        );
    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
        user: store.user.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (user) => {
            dispatch(loginRequest(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfilePicture);
