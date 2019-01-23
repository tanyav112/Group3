import axios from 'axios';
import {
     GET_PROFILE,
     PROFILE_LOADING,
     CLEAR_CURRENT_PROFILE,
     GET_ERRORS,
     SET_CURRENT_USER
} from './types';

// get current profile
export const getCurrentProfile = () => dispatch => {
     dispatch(setProfileLoading());
     axios.get('/api/profile')
          .then(res => {
            dispatch({
                    type: GET_PROFILE,
                    payload: res.data
               })
          })
          // returns blank profile if profile not completed
          .catch(err =>
            {
              dispatch({
                    type: GET_PROFILE,
                    payload: {}
               })
              }
          );
}

// create profile
export const createProfile = (profileData, history) => dispatch => {
     axios
          .post('/api/profile', profileData)
          .then(res => history.push('/dashboard'))
          .catch(err =>
               dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
               }))
}

// add experience
export const addExperience = (expData, history) => dispatch => {
     axios
          .post('/api/profile/experience', expData)
               .then(res => history.push('/dashboard'))
               .catch(err => 
                    dispatch({
                         type: GET_ERRORS,
                         payload: err.response.data
                    })
          )
}

//delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// add background
export const addBackground = (eduData, history) => dispatch => {
     axios
          .post('/api/profile/background', eduData)
          .then(res => history.push('/dashboard'))
          .catch(err =>
               dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
               })
          )
}

// delete account & profile
export const deleteAccount = () => dispatch => {
     if (window.confirm('Are you sure?  This can NOT be undone!'))
          axios
               .delete('/api/profile')
               .then(res =>
                    dispatch({
                         type: SET_CURRENT_USER,
                         payload: {}
                    })
               ).catch(err =>
                    dispatch({
                         type: GET_ERRORS,
                         payload: err.response.data
                    })
               )
}

// Delete background
export const deleteBackground = id => dispatch => {
  axios
    .delete(`/api/profile/background/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// profile loading function
export const setProfileLoading = () => {
     return {
          type: PROFILE_LOADING
     }
}

// clear profile
export const clearCurrentProfile = () => {
     return {
          type: CLEAR_CURRENT_PROFILE
     }
}