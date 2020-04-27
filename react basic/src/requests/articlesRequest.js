import store from '../store/configureStore';

export const articlesRequest = () => {
    return fetch('https://woodland.pd.dp.ua/api/articles')
        .then(res => {
            return res.json()
        })
        .then(res => {
            store.dispatch({
                type: "PUT_ARTICLES",
                payload: res.data
            })
            return res
        })
        .catch(reject => {
            console.error('no Data: ', reject)
        });

}
