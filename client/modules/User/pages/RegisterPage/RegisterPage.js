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
import {addUser} from '../../UserActions';
import CheckBox from 'grommet/components/CheckBox';
import AvatarCropper from '../../components/AvatarCropper';
import styles from './RegisterPage.css';
import {Router, browserHistory} from 'react-router';
import Avatar from 'react-avatar';
import {Link} from 'react-router';

export class RegisterPage extends Component {

  constructor(props) {
      super(props);

      this.state = {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          passwordRepeat: "",
          birthDay: "",
          birthMonth: "",
          birthYear: "",
          isGuide: "",
          avatar: null,
      };

  }

  setAvatar(avatar) {
    // this.setState({ avatar });
  }

    render() {

        const submit = () => {
          const { firstname, lastname, email, password, passwordRepeat, isGuide, avatar, birthDay, birthMonth, birthYear } = this.state
          let birthdate = new Date(birthYear, (birthMonth - 1), birthDay)

          const user = {
            firstname,
            lastname,
            email,
            password,
            password_confirmation: passwordRepeat,
            isGuide,
            avatar,
            birthdate,
          }
          console.log(user)

          this.props.addUser(user)
          browserHistory.push("/login")
        };

        let avatarUpload = (
            <div style={{margin: 'auto', textAlign: 'center'}}>
              <Heading strong={true}
                align='center'
                margin='medium'>
                You look great!
              </Heading>
              <div>
                <Avatar src={this.state.avatar} round={true} size={300}/>
              </div>
              <div style={{margin: 'auto',  paddingTop: 20}}>
                <div style={{margin: 'auto',  padding: 5, display: 'inline'}}>
                  <Button label="Change Avatar" onClick={() => this.setState({ avatar: null })} />
                </div>
              </div>
            </div>
        );

        const handleChange = (event) => {

            var newState = {};

            if(event.target.type == "checkbox") {
                newState[event.target.name] = event.target.checked;
            } else {
                newState[event.target.name] = event.target.value;
            }

            this.setState(newState);

        };

        //birthday selection
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

                <div className={styles.wrapper}>

                    <Form>

                        <Header>
                            <Heading>
                               <FormattedMessage id="createAccount"/>
                            </Heading>
                        </Header>

                        <FormFields>

                            <FormField label={<FormattedMessage id="firstname"/>}>
                                <TextInput name="firstname" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label={<FormattedMessage id="lastname"/>}>
                                <TextInput name="lastname" onDOMChange={handleChange}/>
                            </FormField>

                            <select className={styles.select} name="birthDay" onChange={handleChange}>
                                <option selected disabled>{<FormattedMessage id="day"/>}</option>
                                {
                                    days.map(function (day) {
                                        return <option key={"day." + day}
                                                       value={day}>{day}</option>;
                                    })
                                }
                            </select>

                            <select className={styles.select} name="birthMonth" onChange={handleChange}>
                                <option selected disabled>{<FormattedMessage id="month"/>}</option>
                                {
                                    months.map(function (month) {
                                        return <option key={"month." + month}
                                                       value={month}>{month}</option>;
                                    })
                                }
                            </select>

                            <select className={styles.select} name="birthYear" onChange={handleChange}>
                                <option selected disabled>{<FormattedMessage id="year"/>}</option>
                                {
                                    years.map(function (year) {
                                        return <option key={"year." + year}
                                                       value={year}>{year}</option>;
                                    })
                                }
                            </select>

                            <FormField label={<FormattedMessage id="email"/>}>
                                <TextInput name="email" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField>
                                <CheckBox label={<FormattedMessage id="offers"/>}
                                          toggle={true}
                                          disabled={false}
                                          reverse={false}
                                          name="isGuide"
                                          defaultChecked={false}
                                          onChange={handleChange}
                                />
                                {
                                    // <input type="checkbox" checked={this.state.chkbox} onChange={this.handleChangeChk} />
                                }
                            </FormField>

                            <FormField label={<FormattedMessage id="password"/>}>
                                <TextInput type="password" name="password" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label={<FormattedMessage id="repeatPassword"/>}>
                                <TextInput type="password" name="passwordRepeat" onDOMChange={handleChange}/>
                            </FormField>

                        </FormFields>

                        <div className={styles.avatarCropper}>
                            {this.state.avatar ? avatarUpload : <AvatarCropper saveImage={(avatar) => this.setState({ avatar })} />}
                        </div>

                        <Footer pad={{"vertical": "medium"}}>
                            <Button label={<FormattedMessage id="submit"/>}
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
        addUser: (user) => {
            dispatch(addUser(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
