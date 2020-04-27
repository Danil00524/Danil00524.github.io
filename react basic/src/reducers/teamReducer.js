const initialState = {};

export default function teamReducer(state = initialState, action) {
    switch (action.type) {

        case "PUT_TEAM": {
            return {
                ...state,
                teamList: action.payload
            }
        }

        default: return state;
    }

}

export const getTeam = (state) => {
    return {
        teamList: state.teamList
    }
}
