const initialState = {}

export default function serviceReducer(state = initialState, action) {
    switch(action.type) {

        case "PUT_SERVICE": {
            return {
                ...state,
                serviceList: action.payload
            }
        }

        default: return state;
    }
}

export const getService = (state) => {
    return {
        serviceList: state.serviceList
    }
}
