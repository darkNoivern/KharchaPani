const InitialOBJ = {
    loggedin: false,
    username: "",
    avatarid: "",
    email: "",
};

let InitialState;
if(localStorage.getItem("kharcha-pani") === null){
    InitialState = InitialOBJ;
}
else{
    InitialState = JSON.parse(localStorage.getItem("kharcha-pani"))
}

// console.log(InitialState)

const rootReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'SIGNIN':
            let newstate = state;
            newstate.loggedin = true;
            newstate.username = action.payload.username;
            newstate.avatarid = action.payload.avatarid;
            newstate.email = action.payload.email;
            state = newstate;
            localStorage.setItem("kharcha-pani", JSON.stringify(state));  
            console.log(state)
            return state;
        case 'LOGOUT':
            state.loggedin = false;
            state.username = "";
            state.avatarid = "";
            state.email = "";
            localStorage.setItem("kharcha-pani", JSON.stringify(state));
            return state;
        default: return state;
    }
}

export default rootReducer