import React from 'react'
import { Route,Redirect} from 'react-router'
import {connect} from 'react-redux';
function Privateroute({component:Component,...rest}) {
    return (
        <Route {...rest} render={()=>{
            if(rest.user_data.isAuth){
                return <Component/>
            }else{
                return <Redirect to="/"/>
            }
        }}>

        </Route>
    )
}
const mapStateToProps=(state)=>{
    return {
        user_data:state.user_data
    }
}
export default connect(mapStateToProps)(Privateroute);
