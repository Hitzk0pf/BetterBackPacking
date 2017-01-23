import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import LoginForm from 'grommet/components/LoginForm';
import SocialFacebook from 'grommet/components/icons/base/SocialFacebook';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import styles from './Login.css';

import {loginRequest} from '../../UserActions';

export class LoginPage extends Component {

    render() {

        const submit = (user) => {

            // send login request
            this.props.loginRequest(user);

        };

        let message = "";

        if (this.props.attemptedLogin) {
            if(this.props.loginSuccess) {
                message = <Notification message="Awesome!"
                                     state="You're now logged in."
                                     status="ok" />
            } else {
                message = <Notification message="Wrong username or password!"
                                     state="Login failed"
                                     status="error" />
            }
        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Login"}/>

                <div className={styles.wrapper}>
                  <Box className={styles.buttonBox} pad='medium' basis="full" align="start">
                    {message}
                  </Box>

                    <LoginForm className={styles.loginForm} onSubmit={(user) => submit(user)}/>

                    <Box className={styles.buttonBox} pad='medium' basis="full" align="start">
                        <Button className={styles.button} icon={<SocialFacebook />}
                            label="Login with Facebook"
                            href="/api/login/facebook"
                            primary={true} />
                    </Box>

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
