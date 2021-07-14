import React from 'react';
import {useHistory} from 'react-router-dom'
import './Register.css'
function Register(){
    var history=useHistory()
    const [enable,setEnable]=React.useState(true)
    const chec=(e)=>{
        if(e.target.checked){
            setEnable(false)
        }else{
            setEnable(true)
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        //Get form data
        let form=document.getElementById("register_form")
        let form_data=new FormData(form);
        var data_to_send={},eq=false;
        for(var i of form_data.entries())
        {
            if(i[0]==="pass_confirm"){
                if(data_to_send['pass']!==i[1]){
                    eq=false
                }else
                   eq=true
            }else{
                data_to_send[`${i[0]}`]=i[1]
            }
        }
        //send data if eq=true
        if(eq===true)
        {
            console.log(data_to_send)
            var r=await fetch('http://localhost:4040/register',{
                method:"POST",
                body:JSON.stringify(data_to_send),
                headers:{"Content-type":"application/json; charset=UTF-8"}
                
            })
            .catch(err=>alert(err))
            var txt=await r.text()
            alert(txt);
            if(r.status===200){
                history.push("/");
            }
        }else{
            console.log("not equal")
        }
        

        //if success,alert this:USER CREATED

    }
    React.useEffect(()=>{

    },[])
return(
    <>
    <div className="formregister">
        <div></div>
        <div>
            <form id="register_form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" name="name" id="name" aria-describedby="name"/>
            </div>
            <div className="form-group">
                <label htmlFor="email_id">Email</label>
                <input type="text" className="form-control" id="email_id" name="email_id" aria-describedby="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="user_id">User_ID</label>
                <input type="text" className="form-control" id="user_id" name="user_id" aria-describedby="userid"/>
            </div>
            I AM:
            <div className="form-group">
                <input type="radio" className="form-check-input" name="gender" id="gender1" value="male"/>
                <label className="form-check-label" htmlFor="gender1">Male</label>
            </div>
            <div className="form-group">
                <input type="radio" className="form-check-input" name="gender" id="gender2" value="female"/>
                <label className="form-check-label" htmlFor="gender2">Female</label>
            </div>
            <div className="form-group">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input type="date" className="form-control" name="date_of_birth" id="date_of_birth" aria-describedby="date_of_birth"/>
            </div>
            <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input type="password" className="form-control" name="pass" id="pass"/>
            </div>
            <div className="form-group">
                <label htmlFor="pass_confirm">Confirm Password</label>
                <input type="password" className="form-control" name="pass_confirm" id="pass_confirm"/>
            </div>
            <div className="form-group form-check">
                <input onChange={chec} type="checkbox" className="form-check-input" id="agree"/>
                <label className="form-check-label" htmlFor="agree">I Agree to the Terms and Conditions</label>
            </div>
            <div className="form-group">
                <button type="submit" id="reg" disabled={enable} className="btn btn-primary btn-block">Register</button>
            </div>
            </form>
        </div>
        <div></div>
    </div>
    </>
)
}
export default Register;