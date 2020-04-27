import path from '../path'

export default function fetchCategoriesList() {
    const url = path.categories();

    return {
        url,
        method: 'GET',
    }
}