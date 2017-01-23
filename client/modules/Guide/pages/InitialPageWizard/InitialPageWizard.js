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
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import TextInput from 'grommet/components/TextInput';
import Header from 'grommet/components/Header';
import AvatarCropper from '../../../User/components/AvatarCropper'
import { editUser } from '../../../User/UserActions'
import { addGuideInfo } from '../../../Guide/GuideActions'

export class UploadProfilePicture extends Component {

    constructor(props) {
        super(props);

        this.state = {
          avatar: null,
          hasAvatar: false,
          submitPressed: false,
          hideDropzone: false,
          description: "",
          ct1: "",
          ct2: "",
          ct3: "",
          ct1Description: "",
          ct2Description: "",
          ct3Description: "",
        };
    }

    submitAvatar = () => {
      this.props.addAvatar({cuid: this.props.user.user.cuid, avatar: this.state.avatar})
      this.setState({hideDropzone: true, submitPressed: true})
    }

    cancelAvatar = () => {
      this.setState({avatar: null, hideDropzone: false, submitPressed: false})
    }

    handleSubmit = () => {
      const { description, ct1, ct2, ct3, ct1Description, ct2Description, ct3Description } = this.state

      console.log("state", this.state)

      if ( description && ct1 && ct2 && ct3 && ct1Description && ct2Description && ct3Description ) {
        let characterTraits = []
        let characterTraitDescription = []

        characterTraits.push(ct1, ct2, ct3)
        characterTraitDescription.push(ct1, ct2, ct3)

        const guideInfo = {
          description,
          characterTraits,
          characterTraitDescription,
          userCuid: this.props.user.user.cuid
        }

        console.log(guideInfo)

        this.props.addGuideInfo(guideInfo)

      }
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
        let submit

        if(!this.props.user.avatar) {
          if(!this.state.hideDropzone) {
            cropper = (
                <div style={{margin: 'auto', textAlign: 'center'}}>
                  <Heading strong={true}
                    align='center'
                    margin='medium'>
                    Upload a picture of your awesome self!
                  </Heading>
                  <AvatarCropper saveImage={(avatar) => this.setState({ avatar, hideDropzone: true })} />
                </div>
            )
          }
        }

        //UI State 2: show avatar and prompt for upload
        if(this.state.avatar) {
          submit = (
            <div style={{margin: 'auto', textAlign: 'center'}}>
              <Heading strong={true}
                align='center'
                margin='medium'>
                You look great!
              </Heading>
              <Heading strong={false}
                align='center'
                margin='medium'
                tag='h2'>
                Do you want to keep this nice photo as your profile picture?
              </Heading>

              <div>
                <img src={this.state.avatar} style={{width: 400, height: 400, borderRadius: '50%'}}/>
              </div>
              <div style={{margin: 'auto',  paddingTop: 20}}>
                <div style={{margin: 'auto',  padding: 5, display: 'inline'}}>
                  <Button primary label="Submit" onClick={this.submitAvatar} />
                </div>
                <div style={{margin: 'auto',  padding: 5, display: 'inline'}}>
                  <Button label="Cancel" onClick={this.cancelAvatar} />
                </div>
              </div>
            </div>
          )
        }


        if(this.props.user.avatar || this.state.submitPressed) {
          //user already has an avatar, lets show description box and 3 question boxes
          cropper = (

            <div>
              <Heading strong={true}
                align='center'
                margin='medium'
                tag='h1'>
                Awesome!
              </Heading>


              <Form>
                <Header>
                  <Heading>
                    Tell me about you
                  </Heading>
                </Header>
                  <FormField label='Description'>
                    <textarea
                    name="aboutMe"
                    cols="40"
                    value={this.state.description}
                    placeholder="Introduce yourself!"
                    onChange={(event) => this.setState({description: event.target.value})}
                    rows="5"></textarea>
                  </FormField>

                <Header>
                  <Heading>
                  Three of your best character traits
                  </Heading>
                </Header>
                  <FormField label='First character trait'>
                    <TextInput name="ct1" placeholder="e.g. Adventurous, Open Minded, Sporty.." onDOMChange={(event) => this.setState({ct1: event.target.value})} />
                  </FormField>
                  <FormField label='Describe this character trait'>
                    <textarea
                    name="ct1Description"
                    onChange={(event) => this.setState({ct1Description: event.target.value})}
                    cols="40"
                    placeholder="e.g. If you like adventures, I'm your type of guide. Caves, suspension bridges - you name it... "
                    rows="5"></textarea>
                  </FormField>

                  <Header>
                  </Header>

                  <FormField label='Second character trait'>
                    <TextInput name="ct2" placeholder="e.g. Adventurous, Open Minded, Sporty.." onDOMChange={(event) => this.setState({ct2: event.target.value})} />
                  </FormField>
                  <FormField label="Describe this character trait">
                    <textarea
                    name="ct2Description"
                    onChange={(event) => this.setState({ct2Description: event.target.value})}
                    cols="40"
                    placeholder="e.g. If you like adventures, I'm your type of guide. Caves, suspension bridges - you name it... "
                    rows="5"></textarea>
                  </FormField>

                  <Header>
                  </Header>

                  <FormField label='Third character trait'>
                    <TextInput name="ct3" placeholder="e.g. Adventurous, Open Minded, Sporty.." onDOMChange={(event) => this.setState({ct3: event.target.value})} />
                  </FormField>
                  <FormField label="Describe this character trait">
                    <textarea
                    name="ct3Description"
                    onChange={(event) => this.setState({ct3Description: event.target.value})}
                    cols="40"
                    placeholder="e.g. If you like adventures, I'm your type of guide. Caves, suspension bridges - you name it... "
                    rows="5"></textarea>
                  </FormField>
              </Form>
              <Footer pad={{"vertical": "medium"}}>
                <Button label='Submit'
                  type='submit'
                  primary={true}
                  onClick={this.handleSubmit} />
              </Footer>
            </div>
          )

          submit = ""

        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Initial Page Wizard"}/>

                <div style={styles.wrapper}>
                  {cropper}
                  {submit}
                </div>


            </div>
        );
    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
        user: store.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGuideInfo: (guideInfo) => {
            dispatch(addGuideInfo(guideInfo));
        },
        addAvatar: (user) => {
            dispatch(editUser(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfilePicture);
