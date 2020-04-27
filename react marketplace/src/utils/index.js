export const parseIdToKeyObjectCollection = function(arr) {
    if (Array.isArray(arr)) {
        let _parsed = arr.reduce(function(memo, { id, ...item }) {
            if (!(id in memo)) {
                memo[id] = { ...item, id }
            }
            return memo
        }, {})

        return _parsed
    } else {
        throw new TypeError(`The argument should be array, but given typeof ${typeof arr}`)
    }
}
