import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';

import NotificationSystem from 'react-notification-system';

export class Notification extends Component {

  _addNotification (notification) {
    this.refs.notificationSystem.addNotification({
        title: 'Firstname Lastname',
        message: 'Notification message',
        level: 'success',
        position: 'tr',
    })
  }

    render() {
        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        return (

            <NotificationSystem ref="notificationSystem" />

        );

    }

}

const mapDispatchToProps = (dispatch) => {
  return {
    searchTour: (limit, date, area, tourstyle, difficulty) => dispatch(getAllTours(limit, date, area, tourstyle, difficulty)),
    getAllTours: (limit, date) => dispatch(getAllTours(limit, date)),
  }
};

export default Notification;