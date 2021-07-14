 const loadLoggedInUserData=(payload)=>{
    return {type:"LOAD_INITIAL",payload}
}
const login=(payload)=>{
    return {type:"LOGIN",payload}
}
const displayProfilePic=(payload)=>{
    return{
        type:"PROFILE_PIC_SHOW",payload
    }
}

export const requestloadLoggedInUserData=()=>{
    return (dispatch)=>{
            fetch("http://localhost:4040/landing",{
            method:"POST",
            headers:{"Authorization":sessionStorage.getItem('user_token')}
           }).then(res=>res.json())
           .then(res=>{
               console.log(res.decode)
               let p={isAuth:res.isAuth,...res.decode}
               dispatch(loadLoggedInUserData(p))
           })
        }
    }
const logout=()=>{
    return {type:"LOGOUT"}
}   
export const requestLogin=(p)=>{ 
    return (dispatch)=>{
       dispatch(login(p))
    }
}

export const setLogout=()=>{
    return (dispatch)=>{
        dispatch(logout())
    }
}

export const requestDisplayProfilePic=(id)=>{
    return (dispatch)=>{
        fetch(`http://localhost:4040/profilepic/viewprofilepic/${id}`)
        .then(res=>{console.log("F RES",res);return res.json();})
        .then(res=>{
            console.log("image checkin",res)
            dispatch(displayProfilePic({dp:res.files[0]}))
        }).catch(err=>console.log("NO DP ERROR",err))
    }
}