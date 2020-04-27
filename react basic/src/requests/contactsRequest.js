export const contactsRequest = (data) => {
    return fetch('https://woodland.pd.dp.ua/api/contact', {
        method: "POST",
        body: JSON.stringify(data)
    }).then(response => {
        return response;
    }).catch(err => console.error(err))
}