import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import ImageSlider from '../../App/components/ImageSlider';
import SearchBar from '../components/SearchBar';
import GuideFactPaper from '../components/GuideFactPaper';
import Columns from 'grommet/components/Columns';

import InfoIcon from 'grommet/components/icons/base/Info';

export class TourSearchPage extends Component {

    render() {

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        this.props.name

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"TourSearchPage"}/>

                <div>
                    <ImageSlider />
                </div>

                <div>
                    <SearchBar searchTour={this.props.searchTour} />
                </div>

                <div>
                    <Columns size='medium' masonry={false} justify="center">
                        <GuideFactPaper />
                        <GuideFactPaper />
                        <GuideFactPaper />
                    </Columns>
                </div>

            </div>
        );

    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
        name: store.activeChannel.name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchTour: (area, tourstyle, difficulty) => dispatch(searchTour(area, tourstyle, difficulty)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TourSearchPage);
