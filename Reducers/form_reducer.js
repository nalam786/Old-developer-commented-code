//Data Stored in Redux to Pass through app

//Set Default Values
const iState = {
    flag: [{ flag: 0, s_key: 's_key', index: 'index', value: 'value' }],
    signup_redux: [{ email: 'EMAIL', phone_code: '+92', phone: '', password: '', username: 'USER', code: '' }],
    user_id_redux: [{ user_id: 0, farm_id: 0,update_farm_id:0 }],
    map_redux:[{latitude: '', longitude: '', latitudeDelta: '',longitudeDelta: ''}],
    area_of_poligon:0,
}
const form_reducer = (state = iState, action) => {
//Change Flag
    if (action.type === 'CHANGE_FLAG') {
        return {
            ...state,
            flag: action.payload
        };
    }
//Sign Up Data
    if (action.type === 'SIGNUP_DATA') {
        return {
            ...state,
            signup_redux: action.payload
        };
    }
//USER ID
    if (action.type === 'USER_ID') {
        return {
            ...state,
            user_id_redux: action.payload
        };
    }
//MAP Data
    if (action.type === 'MAP') {
        return {
            ...state,
            map_redux: action.payload
        };
    }
//Map Area
    if (action.type === 'AREA') {
        return {
            ...state,
            area_of_poligon: action.payload
        };
    }

    return state;
}

export default form_reducer;