import store from '../store/configureStore';

export const teamRequest = () => {
    return fetch('https://woodland.pd.dp.ua/api/team')
        .then(res => {
            return res.json();
        })
        .then(res => {
            store.dispatch({
                type: "PUT_TEAM",
                payload: res.data
            })
            return res;
        })
        .catch(err => console.error(err));
}
