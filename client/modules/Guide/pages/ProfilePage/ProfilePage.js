import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Columns from 'grommet/components/Columns';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';
import styles from './ProfilePage.css';

import InfoIcon from 'grommet/components/icons/base/Info';
import StarIcon from 'grommet/components/icons/base/Star';
import StarHalfIcon from 'grommet/components/icons/base/StarHalf';
import Spinning from 'grommet/components/icons/Spinning';
import Avatar from 'react-avatar';

import {loginRequest, fetchGuideProfile} from '../../GuideActions';

export class ProfilePage extends Component {

    componentDidMount() {
        this.props.fetchGuideProfile(this.props.params.guideCuid);
        this.attempting = true;
    }

    render() {
        const calculateAge = (birthday) => { // birthday is a date
            const ageDifMs = Date.now() - birthday.getTime();
            const ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };
        let mainComponent = (
            <div style={{ textAlign: 'center' }}>
                <Spinning size="large"/>
            </div>
        );

        if (this.attempting && !this.props.guideProfileFetching) {
            const guide = this.props.guideProfilePayload.guideInfo;
            const age = calculateAge(new Date(guide.birthdate))
            mainComponent = (
                <div style={{textAlign: "center"}}>

                    <Helmet title="GuideProfile"/>

                    <div>
                        <Box direction="row">
                            <Box basis="1/3" size={{"height": {"min": "medium"}}, {"width": {"min": "medium"}}}
                                 margin="small" pad="medium" align="center" justify="center">
                                <Box basis="3/4" size={{"height": {"min": "medium"}}, {"width": {"min": "medium"}}}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Avatar facebookId={guide.facebookId} round={true} size={280}
                                                name={guide.firstname + " " + guide.lastname}
                                                src={guide.avatar ? guide.avatar : ''}/>
                                    </div>
                                </Box>
                                <Box basis="1/4" direction="row" size={{"width": {"min": "medium"}}} pad="medium"
                                     align="center" justify="center">
                                    <StarIcon size="large" colorIndex="accent-2"/>
                                    <StarIcon size="large" colorIndex="accent-2"/>
                                    <StarIcon size="large" colorIndex="accent-2"/>
                                    <StarHalfIcon size="large" colorIndex="accent-2"/>
                                </Box>
                            </Box>
                            <Box basis="2/3" size={{"height": {"min": "medium"}}}>
                                <Box basis="1/4" margin="small" align="start" justify="center" separator="bottom">
                                    <Heading>{guide.firstname + " " + guide.lastname}</Heading>
                                    {guide.description} <br />
                                </Box>
                                <Box basis="1/2" margin="small" align="start" justify="start" textAlign="left">
                                    Age: {age} <br />
                                    Language(s): English, German <br />
                                    Area(s): North India <br />
                                    Difficulty: Easy, Medium <br />
                                    Tourstyle: City, Sightseeing
                                </Box>
                                <Box basis="1/4">
                                    <Button label={<FormattedMessage id="contactMe"/>} href="#" accent={false} secondary={false}
                                            primary={true}/>
                                </Box>
                            </Box>
                        </Box>
                    </div>

                    <div>
                        <Box direction="column" justify="center" align="center" margin="medium">
                            <Box size={{"height": {"min": "medium"}}, {"width": {"max": "medium"}}} margin="small"
                                 align="center" justify="center" separator="bottom">
                                <Heading strong={true}>
                                    {<FormattedMessage id="aboutMe"/>}
                                </Heading>
                            </Box>
                            <Box direction="row" size={{"height": {"min": "medium"}}, {"width": {"min": "large"}}}
                                 align="center" justify="center">
                                <Box basis="1/3" colorIndex="light-2" margin="medium" pad="medium">
                                    <Box direction="column" align="center" justify="center">
                                        <Box pad="small">
                                            <InfoIcon size="large" colorIndex="accent-2"/>
                                        </Box>
                                        <Box size={{"width": {"max": "small"}}} separator="bottom">
                                            <Heading tag="h3">
                                                {guide.characterTraits[0]}
                                            </Heading>
                                        </Box>
                                        <Paragraph size="medium">
                                            {guide.characterTraitDescription[0]}
                                        </Paragraph>
                                    </Box>
                                </Box>
                                <Box basis="1/3" colorIndex="light-2" margin="medium" pad="medium">
                                    <Box direction="column" align="center" justify="center">
                                        <Box pad="small">
                                            <InfoIcon size="large" colorIndex="accent-2"/>
                                        </Box>
                                        <Box size={{"width": {"max": "small"}}} separator="bottom">
                                            <Heading tag="h3">
                                                {guide.characterTraits[1]}
                                            </Heading>
                                        </Box>
                                        <Paragraph size="medium">
                                            {guide.characterTraitDescription[1]}
                                        </Paragraph>
                                    </Box>
                                </Box>
                                <Box basis="1/3" colorIndex="light-2" margin="medium" pad="medium">
                                    <Box direction="column" align="center" justify="center">
                                        <Box pad="small">
                                            <InfoIcon size="large" colorIndex="accent-2"/>
                                        </Box>
                                        <Box size={{"width": {"max": "small"}}} separator="bottom">
                                            <Heading tag="h3">
                                                {guide.characterTraits[2]}
                                            </Heading>
                                        </Box>
                                        <Paragraph size="medium">
                                            {guide.characterTraitDescription[2]}
                                        </Paragraph>
                                    </Box>
                                </Box>
                            </Box>
                            <Box size={{"width": {"min": "small"}}}>
                                <Button label={<FormattedMessage id="getInTouch"/>} href="#" accent={false} secondary={false} primary={true}/>
                            </Box>
                        </Box>
                    </div>

                    <div>
                        <Box justify="center" align="center" margin="medium">
                            <Box size={{"height": {"min": "medium"}}, {"width": {"min": "medium"}}} margin="small"
                                 align="center" justify="center" separator="bottom">
                                <Heading strong={true}>
                                    {<FormattedMessage id="myTours"/>}
                                </Heading>
                            </Box>
                            <Box size={{"height": {"min": "medium"}}, {"width": {"min": "xxlarge"}}} margin="small"
                                 pad="medium" align="start" justify="start">
                                <Title separator="bottom">
                                    Region
                                </Title>
                            </Box>
                            <Columns justify="center">
                                <Box size={{"height": "small"}} align="center" justify="center" pad="medium"
                                     margin="small" colorIndex="light-2" texture="http://i.imgur.com/mkWLwm1.jpg">
                                    <Box separator="bottom">
                                        <Heading className={styles.tourHeading} strong={true} tag="h2">
                                            Tajmahal
                                        </Heading>
                                        <Box direction="row" alignSelf="center">
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarHalfIcon size="medium" colorIndex="light-1"/>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box size={{"height": "small"}} align="center" justify="center" pad="medium"
                                     margin="small" colorIndex="light-2" texture="http://i.imgur.com/mkWLwm1.jpg">
                                    <Box separator="bottom">
                                        <Heading className={styles.tourHeading} strong={true} tag="h2">
                                            Tajmahal
                                        </Heading>
                                        <Box direction="row" alignSelf="center">
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarHalfIcon size="medium" colorIndex="light-1"/>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box size={{"height": "small"}} align="center" justify="center" pad="medium"
                                     margin="small" colorIndex="light-2" texture="http://i.imgur.com/mkWLwm1.jpg">
                                    <Box separator="bottom">
                                        <Heading className={styles.tourHeading} strong={true} tag="h2">
                                            Tajmahal
                                        </Heading>
                                        <Box direction="row" alignSelf="center">
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarHalfIcon size="medium" colorIndex="light-1"/>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box size={{"height": "small"}} align="center" justify="center" pad="medium"
                                     margin="small" colorIndex="light-2" texture="http://i.imgur.com/mkWLwm1.jpg">
                                    <Box separator="bottom">
                                        <Heading className={styles.tourHeading} strong={true} tag="h2">
                                            Tajmahal
                                        </Heading>
                                        <Box direction="row" alignSelf="center">
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarHalfIcon size="medium" colorIndex="light-1"/>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box size={{"height": "small"}} align="center" justify="center" pad="medium"
                                     margin="small" colorIndex="light-2" texture="http://i.imgur.com/mkWLwm1.jpg">
                                    <Box separator="bottom">
                                        <Heading className={styles.tourHeading} strong={true} tag="h2">
                                            Tajmahal
                                        </Heading>
                                        <Box direction="row" alignSelf="center">
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarHalfIcon size="medium" colorIndex="light-1"/>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box size={{"height": "small"}} align="center" justify="center" pad="medium"
                                     margin="small" colorIndex="light-2" texture="http://i.imgur.com/mkWLwm1.jpg">
                                    <Box separator="bottom">
                                        <Heading className={styles.tourHeading} strong={true} tag="h2">
                                            Tajmahal
                                        </Heading>
                                        <Box direction="row" alignSelf="center">
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarIcon size="medium" colorIndex="light-1"/>
                                            <StarHalfIcon size="medium" colorIndex="light-1"/>
                                        </Box>
                                    </Box>
                                </Box>
                            </Columns>
                        </Box>
                    </div>

                    <div>
                        <Box direction="column" justify="center" align="center" margin="medium">
                            <Box size={{"height": {"min": "medium"}}, {"width": {"min": "medium"}}} margin="small"
                                 align="center" justify="center" separator="bottom">
                                <Heading strong={true}>
                                    {<FormattedMessage id="reviews"/>}
                                </Heading>
                            </Box>
                            <Columns justify="center">
                                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                                    <Box basis="1/4" colorIndex="brand">
                                        Thumbnail
                                    </Box>
                                    <Box direction="column" basis="3/4" textAlign="left">
                                        <Box direction="row">
                                            <Box basis="3/4">
                                                <Heading tag="h4" strong="true">
                                                    Max Muster
                                                </Heading>
                                            </Box>
                                            <Box basis="1/4" direction="row" textAlign="right">
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarHalfIcon size="medium" colorIndex="accent-2"/>
                                            </Box>
                                        </Box>
                                        <Box>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        </Box>
                                    </Box>
                                </Box>
                                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                                    <Box basis="1/4" colorIndex="brand">
                                        Thumbnail
                                    </Box>
                                    <Box direction="column" basis="3/4" textAlign="left">
                                        <Box direction="row">
                                            <Box basis="3/4">
                                                <Heading tag="h4" strong="true">
                                                    Max Muster
                                                </Heading>
                                            </Box>
                                            <Box basis="1/4" direction="row" textAlign="right">
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarHalfIcon size="medium" colorIndex="accent-2"/>
                                            </Box>
                                        </Box>
                                        <Box>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        </Box>
                                    </Box>
                                </Box>
                                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                                    <Box basis="1/4" colorIndex="brand">
                                        Thumbnail
                                    </Box>
                                    <Box direction="column" basis="3/4" textAlign="left">
                                        <Box direction="row">
                                            <Box basis="3/4">
                                                <Heading tag="h4" strong="true">
                                                    Max Muster
                                                </Heading>
                                            </Box>
                                            <Box basis="1/4" direction="row" textAlign="right">
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarHalfIcon size="medium" colorIndex="accent-2"/>
                                            </Box>
                                        </Box>
                                        <Box>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        </Box>
                                    </Box>
                                </Box>
                                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                                    <Box basis="1/4" colorIndex="brand">
                                        Thumbnail
                                    </Box>
                                    <Box direction="column" basis="3/4" textAlign="left">
                                        <Box direction="row">
                                            <Box basis="3/4">
                                                <Heading tag="h4" strong="true">
                                                    Max Muster
                                                </Heading>
                                            </Box>
                                            <Box basis="1/4" direction="row" textAlign="right">
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarHalfIcon size="medium" colorIndex="accent-2"/>
                                            </Box>
                                        </Box>
                                        <Box>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        </Box>
                                    </Box>
                                </Box>
                                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                                    <Box basis="1/4" colorIndex="brand">
                                        Thumbnail
                                    </Box>
                                    <Box direction="column" basis="3/4" textAlign="left">
                                        <Box direction="row">
                                            <Box basis="3/4">
                                                <Heading tag="h4" strong="true">
                                                    Max Muster
                                                </Heading>
                                            </Box>
                                            <Box basis="1/4" direction="row" textAlign="right">
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarHalfIcon size="medium" colorIndex="accent-2"/>
                                            </Box>
                                        </Box>
                                        <Box>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        </Box>
                                    </Box>
                                </Box>
                                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                                    <Box basis="1/4" colorIndex="brand">
                                        Thumbnail
                                    </Box>
                                    <Box direction="column" basis="3/4" textAlign="left">
                                        <Box direction="row">
                                            <Box basis="3/4">
                                                <Heading tag="h4" strong="true">
                                                    Max Muster
                                                </Heading>
                                            </Box>
                                            <Box basis="1/4" direction="row" textAlign="right">
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarIcon size="medium" colorIndex="accent-2"/>
                                                <StarHalfIcon size="medium" colorIndex="accent-2"/>
                                            </Box>
                                        </Box>
                                        <Box>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        </Box>
                                    </Box>
                                </Box>
                            </Columns>
                            <Box direction="row" size={{"width": "xlarge"}} colorIndex="light-2">
                                <Box basis="1/4" colorIndex="brand">
                                    Thumbnail
                                </Box>
                                <Box direction="column" basis="3/4" textAlign="left">
                                    <Box direction="row">
                                        <Box basis="3/4">
                                            <Heading tag="h4" strong="true">
                                                Max Muster
                                            </Heading>
                                        </Box>
                                        <Box basis="1/4" direction="row" textAlign="right">
                                            <StarIcon size="medium" colorIndex="accent-2"/>
                                            <StarIcon size="medium" colorIndex="accent-2"/>
                                            <StarIcon size="medium" colorIndex="accent-2"/>
                                            <StarIcon size="medium" colorIndex="accent-2"/>
                                            <StarIcon size="medium" colorIndex="accent-2"/>
                                        </Box>
                                    </Box>
                                    <Box align="end">
                                        <FormField>
                                            <TextInput id="item1" name="item-1" placeholder="Write a comment..."/>
                                        </FormField>
                                        <Button label={<FormattedMessage id="send"/>} href="#" accent={false} secondary={false} primary={true}/>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </div>

                </div>

            )
        }

        return (
            <div>
                {mainComponent}
            </div>
        );

    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
        avatar: store.user.avatar,
        guideProfileFetching: store.guide.guideProfileFetching,
        guideProfileFailed: store.guide.guideProfileFailed,
        guideProfilePayload: store.guide.guideProfilePayload,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGuideProfile: (cuid) => dispatch(fetchGuideProfile(cuid))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
