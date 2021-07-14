var initialState={
    isAuth:false,
    dp:null,
    user_id:null,
    friends:[]
}
export const loggedinUser=(state=initialState,action)=>{
    switch(action.type){
        case "LOAD_INITIAL":
            return {...state,...action.payload}
        case "LOGIN":
            return {...state,...action.payload}
        case "PROFILE_PIC_SHOW":
            return {...state,...action.payload}
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}

