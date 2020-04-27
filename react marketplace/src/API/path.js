import {DEV_ORIGIN} from '../config/origin'

class Path {
    constructor(host) {
        this.host = host;
        this.metaHost = `api/v1`
    }

    get completeUlr() {
        return `${this.host}/${this.metaHost}`
    }

    searchSalons(params) {
        return `${this.completeUlr}/salons?${params}`
    }

    serviceByCategoryId(categoryId) {
        return `${this.completeUlr}/categories/${categoryId}/services`
    }

    categories() {
        return `${this.completeUlr}/categories`
    }

    login() {
        return `${this.completeUlr}/auth/login`;
    }

    getProfile() {
        return `${this.completeUlr}/profile`;
    }
}

export default new Path(DEV_ORIGIN)
