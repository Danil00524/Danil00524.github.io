const initialState = {
    user: {}
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case "HELLO_WORLD" : {
            return state;
        }
        case 'SIGN_IN': {
            console.log(`user payload: ${payload}`);
            if (payload.token) {
                localStorage.setItem('ws_marketplace_token', payload.token);
            } else {
                payload.token = localStorage.getItem('ws_marketplace_token');
            }

            return {
                ...state,
                user: payload
            };
        }
        case 'SIGN_OUT': {
            localStorage.removeItem('ws_marketplace_token');
            return {
                ...state,
                user: {
                    token: null
                }
            };
        }
        case 'SALONS': {
            console.log('salons payload: ', payload);
            return {
                ...state,
                salons: payload
            };
        }
        default: {
            return state;
        }
    }
}