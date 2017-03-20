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
import {searchTour, getAllTours} from '../TourActions';
import {Link} from 'react-router';

import InfoIcon from 'grommet/components/icons/base/Info';
import Spinning from 'grommet/components/icons/Spinning';


export class TourSearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterView: false,
    };
  }

  componentDidMount() {
    this.props.getAllTours(4, null);
    this.attempting = true;
  }

  searchTours (area, tourstyle, difficulty) {
    this.props.searchTour(4, null, area, tourstyle, difficulty);
    this.setState({ filterView: true, area, tourstyle, difficulty });
  }

    render() {
        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        const loadMore = () => {
          if (this.state.filterView) {
            console.log(this.props.allTours)
            this.props.searchTour(4, new Date(this.props.allTours[this.props.allTours.length - 1].createdAt), this.state.area, this.state.tourstyle, this.state.difficulty);
          } else {
            this.props.getAllTours(4, new Date(this.props.allTours[this.props.allTours.length - 1].createdAt));
          }
        }

        let spinner = ''
        if (this.attempting && this.props.getAllToursFetching) {
          spinner = <Spinning size="large" />
        }
        const tourArray = this.props.allTours.map(tour => <GuideFactPaper key={tour.cuid} tour={tour} />);

        let tourPapers = (
                      {tourArray}
        );

        if (this.attempting && !this.props.getAllToursFetching) {
          if (this.props.allTours.length) {
            spinner = (
              <Button
                label={<FormattedMessage id="loadMore"/>}
                primary
                onClick={loadMore}
              />
            );
          } else {
            spinner = '0 Results found'
          }
        }



        return (

            <div style={{textAlign: "center"}}>

                <Helmet title={"TourSearchPage"}/>


                <div>
                    <ImageSlider />
                </div>

                <div>
                    <SearchBar searchTour={(area, tourstyle, difficulty) => this.searchTours(area, tourstyle, difficulty)} />
                </div>

                <div>
                    <Columns size='medium' masonry={false} justify="center">
                      {tourArray}
                    </Columns>
                      {spinner}
                </div>

            </div>
        );

    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
  return {
    // name: store.activeChannel.name
    allTours: store.tour.getAllToursPayload,
    getAllToursFetching: store.tour.getAllToursFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchTour: (limit, date, area, tourstyle, difficulty) => dispatch(getAllTours(limit, date, area, tourstyle, difficulty)),
    getAllTours: (limit, date) => dispatch(getAllTours(limit, date)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TourSearchPage);
