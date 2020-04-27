import path from '../path'

export default function filterSalon(queryParams) {
    const url = path.searchSalons(queryParams);

    return {
        method: 'GET',
        url,
    }
}
