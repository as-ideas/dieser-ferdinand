import ApiService from './ApiService';


class WalletService {
    constructor() {
        this.balance = 103;
        this.BASE_URL = 'https://content-coins-backend.herokuapp.com/api/wallet';
    }

    getAccountData() {
        return ApiService.getJSON(this.BASE_URL);
    }

    topUp(amount) {
        return ApiService.postJson(this.BASE_URL, { topupAmount: amount });
    }

    getHistory() {
        return ApiService.getJSON('https://content-coins-backend.herokuapp.com/api/transactions');
    }
}

export default new WalletService();
