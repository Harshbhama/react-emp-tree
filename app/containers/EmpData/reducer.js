/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { ERROR_MSG, TEST, SET_TRACKER_DATA, SET_LINKS_POSITION, SET_HEADER_PROPS } from './constants';

// The initial state of the App
export const initialState = {
  username: '',
  uploadData: '',
  loginData: '',
  history: '',
  auth: false,
  errMsgVal: '',
  testVal: '',
  trackerVal: '',
  position: '',
  links: '',
  header: '',
  under: ''
};

/* eslint-disable default-case, no-param-reassign */
const empReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      

      case TEST:
        draft.testVal = action.testVal
        break;

      case ERROR_MSG:
        draft.errMsgVal = action.errMsgVal
        break;

      case SET_TRACKER_DATA:
        draft.trackerVal = action.trackerVal
        break;

      case SET_LINKS_POSITION:
        draft.links = action.links;
        draft.position = action.position;
        break;
      case SET_HEADER_PROPS:
        draft.header = action.header;
        draft.under = action.under
        break;
    }
  });

export default empReducer;
