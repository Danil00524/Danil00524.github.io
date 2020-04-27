export const subscribeNews = (data) => {
    return fetch('https://woodland.pd.dp.ua/api/subscribe', {
        method: "POST",
        body: JSON.stringify(data)
    }).then(response => {
        return response;
    }).catch(err => console.error(err))
}
