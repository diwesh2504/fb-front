import './App.css'
import {useHistory} from 'react-router-dom';
import React from 'react';
import {connect} from "react-redux"
import {requestLogin} from './redux/actions/LoggedinUserDataAction';

function App(props) {
  var history=useHistory()
  const route_register=()=>{
    history.push('/register');
  }
  const login=async (e)=>{
    const id=document.getElementById("id").value;
    const pass=document.getElementById("pass").value;
    var r=await fetch("http://localhost:4040/login",{
      method:"POST",
      headers:{"Content-type":"application/json;charset=UTF-8"},
      body:JSON.stringify({id,pass})
      }).catch(err=>alert("Couldnt Login,Try Again!"))
    var res=await r.json();
    if(r.status===200){
      sessionStorage.setItem('user_token',res.token)
      props.login({isAuth:true})
      history.push("/landing")
    }else{
      props.login({isAuth:false})
      alert(res.text)
    }
  }
  return (
    <>
    <div className="index_page">
      <div className="bg"><h1 className="display-4">Welcome to Facebook</h1></div>
      <div className="comp" style={{marginTop:"20vh"}}>
        <div></div>
        <div>
          <input  type="text" placeholder="Enter Email ID" id="id" />
          <input style={{marginTop:"5vh"}} type="text" placeholder="Enter Password" id="pass"/>
          <div style={{marginTop:"5vh"}}><button type="submit" style={{marginLeft:"30%",width:"20%",marginRight:"30%"}} onClick={login} className="btn btn-outline-success ">Login</button></div>
          <div style={{marginTop:"2vh"}}>New User?<button className="btn btn-outline-success" onClick={route_register}>Register</button></div>
      
        </div>
    
      </div>
    </div>
    </>
  );
}
const mapStateToProps=(state)=>{
  return {
    user_data:state.user_data
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    login:(p)=>dispatch(requestLogin(p))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
