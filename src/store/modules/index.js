import auth from "./auth"
import list from "./list"
import listInfoPopup from "./listInfoPopup"
// import config from "../config/config"

import { combineReducers } from "redux"

export default combineReducers({ 
    auth, list, listInfoPopup
});