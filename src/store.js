import { createStore } from "redux";
import  newsReducer  from "./reducers/newsReducer";

const store = createStore(newsReducer);

export default store;