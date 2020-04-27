export const viewArticle = (id) => {
    return fetch(`https://woodland.pd.dp.ua/api/project/${id}/view`, {
        method: "POST",
        body: JSON.stringify(id)
    }).then(response => {
        return response;
    }).catch(err => console.error(err))
}
