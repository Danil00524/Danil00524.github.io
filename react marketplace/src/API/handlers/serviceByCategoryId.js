import path from '../path'

export default function serviceByCategoryId({categoryId}) {
    const url = path.serviceByCategoryId(categoryId);

    return {
        method: 'GET',
        url,
    }
}