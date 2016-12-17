import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import LoginForm from 'grommet/components/LoginForm';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';

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

        const submit = (data) => {
            console.log("submit", data);
        };

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Login"}/>

                <div style={styles.wrapper}>

                    <Form>

                        <Header>
                            <Heading>
                                Account erstellen
                            </Heading>
                        </Header>

                        <FormFields>

                            <FormField label="Vorname" htmlFor="firstName">
                                <TextInput />
                            </FormField>

                            <FormField label="Nachname" htmlFor="lastName">
                                <TextInput />
                            </FormField>

                            <FormField label="Geburtsdatum" htmlFor="birthDate">
                                <DateTime id="id"
                                          name="name"
                                          format="D/M/YYYY"
                                />
                            </FormField>

                            <FormField label="E-Mail" htmlFor="email">
                                <TextInput />
                            </FormField>

                            <FormField label="Passwort" htmlFor="password">
                                <TextInput type="password"/>
                            </FormField>

                            <FormField label="Passwort wiederholen" htmlFor="passwordRepeat">
                                <TextInput type="password"/>
                            </FormField>

                        </FormFields>

                        <Footer pad={{"vertical": "medium"}}>
                            <Button label="Submit"
                                    primary={true}
                                    onClick={(data) => submit(data)}/>
                        </Footer>

                    </Form>

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
