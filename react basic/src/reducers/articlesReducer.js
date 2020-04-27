const initialState = {}

export default function articlesReducer(state = initialState, action) {
    switch(action.type) {

        case "PUT_ARTICLES": {
            return {
                ...state,
                articlesList: action.payload
            }
        }

        default: return state;
    }
}

export const getArticles = (state) => {
    return {
        articlesList: state.articles.articlesList
    };
}
