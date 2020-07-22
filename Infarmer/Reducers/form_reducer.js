
const iState ={
    flag:[{flag:0,s_key:'s_key',index:'index',value:'value'}],
    sugnup_recux:[{email:'EMAIL',phone_code:'+92',phone:'',password:'',username:'USER',code:''}],
    user_id_recux:[{user_id:0,farm_id:0,phone:'',password:'',username:'USER',code:''}],
}
const form_reducer = (state=iState, action) => {

    if(action.type==='CHANGE_FLAG'){
        return{
            ...state,
            flag:action.payload
        }
    }
    if(action.type==='SUGNUP_DATA'){
        return{
            ...state,
            sugnup_recux:action.payload
        }
    }
    if(action.type==='USER_ID'){
        return{
            ...state,
            user_id_recux:action.payload
        }
    }
    
    return state;
}
    
export default form_reducer;