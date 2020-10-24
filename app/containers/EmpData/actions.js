/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import axios from 'axios';

import { TEST, SET_TRACKER_DATA, SET_LINKS_POSITION, SET_HEADER_PROPS } from './constants';
// import { Config } from '../../Config.js';
// import { saveLocalStorage, getToken } from 'components/Helper/Helper';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */


export function test(value){
  return{
    type: TEST,
    testVal: value
  }
}

export function setTrackerData(value){
  return{
    type: SET_TRACKER_DATA,
    trackerVal: value
  }
}

export function setLinks(links, position){
  return{
    type: SET_LINKS_POSITION,
    links: links,
    position: position
  }
}

export function setHeaderProps(header, under){
  return{
    type: SET_HEADER_PROPS,
    header: header,
    under: under
  }
}