import {
 createStore,
 combineReducers
} from 'redux';
import comments from '../reducers/comments';
import user from '../reducers/user';

const rootReducer = combineReducers({
 comments,
 user
});
const store = createStore(
 rootReducer,
 window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
