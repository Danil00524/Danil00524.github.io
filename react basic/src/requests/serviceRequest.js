import store from '../store/configureStore';

export const serviceRequest = () => {
    return fetch('https://woodland.pd.dp.ua/api/services')
        .then(res => {
            return res.json();
        })
        .then(res => {
            store.dispatch({
                type: "PUT_SERVICE",
                payload: res.data
            })
            return res;
        })
        .catch(err => console.error(err))
}
