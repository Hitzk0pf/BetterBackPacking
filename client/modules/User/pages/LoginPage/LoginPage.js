import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import CheckBox from 'grommet/components/CheckBox';
import LoginForm from 'grommet/components/LoginForm';

export function LoginPage(props) {

    const submit = () => {
        alert("login...");
    };

    return (
        <div>
            <Helmet title={"Login"}/>
            <LoginForm onSubmit={this.submit}/>
        </div>
    );

}

// Retrieve data from store as props
function mapStateToProps(state, props) {
    return {};
}

LoginPage.propTypes = {};

export default connect(mapStateToProps)(LoginPage);
