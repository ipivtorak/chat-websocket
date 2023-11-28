import { combineReducers } from "@reduxjs/toolkit";
import { messageReducer } from './chat/reducers';

export default combineReducers({
    messages: messageReducer,
});
