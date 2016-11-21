import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import LoginForm from 'grommet/components/LoginForm';

import {loginRequest} from '../../UserActions';

export function LoginPage(props) {

    const styles = {

        wrapper: {
            display: "inline-block",
            margin: "auto",
            textAlign: "left"
        }

    };

    const submit = (user) => {

        // send login request
        props.loginRequest(user);

        console.log("login", "called loginRequest function")

    };

    return (
        <div style={{textAlign: "center"}}>

            <Helmet title={"Login"}/>

            <div style={styles.wrapper}>

                <LoginForm onSubmit={(user) => submit(user)} />

            </div>

            <a href="/api/login/facebook">LOGIN WITH FB</a>

        </div>
    );

}

// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
        // form: store.form
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
