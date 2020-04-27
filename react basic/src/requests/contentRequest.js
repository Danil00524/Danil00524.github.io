export const getContent = (url) => {
    return fetch(url)
        .then(res => {
            return res.json()
        })
        .then(res => {
            return res
        })
        .catch(reject => {
            console.error('no Data: ', reject)
        });

};
