import React from 'react';
import '../styles/Landingpage.css'
import {Link, useHistory} from 'react-router-dom'
import {connect} from "react-redux"
import {requestDisplayProfilePic, requestloadLoggedInUserData,setLogout} from '../redux/actions/LoggedinUserDataAction'
function Landingpage(props){
    const onBackButtonEvent=()=>{
      if(props.user_data.isAuth){
        if(window.confirm("Are you sure you want to Go Back?")){
        sessionStorage.removeItem('user_token')
        props.logout()
        history.push("/")
        }
      }
    }
 //About,My Profile, Messages
    const history=useHistory()
    const uploadProfilePic=async (e)=>{
        var form_data=new FormData();
        e.preventDefault();
        var file=document.getElementById('profile_pic_upload')
        form_data.append('user_id',props.user_data.user_id)
        form_data.append('profile_pic_upload',file.files[0]);
        var r=await fetch("http://localhost:4040/profilepic/upload",{
            method:"POST",
            body:form_data
        }).catch(err=>alert("err in uploading profile pic-frontend"))
        var resp=await r.json()
        console.log(resp);        
    }
    React.useEffect(()=>{
        if(!props.user_data.isAuth){
          history.push("/")
        }else{
          props.load();
          
        }
        props.loadProfilePicture('hero18')
        window.addEventListener('popstate', onBackButtonEvent);
          return () => {
        window.removeEventListener('popstate', onBackButtonEvent);  
      };
    },[])
    return (
    <>
     <div className="landing-page-navbar">
        <div><Link to="/about">About</Link></div>
        <div><Link to="/myprofle">My Profile</Link></div>
        <div><Link to="/messages">Messages</Link></div>
        <div>Logout</div>
    </div>
    <div className="container contain">
        <div className="row">
            <div className="col-2  landing-one">{/* PIC CHAT */}
                <div className="profile-pic" style={{flex:"0 0 30vh",padding:"10px",borderRadius:"10px"}}>
                    <div className="pic-space">
                        {/* Image goes here<img>*/}
                        {/* <img src={props.user_data.dp.filename}/> */}
                    </div>
                    <div className="upload-pic-div">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal_upload_profile_pic">
                        Upload
                    </button>
                    </div>
                </div>
                <div className="chat" style={{flex:"2 0 50vh",padding:"10px",borderRadius:"10px",backgroundColor:"blue"}}>
                    
                </div>
            </div>
            <div className="col-8">{/*WALL STATUS */}
                <p>Welcome {props.user_data.user_id}</p>
            </div>
            <div className="col-2">{/*Not Decided (INFO ETC)* */}

            </div>
        </div>
    </div>
    {/* Modal for upload */}
    <div className="modal fade" id="modal_upload_profile_pic" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Choose Profile Pic</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form encType="multipart/form-data">
            <div className="form-group">
                <input type="file" className="form-control-file" id="profile_pic_upload" name="profile_pic_upload"/>
            </div>
            <button type="submit" onClick={uploadProfilePic}>Upload</button>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </>
    )
}
const mapStateToProps=(state)=>{
  return {user_data:state.user_data}
}
const mapDispatchToProps=(dispatch)=>{
  return {
    load:(d)=>dispatch(requestloadLoggedInUserData(d)),
    logout:()=>dispatch(setLogout()),
    loadProfilePicture:(id)=>dispatch(requestDisplayProfilePic(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Landingpage);