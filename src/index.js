import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Register from './pages/Register'
import {createContext} from 'react';
import Landingpage from './pages/Landingpage';
import Messages from './pages/Messages';
import MyProfile from './pages/MyProfile';
import Privateroute from './pages/Privateroute';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux'
import { loggedinUser } from './redux/reducers/LoggedinDataReducer';
import thunk from 'redux-thunk';
export const Context=createContext(null);
var a={token:"",auth:false,setAuth:()=>{}}
const reducer=combineReducers({
  user_data:loggedinUser
})
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store=createStore(reducer,enhancer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Context.Provider value={a}>
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/register" component={Register}/>
        <Privateroute path="/landing" component={Landingpage}/>
        {/* <Route path="/landing" component={Landingpage}/> */}
        <Route path="/messages" component={Messages}/>
        <Route path="/myprofile" component={MyProfile}/>
      </Switch>
    </Router>
    </Context.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
