import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import {registerRequest} from '../../UserActions';

export class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordRepeat: "",
            birthDay: "",
            birthMonth: "",
            birthYear: ""
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

        const submit = () => {
            this.props.registerRequest(this.state);
        };

        const handleChange = (event) => {

            var newState = {};
            newState[event.target.name] = event.target.value;
            this.setState(newState);

        };

        //birthday selection

        //day
        let days = [];
        let months = [];
        let years = [];

        for (let i = 1; i <= 31; i++) {
            days.push(i);
        }

        for (let i = 1; i <= 12; i++) {
            months.push(i);

        }

        let diff = new Date().getFullYear() - 111;
        let cj = new Date().getFullYear();

        for (let i = cj; i >= diff; i--) {
            years.push(i);
        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Register"}/>

                <div style={styles.wrapper}>

                    <Form>

                        <Header>
                            <Heading>
                                Account erstellen
                            </Heading>
                        </Header>

                        <FormFields>

                            <FormField label="Vorname">
                                <TextInput name="firstName" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label="Nachname">
                                <TextInput name="lastName" onDOMChange={handleChange}/>
                            </FormField>

                            <select name="birthDay" onChange={handleChange}>
                                <option selected disabled>Tag</option>
                                {
                                    days.map(function (day) {
                                        return <option key={"day." + day}
                                                       value={day}>{day}</option>;
                                    })
                                }
                            </select>

                            <select name="birthMonth" onChange={handleChange}>
                                <option selected disabled>Monat</option>
                                {
                                    months.map(function (month) {
                                        return <option key={"month." + month}
                                                       value={month}>{month}</option>;
                                    })
                                }
                            </select>

                            <select name="birthYear" onChange={handleChange}>
                                <option selected disabled>Jahr</option>
                                {
                                    years.map(function (year) {
                                        return <option key={"year." + year}
                                                       value={year}>{year}</option>;
                                    })
                                }
                            </select>

                            <FormField label="E-Mail">
                                <TextInput name="email" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label="Passwort">
                                <TextInput type="password" name="password" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label="Passwort wiederholen">
                                <TextInput type="password" name="passwordRepeat" onDOMChange={handleChange}/>
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (user) => {
            dispatch(registerRequest(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
