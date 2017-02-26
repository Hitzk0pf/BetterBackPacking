import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Heading from 'grommet/components/Heading';
import StarIcon from 'grommet/components/icons/base/Star';
import StarHalfIcon from 'grommet/components/icons/base/StarHalf';

export class GuideFactPaper extends Component {

    render() {

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        const { tour } = this.props

        let difficulty = '';

        if (tour.difficulty === 1) {
          difficulty = 'Easy';
        }
        if (tour.difficulty === 2) {
          difficulty = 'Intermediate';
        }
        if (tour.difficulty === 3) {
          difficulty = 'Hard';
        }

        return (
            <div style={{textAlign: "center"}}>

                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                    <Box basis="1/4" colorIndex="brand">
                        Thumbnail
                    </Box>
                    <Box direction="column" basis="3/4" textAlign="left">
                        <Box direction="row">
                            <Heading tag="h4" strong={true}>
                                {tour.description}
                            </Heading>
                        </Box>
                        <Box>
                            <Box>
                                Area: {tour.area}
                            </Box>
                            <Box>
                                Difficulty: {difficulty}
                            </Box>
                            <Box>
                                Tourstyle: {tour.tourStyle}
                            </Box>
                            <Box>
                                Price: {tour.price}
                            </Box>
                            <Box>
                                Guide: 'Not implemented yet'
                            </Box>
                            <Box direction="row">
                                Average Rating:
                                <Box direction="row" alignSelf="center">
                                        <StarIcon size="small" colorIndex="light-1"/>
                                        <StarIcon size="small" colorIndex="light-1"/>
                                        <StarIcon size="small" colorIndex="light-1"/>
                                        <StarHalfIcon size="small" colorIndex="light-1"/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </div>
        );

    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(GuideFactPaper);
