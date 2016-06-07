import { combineReducers } from 'redux';
import counter from './CounterReducer';
import reddit from './RedditReducer';
import report from './ReportReducer';
import auth from './AuthReducer';
import account from './TravelFormReducer';
import {reducer as formReducer} from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';

export default (routerReducer) => {
    return combineReducers({
        reddit,
        form: formReducer,
        counter,
        reportState: report,
        authState: auth,
        account, //TravelForm
        routing: routerReducer,
        toastr: toastrReducer
    });
}
