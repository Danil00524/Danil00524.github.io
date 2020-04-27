import store from '../store/configureStore';

export const housesRequest = () => {
    return fetch('https://woodland.pd.dp.ua/api/houses')
        .then(res => {
            return res.json()
        })
        .then(res => {
            store.dispatch({
                type: "PUT_HOUSES",
                payload: res.data
            })
            return res
        })
        .catch(reject => {
            console.error('no Data: ', reject)
        });
}
