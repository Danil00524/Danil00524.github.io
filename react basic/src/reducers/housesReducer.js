const initialState = {}

export default function housesReducer(state = initialState, action) {
    switch(action.type) {

        case "PUT_HOUSES": {
            return {
                ...state,
                housesList: action.payload
            }
        }

        default: return state;
    }
}

export const getHouses = (state) => {
    return {
        housesList: state.housesList
    }
}
