
const iState = {
    flag: [{ flag: 0, s_key: 's_key', index: 'index', value: 'value' }],
    signup_redux: [{ email: 'EMAIL', phone_code: '+92', phone: '', password: '', username: 'USER', code: '' }],
    user_id_redux: [{ user_id: 0, farm_id: 0 }]
}
const form_reducer = (state = iState, action) => {

    if (action.type === 'CHANGE_FLAG') {
        return {
            ...state,
            flag: action.payload
        };
    }

    if (action.type === 'SIGNUP_DATA') {
        return {
            ...state,
            signup_redux: action.payload
        };
    }

    if (action.type === 'USER_ID') {
        return {
            ...state,
            user_id_redux: action.payload
        };
    }

    return state;
}

export default form_reducer;