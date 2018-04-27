
import ApiService from './ApiService';

const BASE_URL = 'https://content-coins-backend.herokuapp.com/api/transactions/purchases';

class PurchaseService {
    unlockArticle(articleId) {
        return ApiService.postJson(BASE_URL, { 'contentId': articleId });
    }
}

export default new PurchaseService();
