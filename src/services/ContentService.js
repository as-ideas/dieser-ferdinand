import ApiService from './ApiService';

const BASE_URL = 'https://content-coins-backend.herokuapp.com';

class ContentService {
    constructor() {
    }

    getContent() {
        return ApiService.getJSON(BASE_URL + '/api/content/articles/hotTopics')
    }

    getContentById(id) {
        return ApiService.getJSON(BASE_URL + '/api/content/articles/article/' + id)
    }

    isPurchaseRequired(contentObject){
        return !(contentObject.price === 0 || !!contentObject.purchasedByUser);
    }
}

export default new ContentService();
