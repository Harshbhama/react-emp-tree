/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */



export const TEST = 'boilerplate/TEST'
export const SET_TRACKER_DATA = 'boilerplate/SET_TRACKER_DATA'
export const SET_LINKS_POSITION = 'boilerplate/SET_LINKS_POSITION'
export const SET_HEADER_PROPS = 'boilerplate/SET_HEADER_PROPS'