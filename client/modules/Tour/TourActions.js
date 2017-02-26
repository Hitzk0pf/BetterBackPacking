import callApi from '../../util/apiCaller';

export const GET_ALL_TOURS_STARTED = 'GET_ALL_TOURS_STARTED';
export const GET_ALL_TOURS_SUCCESS = 'GET_ALL_TOURS_SUCCESS';
export const GET_ALL_TOURS_FAILED = 'GET_ALL_TOURS_FAILED';
export const RESET_ALL_TOURS_PAYLOAD = 'RESET_ALL_TOURS_PAYLOAD';

export const SEARCH_TOUR_STARTED = 'SEARCH_TOUR_STARTED';
export const SEARCH_TOUR_SUCCESS = 'SEARCH_TOUR_SUCCESS';
export const SEARCH_TOUR_FAILED = 'SEARCH_TOUR_SUCCESS';

// SEARCH TOUR

export function searchTourSuccess(tours) {
  return {
    type: SEARCH_TOUR_SUCCESS,
    tours,
  };
}

export function searchTourFailed() {
  return {
    type: SEARCH_TOUR_FAILED,
  };
}

export function searchTourResult(tours) {
  return (dispatch) => {
    if (tours !== null) {
      dispatch(searchTourSuccess(tours));
    } else {
      dispatch(searchTourFailed());
    }
  };
}

export function searchTourStarted() {
  return {
    type: SEARCH_TOUR_STARTED,
  };
}

export function searchTour(area, tourstyle, difficulty) {
  return (dispatch) => {
    dispatch(searchTourStarted())
    // TODO: implement backend for searchTours
    return callApi(`guideInfos/${cuid}`, 'get').then(res => dispatch(searchTourResult(res)));
  };
}

// GET ALL TOURS

export function getAllToursSuccess(tours) {
  return {
    type: GET_ALL_TOURS_SUCCESS,
    tours,
  };
}

export function getAllToursFailed() {
  return {
    type: GET_ALL_TOURS_FAILED,
  };
}

export function getAllToursResult(tours) {
  return (dispatch) => {
    if (tours !== null) {
      dispatch(getAllToursSuccess(tours));
    } else {
      dispatch(getAllToursFailed());
    }
  };
}

export function getAllToursStarted() {
  return {
    type: GET_ALL_TOURS_STARTED,
  };
}

export function resetAllToursPayload() {
  return {
    type: RESET_ALL_TOURS_PAYLOAD,
  };
}

export function getAllTours(limit, date) {
  return (dispatch) => {
    dispatch(getAllToursStarted());
    let timestamp = + new Date();
    if (date) {
      // if initial loading, reset tour data in redux store
      timestamp = + new Date(date);
    } else {
      dispatch(resetAllToursPayload());
    }
    return callApi(`tours?timestamp=${timestamp}&limit=${limit}`, 'get').then(res => dispatch(getAllToursResult(res)));
  };
}


// FETCH GUIDE PROFILE END

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    };
}

export function addGuideInfoSuccess(guideInfo) {
  return {
    type: ADD_GUIDE_INFO_SUCCESS,
    guideInfo,
  };
}

export function addGuideInfoFailed(error) {
  return {
    type: ADD_GUIDE_INFO_FAILED,
    error,
  };
}

export function addGuideInfo(guideInfo) {
    return (dispatch) => {
      //const token = cookie.load('token');
      const token = localStorage.getItem('token')
      console.log("log", token, { guideInfo })
      return callApi('guideInfos', 'post', token, { guideInfo } // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if(res.guideInfo)
        {
            dispatch(addGuideInfoSuccess(res.guideInfo));
        }
        else
        {
          dispatch(addGuideInfoFailed('Something went wrong while updating your user'));
        }
      }).catch((err) => console.log("ERR", err));
    };
}
