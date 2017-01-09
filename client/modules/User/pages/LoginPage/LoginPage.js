import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import LoginForm from 'grommet/components/LoginForm';
import SocialFacebook from 'grommet/components/icons/base/SocialFacebook';
import Button from 'grommet/components/Button';

import {loginRequest} from '../../UserActions';

export class LoginPage extends Component {

    render() {

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        const submit = (user) => {

            // send login request
            this.props.loginRequest(user);

        };

        let message = "";

        if (this.props.attemptedLogin) {
            if(this.props.loginSuccess) {
                message = "OK";
            } else {
                message = "ERROR";
            }
        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Login"}/>

                <div style={styles.wrapper}>

                    <LoginForm onSubmit={(user) => submit(user)}/>

                    <div>
                        {message}
                    </div>

                    <Button icon={<SocialFacebook />}
                        label="Login with Facebook"
                        href="/api/login/facebook"
                        primary={true} />

                </div>

        </div>
    );
    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
        loginSuccess: store.user.loginSuccess,
        loggedIn: store.user.loggedIn,
        attemptedLogin: store.user.attemptedLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (user) => {
            dispatch(loginRequest(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
